import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import api from '../config/api';
import './Home.css';

const Home = () => {
  const { settings } = useSettings();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedReviews();
  }, []);

  const fetchFeaturedReviews = async () => {
    try {
      const response = await api.get('/reviews/featured/');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          backgroundColor: settings.background_color,
          backgroundImage: settings.background_image ? `url(${settings.background_image})` : 'none',
        }}
      >
        <div className="container">
          <div className="hero-content">
            <h1 style={{ color: settings.primary_color }}>
              {settings.hero_title}
            </h1>
            <p className="hero-subtitle" style={{ color: settings.secondary_color }}>
              {settings.hero_subtitle}
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/programs" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section quick-links">
        <div className="container">
          <h2 className="section-title" style={{ color: settings.primary_color }}>
            How We Can Help
          </h2>
          <div className="links-grid">
            <Link to="/programs" className="link-card">
              <div className="link-icon">🏠</div>
              <h3>Programs & Housing</h3>
              <p>Explore our recovery programs and housing options</p>
            </Link>
            <Link to="/about" className="link-card">
              <div className="link-icon">ℹ️</div>
              <h3>About Us</h3>
              <p>Learn about our mission and approach to recovery</p>
            </Link>
            <Link to="/contact" className="link-card">
              <div className="link-icon">📞</div>
              <h3>Contact Us</h3>
              <p>Reach out for help or more information</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: settings.primary_color }}>
            What Our Clients Say
          </h2>
          {loading ? (
            <p style={{ textAlign: 'center', color: settings.secondary_color }}>
              Loading reviews...
            </p>
          ) : reviews.length > 0 ? (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-author">
                      <h4>{review.author_name}</h4>
                      {review.author_location && (
                        <p className="review-location">{review.author_location}</p>
                      )}
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-content">{review.content}</p>
                  <p className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: settings.secondary_color }}>
              No reviews available at this time.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section" style={{ backgroundColor: settings.accent_color }}>
        <div className="container">
          <h2 style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: '1rem' }}>
            Ready to Start Your Recovery Journey?
          </h2>
          <p style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: '2rem' }}>
            Contact us today to learn more about our programs and take the first step.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
