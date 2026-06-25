import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

type LoginPageProps = {
  onSwitchToRegister: () => void;
  onContinueAsGuest: () => void;
  onAuthenticated: () => void;
};

export default function LoginPage({
  onSwitchToRegister,
  onContinueAsGuest,
  onAuthenticated,
}: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error ?? "Unable to sign in.");
      return;
    }
    setError(null);
    onAuthenticated();
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Sign in to BYU-I Parking</h1>
        <p>Only students and faculty with a @byui.edu account may sign in.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">BYU-I Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="name@byui.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit">Sign in</button>
        </form>

        <div className="auth-actions">
          <button type="button" className="ghost-button" onClick={onContinueAsGuest}>
            Continue as guest
          </button>
        </div>

        <p className="auth-switch">
          New to BYU-I Parking?{' '}
          <button type="button" onClick={onSwitchToRegister}>
            Create an account
          </button>
        </p>
      </section>
    </main>
  );
}
