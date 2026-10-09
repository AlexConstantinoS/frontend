
import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser({ email, password });
      await onLogin(result);
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <p>Accede a tu cuenta de forma segura.</p>

        <label htmlFor="email">Correo electronico</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Contrasena</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="error-message" role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar sesion"}
        </button>

        <p className="auth-switch">
          ¿No tienes cuenta?{" "}
          <button type="button" className="text-button" onClick={onShowRegister}>
            Registrate
          </button>
        </p>
      </form>
    </main>
  );
}
