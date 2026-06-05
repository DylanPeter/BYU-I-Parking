import { useParking } from '../context/ParkingContext';
import './Dashboard.css';

const activeAlerts = [
  {
    title: 'Romney Building Lot - Partial Closure',
    location: 'Romney Lot (East Section)',
    impact: '30 spaces temporarily unavailable',
    eta: 'May 15, 2026',
    tone: 'critical',
  },
  {
    title: 'Center Square Resurfacing',
    location: 'Center Square Parking',
    impact: 'Reduced capacity during work hours (7 AM - 3 PM)',
    eta: 'May 10, 2026',
    tone: 'warning',
  },
  {
    title: 'New EV Charging Stations',
    location: 'Stadium Lot',
    impact: 'Minor delays, 5 spaces reserved',
    eta: 'May 8, 2026',
    tone: 'info',
  },
];

export default function Dashboard() {
  const { state } = useParking();
  const openSpots = state.lots.reduce((sum, lot) => sum + lot.availableSpots, 0);
  const openLots = state.lots.filter((lot) => lot.status === 'Open').length;
  const confirmedReservations = state.reservations.filter((reservation) => reservation.status === 'Confirmed').length;
  const revenue = state.transactions.reduce((sum, item) => sum + item.amount, 0);
  const recentReservation = state.reservations[0];

  return (
    <div className="dashboard">
      <section className="hero">
        <div>
          <p className="eyebrow">Campus Transportation Hub</p>
          <h1>Welcome to BYU-Idaho Transit</h1>
          <p className="hero-desc">
            Find parking in real-time, reserve a space quickly, and manage your payment activity from one dashboard.
          </p>
        </div>
        <div className="hero-tile">
          <p className="tile-label">Available Spots</p>
          <strong>{openSpots}</strong>
          <span>{openLots} active lots</span>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-card-label">Live Availability</p>
          <h2>{openSpots}</h2>
          <p>{openLots} lots currently open</p>
        </article>

        <article className="stat-card">
          <p className="stat-card-label">Reservations</p>
          <h2>{confirmedReservations}</h2>
          <p>Confirmed sessions awaiting arrival</p>
        </article>

        <article className="stat-card">
          <p className="stat-card-label">Revenue</p>
          <h2>${revenue.toFixed(2)}</h2>
          <p>Total transaction value</p>
        </article>
      </section>

      <section className="alerts-grid">
        <div className="alerts-header">
          <h2>Active Construction Alerts</h2>
          <p>Key campus parking updates for the next 7 days.</p>
        </div>
        <div className="alert-cards">
          {activeAlerts.map((alert) => (
            <article key={alert.title} className={`alert-card ${alert.tone}`}>
              <h3>{alert.title}</h3>
              <p className="alert-meta">Location: {alert.location}</p>
              <p>{alert.impact}</p>
              <p className="alert-eta">Expected completion: {alert.eta}</p>
            </article>
          ))}
        </div>
      </section>

      {recentReservation && (
        <section className="recent-card">
          <h3>Latest Reservation</h3>
          <div>
            <p><strong>{recentReservation.id}</strong> · {recentReservation.lotId}</p>
            <p>Time: {recentReservation.startTime}</p>
            <p>Duration: {recentReservation.durationHours} hour(s)</p>
            <p>Total paid: ${recentReservation.cost.toFixed(2)}</p>
          </div>
        </section>
      )}
    </div>
  );
}
