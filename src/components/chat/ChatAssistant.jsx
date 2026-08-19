import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, Loader2 } from 'lucide-react';
import { streamChatMessage } from '../../lib/openai';
import ReactMarkdown from 'react-markdown';
import './ChatAssistant.css';

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to UI
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    // Format history for Gemini API: [{role: 'user'|'model', parts: [{text: '...'}]}]
    // Gemini requires history to start with a user message, so we skip the initial greeting.
    const validHistory = messages.length > 0 && messages[0].role === 'model' ? messages.slice(1) : messages;
    
    const apiHistory = validHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add placeholder AI response to UI
    setMessages((prev) => [...prev, { role: 'model', text: '' }]);
    setIsLoading(true);

    try {
      await streamChatMessage(apiHistory, userText, (currentText) => {
        setIsLoading(false); // Stop loading animation as soon as first token arrives
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
          
          {/* Pop-up Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
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
              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="chat-input"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="chat-send-btn" 
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
