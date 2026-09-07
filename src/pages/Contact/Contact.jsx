import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1400);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <section className="contact-editorial-page">
      <div className="contact-editorial-container">

        {/* ─── Header Section (Matches About, Projects, Credentials, Persona) ─── */}
        <motion.div
          className="contact-editorial-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="contact-main-title">Get In Touch</h1>
          <p className="contact-lead-desc">
            Available for software engineering roles, full-stack architecture discussions, and machine learning collaborations. Drop a message below or connect directly.
          </p>
        </motion.div>

        {/* ─── 2-Column Composition: Left Telemetry & Channels, Right Message Form ─── */}
        <div className="contact-editorial-grid">

          {/* LEFT COLUMN: Channels & Status Telemetry */}
          <motion.div
            className="contact-left-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Availability Status Card */}
            <div className="contact-status-card">
              <div className="status-header">
                <span className="status-radar-blip"></span>
                <span className="status-label">CURRENT AVAILABILITY</span>
              </div>
              <h3 className="status-headline">Open to Roles & Collaborations</h3>
              <p className="status-sub">
                Actively looking for software engineering internships, research roles, and freelance architecture projects. Typically responds within 24 hours.
              </p>
              <div className="status-meta-row">
                <span className="status-meta-item">BASED: Delhi, India</span>
                <span className="status-meta-item">TIMEZONE: GMT+5:30 [IST]</span>
              </div>
            </div>

            {/* Direct Channel Cards List */}
            <div className="contact-channels-list">
              {/* Email */}
              <a href="mailto:sammiazaz2005@gmail.com" className="channel-contact-item">
                <div className="channel-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="channel-details">
                  <span className="channel-tag">DIRECT EMAIL</span>
                  <span className="channel-address">sammiazaz2005@gmail.com</span>
                </div>
                <span className="channel-link-arrow">↗</span>
              </a>

              {/* GitHub */}
              <a href="https://github.com/sammiazaz" target="_blank" rel="noreferrer" className="channel-contact-item">
                <div className="channel-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="channel-details">
                  <span className="channel-tag">GITHUB PROFILE</span>
                  <span className="channel-address">github.com/sammiazaz</span>
                </div>
                <span className="channel-link-arrow">↗</span>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com/in/sammiazazse" target="_blank" rel="noreferrer" className="channel-contact-item">
                <div className="channel-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="channel-details">
                  <span className="channel-tag">LINKEDIN NETWORK</span>
                  <span className="channel-address">linkedin.com/in/sammiazazse</span>
                </div>
                <span className="channel-link-arrow">↗</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Editorial Message Dispatch Form */}
          <motion.div
            className="contact-right-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="editorial-form-wrapper">
              <div className="form-card-topbar">
                <span className="form-card-badge">MESSAGE DISPATCH</span>
                <span className="form-card-protocol">SECURE ENDPOINT</span>
              </div>

              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form
                    key="contact-form"
                    className="contact-editorial-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="form-double-row">
                      <div className="form-field-group">
                        <label className="editorial-field-label" htmlFor="name">YOUR NAME</label>
                        <input
                          className={`editorial-input ${errors.name ? 'has-error' : ''}`}
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Sam Altman"
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>

                      <div className="form-field-group">
                        <label className="editorial-field-label" htmlFor="email">EMAIL ADDRESS</label>
                        <input
                          className={`editorial-input ${errors.email ? 'has-error' : ''}`}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="sam@example.com"
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="editorial-field-label" htmlFor="subject">SUBJECT / PURPOSE</label>
                      <input
                        className={`editorial-input ${errors.subject ? 'has-error' : ''}`}
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Software Engineering Role / Project Discussion"
                      />
                      {errors.subject && <span className="error-text">{errors.subject}</span>}
                    </div>

                    <div className="form-field-group">
                      <label className="editorial-field-label" htmlFor="message">MESSAGE DETAILS</label>
                      <textarea
                        className={`editorial-textarea ${errors.message ? 'has-error' : ''}`}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Hi Sammi, I came across your portfolio and would like to discuss..."
                      />
                      {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>

                    <button
                      className="form-submit-action-btn"
                      type="submit"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="btn-spinner"></div>
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    className="editorial-success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <div className="success-icon-badge">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="success-headline">Transmission Received</h3>
                    <p className="success-message">
                      Thank you for reaching out. Your message has been safely logged and dispatched. I will reply to your provided email address shortly.
                    </p>
                    <button className="reset-action-btn" onClick={handleReset}>
                      Dispatch Another Transmission
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
