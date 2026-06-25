import { useState } from "react";
import "./App.css";

import Dashboard from "./dashboard";
import LiveMapPage from "./LiveMapPage";
import SpotBookingPage from "./SpotBookingPage";
import PaymentPage from "./PaymentPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ParkingProvider } from "../context/ParkingContext";

function AppContent() {
  const { currentUser, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<"dashboard" | "map" | "booking" | "payment">("dashboard");
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [reservationMessage, setReservationMessage] = useState<string | null>(null);

  const openLogin = () => {
    setAuthView("login");
    setShowAuthModal(true);
  };

  const openRegister = () => {
    setAuthView("register");
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleAuthenticated = () => {
    setShowAuthModal(false);
  };

  const handleReservationConfirmed = (message: string) => {
    setReservationMessage(message);
    setCurrentPage("payment");
  };

  const handleSignOut = () => {
    logout();
    setCurrentPage("dashboard");
    setReservationMessage(null);
  };

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">BYU-Idaho Transit</p>
          <h1>Welcome to BYU-Idaho Parking</h1>
          <p>
            The dashboard is your starting point. Browse lots, reserve spots, and view purchases once signed in.
          </p>
        </div>
      </section>

      <section className="auth-summary">
        <div>
          <strong>
            {currentUser ? `Signed in as ${currentUser.name}` : "Guest access"}
          </strong>
          <p>
            {currentUser
              ? `You may reserve ${currentUser.role.toLowerCase()} and visitor parking, and view purchase history.`
              : "Sign in or create an account to see purchase history. Guests can still use the dashboard."}
          </p>
        </div>

        <div className="auth-actions">
          {currentUser ? (
            <button type="button" className="secondary-button" onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            <>
              <button type="button" onClick={openLogin}>
                Sign in
              </button>
              <button type="button" className="secondary-button" onClick={openRegister}>
                Create account
              </button>
            </>
          )}
        </div>
      </section>

      <nav className="page-nav">
        <button type="button" className={currentPage === "dashboard" ? "active" : ""} onClick={() => setCurrentPage("dashboard")}>
          Dashboard
        </button>
        <button type="button" className={currentPage === "map" ? "active" : ""} onClick={() => setCurrentPage("map")}>
          Live Map
        </button>
        <button type="button" className={currentPage === "booking" ? "active" : ""} onClick={() => setCurrentPage("booking")}>
          Booking
        </button>
        <button type="button" className={currentPage === "payment" ? "active" : ""} onClick={() => setCurrentPage("payment")}>
          Purchases
        </button>
      </nav>

      <section className="page-content">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "map" && <LiveMapPage />}
        {currentPage === "booking" && (
          <SpotBookingPage onReservationConfirmed={handleReservationConfirmed} />
        )}
        {currentPage === "payment" && (
          <div className="payment-section">
            {currentUser ? (
              <PaymentPage message={reservationMessage ?? undefined} />
            ) : (
              <div className="auth-required-card">
                <div className="detail-card payment-card">
                  <h2>Purchase history requires an account</h2>
                  <p>
                    Sign in or create an account to access your past purchases and payment details.
                  </p>
                  <div className="auth-actions">
                    <button type="button" onClick={openLogin}>
                      Sign in
                    </button>
                    <button type="button" className="secondary-button" onClick={openRegister}>
                      Create account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {showAuthModal && (
        <div className="auth-overlay">
          <div className="auth-modal">
            {authView === "register" ? (
              <RegisterPage
                onSwitchToLogin={() => setAuthView("login")}
                onAuthenticated={handleAuthenticated}
              />
            ) : (
              <LoginPage
                onSwitchToRegister={() => setAuthView("register")}
                onContinueAsGuest={() => {
                  closeAuthModal();
                }}
                onAuthenticated={handleAuthenticated}
              />
            )}
            <button className="auth-close" type="button" onClick={closeAuthModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ParkingProvider>
        <AppContent />
      </ParkingProvider>
    </AuthProvider>
  );
}
