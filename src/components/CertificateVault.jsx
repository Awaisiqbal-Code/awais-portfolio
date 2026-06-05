import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaGraduationCap, FaCalendarAlt, FaIdCard, FaBuilding, FaSearchPlus } from 'react-icons/fa';

// Import Certificate images
import socialMediaMarketing from '../assets/certificates/social-media-marketing.jpg';
import pythonEssentials1 from '../assets/certificates/python-essentials-1.png';
import pythonEssentials2 from '../assets/certificates/python-essentials-2.png';
import digitalContent from '../assets/certificates/digital-content.png';
import cybersecurity from '../assets/certificates/cybersecurity.png';
import networkTechnician1 from '../assets/certificates/network-technician-1.png';
import networkTechnician2 from '../assets/certificates/network-technician-2.png';
import digitalSafety from '../assets/certificates/digital-safety.png';
import compellingReports from '../assets/certificates/compelling-reports.png';
import iotCisco from '../assets/certificates/iot-cisco.png';

const CertificateVault = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      title: 'Social Media Marketing Course',
      issuer: 'NextGen Digital University',
      date: '30-11-2025',
      id: 'Batch# 30',
      img: socialMediaMarketing,
      desc: 'Expert mentorship of Sir Zain Ali. Cover social media optimization and digital brand management.'
    },
    {
      title: 'Python Essentials 1',
      issuer: 'Cisco Networking Academy / Python Institute',
      date: '22 Oct 2025',
      id: 'PE1-Verified',
      img: pythonEssentials1,
      desc: 'Cover basic programming concepts, control structures, list manipulations, functions, and logic gates.'
    },
    {
      title: 'Python Essentials 2',
      issuer: 'Cisco Networking Academy / Python Institute',
      date: '29 Oct 2025',
      id: 'PE2-Verified',
      img: pythonEssentials2,
      desc: 'Advanced Python paradigms: object-oriented programming, packages, modules, generators, exceptions, and file processing.'
    },
    {
      title: 'Create Digital Content, Communicate Online',
      issuer: 'Cisco Academy / Univ. of Spoken English & Computer Sciences',
      date: '29 May 2026',
      id: 'db7dcaa5-8ccf-4844',
      img: digitalContent,
      desc: 'Mastering digital communication protocols, content collaboration pipelines, and interactive workspaces.'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: '31 May 2026',
      id: 'ed55d67a-e183-48fd',
      img: cybersecurity,
      desc: 'Threat assessment, cryptography, network vulnerabilities, data safety protocols, and defense mechanics.'
    },
    {
      title: 'Network Technician Career Path Exam',
      issuer: 'Cisco Academy / Univ. of Spoken English & Computer Sciences',
      date: '31 May 2026',
      id: '0a17881b-f6bf-4e6c',
      img: networkTechnician1,
      desc: 'Architecting local networks, DNS systems, subnet structures, router setups, and system topologies.'
    },
    {
      title: 'Digital Safety and Security Awareness',
      issuer: 'Cisco Academy / Univ. of Spoken English & Computer Sciences',
      date: '02 Jun 2026',
      id: 'a2fc0870-7950-4280',
      img: digitalSafety,
      desc: 'Risk management, safe browsing rules, phishing awareness, and digital credential security.'
    },
    {
      title: 'Creating Compelling Reports',
      issuer: 'Cisco Networking Academy',
      date: '02 Jun 2026',
      id: 'a9416411-d611-4eaa',
      img: compellingReports,
      desc: 'Data reporting pipelines, structured analysis documentation, and business formatting models.'
    },
    {
      title: 'Exploring IoT with Cisco Packet Tracer',
      issuer: 'Cisco Networking Academy',
      date: '02 Jun 2026',
      id: '70a9d962-fc63-44c9',
      img: iotCisco,
      desc: 'Connecting smart appliances, programming sensors, smart grid setups, and IoT network modeling.'
    }
  ];

  React.useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <section id="certificates" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: selectedImage ? 99999 : 2 }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--primary-glow)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          // DIGITAL CREDENTIAL VAULT
        </span>
        <h2 className="section-title" style={{ margin: '10px 0' }}>CERTIFICATION VAULT</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '30px',
          width: '100%',
        }}
        className="certificates-grid"
      >
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="certificate-card"
            style={{
              height: '340px',
              perspective: '1000px',
              cursor: 'pointer',
            }}
          >
            {/* Flip Container */}
            <div
              className="certificate-inner"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front Side: Preview Image & Title */}
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  justifyContent: 'space-between',
                  background: 'rgba(5, 8, 22, 0.65)',
                }}
              >
                <div style={{ width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                  <img src={cert.img} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    className="image-overlay"
                  >
                    <FaSearchPlus style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', color: '#fff', lineHeight: '1.4', marginBottom: '5px' }}>
                    {cert.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaBuilding /> {cert.issuer}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--primary-glow)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                  <span>EXAMINE DETAILS</span>
                  <span>TAP CARD</span>
                </div>
              </div>

              {/* Back Side: Verification Info */}
              <div
                className="glass-panel purple-glow"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  padding: '25px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(5, 8, 22, 0.9)',
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: 'var(--primary-glow)', marginBottom: '15px' }}>
                    CREDENTIAL SCAN
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <FaGraduationCap style={{ color: 'var(--secondary-glow)' }} />
                      <span>{cert.issuer}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <FaCalendarAlt style={{ color: 'var(--secondary-glow)' }} />
                      <span>Issued: {cert.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <FaIdCard style={{ color: 'var(--secondary-glow)' }} />
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>ID: {cert.id}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', marginTop: '15px' }}>
                    {cert.desc}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(cert.img);
                  }}
                  className="interactive"
                  style={{
                    background: 'linear-gradient(90deg, var(--secondary-glow), var(--primary-glow))',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 0',
                    width: '100%',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-title)',
                  }}
                >
                  FULL SCAN EXPANSION
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS flip utility class */}
      <style>
        {`
          .certificate-card:hover .certificate-inner {
            transform: rotateY(180deg);
          }
          .certificate-card:hover .image-overlay {
            opacity: 1;
          }
        `}
      </style>

      {/* HD Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(5, 8, 22, 0.95)',
              zIndex: 9999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
            >
              <img src={selectedImage} alt="Certificate Zoom" style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain', border: '2px solid var(--primary-glow)', boxShadow: '0 0 30px var(--primary-glow)', borderRadius: '12px' }} />
              <div style={{ textAlign: 'center', color: '#fff', marginTop: '15px', fontFamily: 'var(--font-title)', fontSize: '0.8rem', opacity: 0.6 }}>
                CLICK ANYWHERE TO RE-COLLAPSE
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificateVault;
