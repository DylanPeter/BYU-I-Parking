import type { Reservation } from "../types/parking";

type ReservationConfirmationProps = {
  reservation: Reservation;
  hours: number;
  onReset: () => void;
};

export default function ReservationConfirmation({
  reservation,
  hours,
  onReset,
}: ReservationConfirmationProps) {
  return (
    <main className="app">
      <section className="confirmation-card">
        <div className="success-icon">✓</div>
        <h1>Reservation Confirmed</h1>
        <p>You reserved parking in:</p>
        <h2>{reservation.lot}</h2>

        <div className="reservation-details">
          <p>
            <strong>Start Time:</strong> {reservation.startTime}
          </p>
          <p>
            <strong>Duration:</strong> {reservation.duration}
          </p>
          <p>
            <strong>Cost:</strong> ${(hours * 1.5).toFixed(2)}
          </p>
        </div>

        <div className="qr-box">
          <span>{reservation.code}</span>
        </div>

        <p className="small-text">
          Show this code if campus parking needs to verify your reservation.
        </p>

        <button onClick={onReset}>Back to Lots</button>
      </section>
    </main>
  );
}