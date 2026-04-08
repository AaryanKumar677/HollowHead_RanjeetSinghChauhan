import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../data/mockData';
import { CheckCircle } from 'lucide-react';

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!event) return <div className="container" style={{ paddingTop: '2rem' }}>Event not found.</div>;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate(`/ticket/${event.id}`);
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <CheckCircle size={64} color="var(--success-color)" style={{ margin: '0 auto 1.5rem' }} />
        <h1>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Generating your QR ticket...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Complete Registration</h1>
      
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.25rem' }}>{event.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{event.date} • {event.venue}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontWeight: 600 }}>General Admission</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{event.price === 0 ? 'Free' : `₹${event.price}`}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >-</button>
            <span>{quantity}</span>
            <button 
              style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}
              onClick={() => setQuantity(quantity + 1)}
            >+</button>
          </div>
        </div>

        <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem' }}>
            <span>Total</span>
            <span>{event.price === 0 ? 'Free' : `₹${event.price * quantity}`}</span>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing securely...' : `Confirm & Generate Ticket`}
        </button>
      </div>
    </div>
  );
}

export default Booking;
