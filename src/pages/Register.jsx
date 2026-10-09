
import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register({ onRegistered, onShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 12 || password.length > 72) {
      setError("La contrasena debe tener entre 12 y 72 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password });
      setMessage("Cuenta creada correctamente. Ahora puedes iniciar sesion.");
      setPassword("");
      if (onRegistered) onRegistered();
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        <p>Registra tus datos para comenzar.</p>

        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">Correo electronico</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          maxLength={255}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Contrasena</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          maxLength={72}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="error-message" role="alert">{error}</p>}
        {message && <p className="success-message" role="status">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="auth-switch">
          ¿Ya tienes cuenta?{" "}
          <button type="button" className="text-button" onClick={onShowLogin}>
            Inicia sesion
          </button>
        </p>
      </form>
    </main>
  );
}
