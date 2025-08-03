// src/LandingPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage({ user }) {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
      color: '#fff'
    }}>
      {/* HERO */}
      <header style={{
        padding: '2.5rem 1rem 1rem 1rem',
        textAlign: 'center',
        background: 'none'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          letterSpacing: '-2px',
          marginBottom: '1rem'
        }}>
          100% Accessible Wayfinding, For All
        </h1>
        <p style={{
          fontSize: '1.35rem',
          opacity: 0.93,
          maxWidth: 680,
          margin: '0 auto 2.5rem auto'
        }}>
          Transforming public spaces into truly inclusive, easy-to-navigate environments—<b>empowering everyone</b> to move with confidence and independence.
        </p>
        {user ? (
          <button
            onClick={() => navigate('/map')}
            style={{
              padding: '16px 36px',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              background: '#fff',
              color: '#2575fc',
              cursor: 'pointer',
              margin: '0 12px'
            }}>
            Continue to Map
          </button>
        ) : (
          <div>
            <Link to="/login" style={{
              marginRight: 14,
              background: '#fff',
              color: '#2575fc',
              padding: '14px 34px',
              borderRadius: '7px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1.1rem'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              padding: '14px 34px',
              borderRadius: '7px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1.1rem'
            }}>
              Sign Up
            </Link>
          </div>
        )}
      </header>

      {/* FEATURE CARDS: like BindiMaps "Our Solution" section */}
      <section style={{
        marginTop: 40,
        padding: '3rem 0 2rem 0',
        background: 'rgba(20, 54, 141, 0.11)',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: '2.1rem',
          fontWeight: 700,
          marginBottom: 28
        }}>
          What Makes Us Different?
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 34,
          justifyContent: 'center',
          maxWidth: 1200
        }}>
          <FeatureCard
            icon="🗺️"
            heading="Web-Based Maps"
            text="Plan and explore accessible routes from anywhere. Browse accessible facilities before you go."
          />
          <FeatureCard
            icon="📱"
            heading="App Navigation"
            text="Turn-by-turn voice and visual directions, including wheelchair- and sensory-friendly routes."
          />
          <FeatureCard
            icon="💡"
            heading="No Beacon, No Barriers"
            text="No hardware or wires needed—just your phone or browser. Setup is instant and seamless."
          />
          <FeatureCard
            icon="🤝"
            heading="For Everyone"
            text="Partnered with accessibility leaders. Designed for every ability, age, and unique need."
          />
        </div>
      </section>
      {/* FOOTER/LAST CALL */}
      <footer style={{
        background: 'rgba(0,0,0,0.08)',
        textAlign: 'center',
        padding: '2rem 0 1rem 0',
        fontSize: '1.01rem',
        marginTop: 'auto',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}>
        <b>Towards 100% Accessible Spaces.</b>
        <br /><span style={{ opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Inclusive Navigation Platform
        </span>
      </footer>
    </div>
  );
}

// -- Simple feature card component
function FeatureCard({ icon, heading, text }) {
  return (
    <div style={{
      background: '#fff',
      color: '#2575fc',
      borderRadius: 14,
      boxShadow: '0 6px 28px 0 rgba(60, 96, 255, 0.10)',
      padding: '1.6rem 1.3rem',
      maxWidth: 270,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 7 }}>{heading}</div>
      <div style={{ fontSize: '1.04rem', color: '#466be4', opacity: 0.92 }}>{text}</div>
    </div>
  );
}

export default LandingPage;
