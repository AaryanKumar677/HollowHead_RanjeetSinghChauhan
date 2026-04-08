import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, Star } from 'lucide-react';
import { mockEvents, userProfile } from '../data/mockData';
import './Home.css';

function Home() {
  const recommendedEvents = mockEvents.filter(e => e.recommended);
  const otherEvents = mockEvents.filter(e => !e.recommended);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-text-area">
            <span className="badge">Welcome back, {userProfile.name} 👋</span>
            <h1 className="hero-title">
              Find the perfect <br/>
              <span className="text-highlight">vibes</span> near you.
            </h1>
            <p className="hero-subtitle">
              Discover amazing fests, tech hackathons, open mics, and networking workshops directly on your campus or across the city.
            </p>
            <div className="hero-actions">
              <Link to="/explore" className="btn btn-primary">
                Explore Events <ArrowRight size={18} />
              </Link>
              <Link to="/create-event" className="btn btn-secondary">
                Host an Event
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <strong>500+</strong> <span>Events Hosted</span>
              </div>
              <div className="stat-item">
                <strong>10k+</strong> <span>Active Students</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual-area">
             <div className="hero-image-stack">
               <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80" alt="Hackathon" className="h-img h-img-1" />
               <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80" alt="Fest" className="h-img h-img-2" />
               <div className="floating-card">
                  <div className="fl-avatar" style={{background: 'var(--success-color)'}}></div>
                  <div className="fl-text">
                     <strong>Ticket Booked!</strong>
                     <span>Just now</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Recommended For You Section */}
      <section className="featured-section" style={{ background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star color="var(--warning-color)" fill="var(--warning-color)" size={28} />
              Recommended for You
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Based on your interests in {userProfile.interests.join(", ")}</p>
          </div>
          
          <div className="events-grid">
            {recommendedEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id} className="event-card recommended-card">
                <div className="card-image-wrap">
                  <img src={event.image} alt={event.title} className="card-image" />
                  <div className="card-tags">
                    {event.moods.slice(0, 2).map((mood, idx) => (
                      <span key={idx} className="tag tag-blur">{mood}</span>
                    ))}
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{event.title}</h3>
                  <div className="card-meta">
                    <span><Calendar size={14} /> {event.date}</span>
                    <span><MapPin size={14} /> {event.venue}</span>
                  </div>
                  <div className="card-footer">
                    <span className="price">{event.price === 0 ? 'Free' : `₹${event.price}`}</span>
                    <span className="spots">
                      <Users size={14} />
                      {event.spotsLeft} spots left
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Trending Events */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Near {userProfile.college}</h2>
            <Link to="/explore" className="view-all">View all filters</Link>
          </div>
          
          <div className="events-grid">
            {otherEvents.map(event => (
              <Link to={`/events/${event.id}`} key={event.id} className="event-card">
                <div className="card-image-wrap" style={{ height: '160px' }}>
                  <img src={event.image} alt={event.title} className="card-image" />
                </div>
                <div className="card-body" style={{ padding: '1rem' }}>
                  <h3 className="card-title" style={{ fontSize: '1.1rem' }}>{event.title}</h3>
                  <div className="card-meta" style={{ marginBottom: '1rem' }}>
                    <span><Calendar size={14} /> {event.date}</span>
                  </div>
                  <div className="card-footer" style={{ paddingTop: '0.75rem' }}>
                    <span className="price" style={{ fontSize: '1rem' }}>{event.price === 0 ? 'Free' : `₹${event.price}`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
