import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Share2, Ticket } from 'lucide-react';
import { mockEvents } from '../data/mockData';

function EventDetail() {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Event not found.</div>;
  }

  return (
    <div>
      {/* Banner */}
      <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--bg-subtle)', position: 'relative' }}>
        <img src={event.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner" />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)' }}></div>
      </div>

      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10, display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Main Content */}
        <div style={{ flex: '1', minWidth: '300px', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {event.moods.map((mood, i) => (
              <span key={i} className="badge" style={{ marginBottom: 0, background: 'var(--bg-subtle)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}>{mood}</span>
            ))}
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{event.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' }}>{event.description}</p>
          
          <h3>About the Organizer</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <img src={event.organizer.avatar} alt="org" style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-full)' }} />
            <div>
              <div style={{ fontWeight: 600 }}>{event.organizer.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Verified Campus Organizer</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Event Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Calendar color="var(--primary-color)" />
                <div>
                  <div style={{ fontWeight: 500 }}>{event.date}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{event.time}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin color="var(--primary-color)" />
                <div>
                  <div style={{ fontWeight: 500 }}>{event.venue}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{event.proximity}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Users color="var(--primary-color)" />
                <div>
                  <div style={{ fontWeight: 500 }}>{event.spotsLeft} out of {event.totalSpots} spots left</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary-color)' }}>
              {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
            </div>

            <Link to={`/book/${event.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Ticket size={20} /> Reserve Spot
            </Link>
            
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <Share2 size={20} /> Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
