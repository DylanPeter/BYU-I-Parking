import { useParking } from '../context/ParkingContext';

type PaymentPageProps = {
  message?: string;
};

export default function PaymentPage({ message }: PaymentPageProps) {
  const { state, cancelReservation } = useParking();

  return (
    <div className="detail-card payment-card">
      <div className="payment-header">
        <div>
          <h2>Parking Payment</h2>
          <p className="muted">Track reservations, payments, and recent activity in one place.</p>
        </div>
      </div>

      {message && <div className="toast success" style={{ marginBottom: 16 }}>{message}</div>}

      <section>
        <h3>Your Active Reservations</h3>
        {state.reservations.length === 0 ? (
          <p className="muted">No reservations yet.</p>
        ) : (
          <div className="reservation-list">
            {state.reservations.map((r) => (
              <article key={r.id} className="reservation-card">
                <div className="reservation-top">
                  <strong>{r.id}</strong>
                  <span className={r.status === 'Confirmed' ? 'status-pill active' : 'status-pill'}>{r.status}</span>
                </div>
                <p>Lot: {r.lotId}</p>
                {r.spotLabel && <p>Spot: {r.spotLabel}</p>}
                <p>Start: {r.startTime}</p>
                <p>Duration: {r.durationHours} hour(s)</p>
                <p>Amount: ${r.cost.toFixed(2)}</p>
                {r.status === 'Confirmed' && (
                  <button type="button" className="cancel-button" onClick={() => cancelReservation(r.id)}>
                    Cancel reservation
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3>Transaction History</h3>
        {state.transactions.length === 0 ? (
          <p className="muted">No payments yet.</p>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {state.transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.description ?? t.id}</td>
                  <td>{new Date(t.date).toLocaleString()}</td>
                  <td>${t.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
