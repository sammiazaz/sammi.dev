import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, Loader2 } from 'lucide-react';
import { streamChatMessage } from '../../lib/openai';
import ReactMarkdown from 'react-markdown';
import './ChatAssistant.css';

const QUICK_SHORTCUTS = [
  { label: '🚀 Top Projects', prompt: 'Tell me about your featured projects.' },
  { label: '🧠 Skills & Stack', prompt: 'What technical skills and stack do you specialize in?' },
  { label: '🎓 Education & CPI', prompt: 'What is your education, university, and CPI?' },
  { label: '💼 Internships', prompt: 'What professional internship experience do you have?' },
  { label: '📫 Contact Info', prompt: 'How can I get in touch with you?' },
  { label: '📜 Certifications', prompt: 'What certifications have you earned?' },
];

export default function ChatAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hi! I'm Sammi's AI assistant. How can I help you today? You can ask me about his projects, skills, or background.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const executeMessage = async (userText) => {
    const textToSend = (userText || '').trim();
    if (!textToSend || isLoading) return;

    setInputMessage('');
    
    // Add user message to UI
    const newMessages = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    const validHistory = messages.length > 0 && messages[0].role === 'model' ? messages.slice(1) : messages;
    
    const apiHistory = validHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add placeholder AI response to UI
    setMessages((prev) => [...prev, { role: 'model', text: '' }]);

    try {
      await streamChatMessage(apiHistory, textToSend, (currentText) => {
        setIsLoading(false);
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = currentText;
          return newMsgs;
        });
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    executeMessage(inputMessage);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="chat-backdrop"
            onClick={onClose}
          />
          
          {/* Centered Modal Container */}
          <div className="chat-modal-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="chat-modal"
              data-lenis-prevent="true"
            >
              {/* Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="chat-title">AI Assistant</h3>
                    <p className="chat-subtitle">Ask anything about Sammi</p>
                  </div>
                </div>
                <button className="chat-close-btn" onClick={onClose} aria-label="Close Chat">
                  <X size={20} />
                </button>
              </div>

              {/* Message List */}
              <div className="chat-messages-container" data-lenis-prevent="true" onWheel={(e) => e.stopPropagation()}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg-wrapper ${msg.role}`}>
                    <div className="chat-msg-avatar">
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`chat-bubble ${msg.role}`}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chat-msg-wrapper model">
                    <div className="chat-msg-avatar">
                      <Bot size={16} />
                    </div>
                    <div className="chat-bubble model loading">
                      <Loader2 size={16} className="spinner" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="chat-input-area">
                {/* Shortcuts Row */}
                <div className="chat-shortcuts-container">
                  <span className="shortcuts-hint">Quick prompts:</span>
                  <div className="chat-shortcuts-row">
                    {QUICK_SHORTCUTS.map((sc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="chat-shortcut-chip"
                        disabled={isLoading}
                        onClick={() => executeMessage(sc.prompt)}
                      >
                        {sc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="chat-input-form">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message or tap a shortcut above..."
                    className="chat-input"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    className="chat-send-btn" 
                    disabled={!inputMessage.trim() || isLoading}
                    aria-label="Send Message"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
