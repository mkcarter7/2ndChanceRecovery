import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import api from '../config/api';
import './Contact.css';

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/contact-forms/submit/', formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <section className="section contact-hero" style={{ backgroundColor: settings.background_color }}>
        <div className="container">
          <h1 className="page-title" style={{ color: settings.primary_color }}>
            Contact Us
          </h1>
          <p className="page-subtitle" style={{ color: settings.secondary_color }}>
            We're here to help. Reach out to us today.
          </p>
        </div>
      </section>

      <section className="section contact-content">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2 style={{ color: settings.primary_color }}>Get in Touch</h2>
              <p>
                If you or a loved one is struggling with addiction, we're here to help. 
                Reach out to us through any of the methods below, or fill out the contact form.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h3>Phone</h3>
                    <p>{settings.contact_phone || '(555) 123-4567'}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>{settings.contact_email || 'info@2ndchancerecovery.com'}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h3>Address</h3>
                    <p>{settings.address || '123 Recovery Street, City, State 12345'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2 style={{ color: settings.primary_color }}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`form-status ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
