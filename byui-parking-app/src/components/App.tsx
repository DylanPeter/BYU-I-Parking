import { useState } from "react";
import "./App.css";
import Dashboard from "./dashboard";
import LiveMapPage from "./LiveMapPage";
import SpotBookingPage from "./SpotBookingPage";
import PaymentLedgerPage from "./PaymentLedgerPage";
import { ParkingProvider } from '../context/ParkingContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'map' | 'booking' | 'ledger'>('dashboard');

  return (
    <ParkingProvider>
      <div className="app">
      <header>
        <div className="brand-bar">
          <p className="eyebrow">BYU-Idaho Transit</p>
          <h1>Parking Management</h1>
        </div>

        <nav>
          <h2>Navigation</h2>
          <ul>
            <li>
              <button type="button" className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => setCurrentPage('dashboard')}>
                Dashboard
              </button>
            </li>
            <li>
              <button type="button" className={currentPage === 'map' ? 'active' : ''} onClick={() => setCurrentPage('map')}>
                Live Map
              </button>
            </li>
            <li>
              <button type="button" className={currentPage === 'booking' ? 'active' : ''} onClick={() => setCurrentPage('booking')}>
                Spot Selector
              </button>
            </li>
            <li>
              <button type="button" className={currentPage === 'ledger' ? 'active' : ''} onClick={() => setCurrentPage('ledger')}>
                Ledger
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Render the view based on state */}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'map' && <LiveMapPage />}
        {currentPage === 'booking' && <SpotBookingPage />}
        {currentPage === 'ledger' && <PaymentLedgerPage />}
      </main>

      <footer>
        <p>&copy; 2026 BYU-Idaho Parking Services</p>
      </footer>
      </div>
    </ParkingProvider>
  );
}

export default App;
