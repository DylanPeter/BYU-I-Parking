import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

type RegisterPageProps = {
  onSwitchToLogin: () => void;
  onAuthenticated: () => void;
};

export default function RegisterPage({
  onSwitchToLogin,
  onAuthenticated,
}: RegisterPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Student" | "Faculty">("Student");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await register(name, email, password, role);
    if (!result.success) {
      setError(result.error ?? "Unable to create an account.");
      return;
    }
    setError(null);
    onAuthenticated();
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Create a BYU-I Account</h1>
        <p>Use a valid @byui.edu email to register as student or faculty.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="register-email">BYU-I Email</label>
          <input
            id="register-email"
            type="email"
            placeholder="name@byui.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
          />

          <label htmlFor="register-role">I am a</label>
          <select
            id="register-role"
            value={role}
            onChange={(e) => setRole(e.target.value as "Student" | "Faculty")}
          >
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-switch">
          Already registered?{' '}
          <button type="button" onClick={onSwitchToLogin}>
            Sign in
          </button>
        </p>
      </section>
    </main>
  );
}
