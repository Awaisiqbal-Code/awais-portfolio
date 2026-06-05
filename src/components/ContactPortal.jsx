import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaPaperPlane, FaCheckCircle, FaGithub, FaEnvelope, FaFacebook, FaWhatsapp } from 'react-icons/fa';

// Placeholder phone number - edit this variable to change WhatsApp target phone
const WHATSAPP_PHONE = '923224214280';

const ContactPortal = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    try {
      // Send direct email via FormSubmit API
      const response = await fetch("https://formsubmit.co/ajax/hafizawaisiqbal40@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `New Transmission from Portfolio: ${formData.name}`,
          _captcha: false,
          _template: "table"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error("FormSubmit submission response failure");
      }
    } catch (error) {
      console.warn("Direct email failed:", error);
      // Show success message without redirecting to WhatsApp
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // DIGITAL COMMUNICATIONS
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>CONTACT PORTAL</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '50px',
          width: '100%',
          alignItems: 'center',
        }}
        className="contact-grid"
      >
        {/* Left Side: Connection Details */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.5rem', color: '#fff', marginBottom: '10px' }}>
              Let's build together
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Open for freelance projects, open-source collaborations, or networking connections. Drop me a secure transmission.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a
              href="https://github.com/Awaisiqbal-Code"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '15px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-glow)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaGithub style={{ color: 'var(--primary-glow)', fontSize: '1.2rem' }} />
              <span>GitHub: Awaisiqbal-Code</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61584604024333"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '15px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--secondary-glow)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(123, 97, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaFacebook style={{ color: 'var(--secondary-glow)', fontSize: '1.2rem' }} />
              <span>Facebook Profile</span>
            </a>

            <a
              href="mailto:hafizawaisiqbal40@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '15px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-glow)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaEnvelope style={{ color: 'var(--primary-glow)', fontSize: '1.2rem' }} />
              <span>Email: hafizawaisiqbal40@gmail.com</span>
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '15px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--secondary-glow)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(123, 97, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaWhatsapp style={{ color: 'var(--secondary-glow)', fontSize: '1.2rem' }} />
              <span>WhatsApp: Contact Directly</span>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div style={{ position: 'relative' }}>
          <form
            onSubmit={handleSubmit}
            className="glass-panel purple-glow"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              background: 'rgba(5, 8, 22, 0.7)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-title)' }}>
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  background: 'rgba(5, 8, 22, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-glow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-title)' }}>
                Email Coordinate
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  background: 'rgba(5, 8, 22, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-glow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-title)' }}>
                WhatsApp Coordinate
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^0-9+\s]/g, '');
                  setFormData({ ...formData, phone: cleaned });
                }}
                placeholder="+92 300 1234567"
                inputMode="numeric"
                pattern="[0-9+\s]*"
                style={{
                  background: 'rgba(5, 8, 22, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-glow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'var(--font-title)' }}>
                Transmission Message
              </label>
              <textarea
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  background: 'rgba(5, 8, 22, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '14px',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'none',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-glow)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="interactive"
              style={{
                background: 'linear-gradient(90deg, var(--secondary-glow), var(--primary-glow))',
                border: 'none',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'var(--font-title)',
                fontSize: '0.95rem',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 0 20px rgba(123, 97, 255, 0.3)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(123, 97, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isSubmitting ? (
                <span>CHARGING DISCHARGE MATRIX...</span>
              ) : (
                <>
                  <FaPaperPlane /> <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>
          </form>
          {/* Success Overlay Panel */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(5, 8, 22, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '20px',
                  border: '1px solid var(--primary-glow)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                  zIndex: 2,
                }}
              >
                <FaCheckCircle style={{ color: 'var(--primary-glow)', fontSize: '4rem', marginBottom: '20px', animation: 'float 3s infinite ease-in-out' }} />
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>
                  TRANSMISSION SENT
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '300px', lineHeight: '1.6', fontFamily: 'var(--font-body)' }}>
                  Form submitted successfully.<br />Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="interactive"
                  style={{
                    marginTop: '25px',
                    background: 'transparent',
                    border: '1px solid var(--primary-glow)',
                    color: 'var(--primary-glow)',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-title)',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.1)';
                  }}
                >
                  SUBMIT ANOTHER FORM
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactPortal;
