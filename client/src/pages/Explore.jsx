import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import { mockEvents } from '../data/mockData';

function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Hackathon', 'Fest', 'Networking', 'Workshop'];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Explore Events</h1>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Search size={20} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Search events, colleges, or tags..." 
            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem' }}>
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', flexShrink: 0 }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="events-grid">
        {filteredEvents.length > 0 ? filteredEvents.map(event => (
          <Link to={`/events/${event.id}`} key={event.id} className="event-card">
            <div className="card-image-wrap">
              <img src={event.image} alt={event.title} className="card-image" />
              <div className="card-tags">
                <span className="tag tag-blur">{event.category}</span>
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
        )) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
