
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { getCurrentUser } from "./services/authService";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin(result) {
    setError("");

    // Verifica el token directamente con el backend.
    const response = await getCurrentUser(result.token);

    // Conserva el token y los datos de usuario solo en memoria.
    setSession({
      token: result.token,
      user: { ...result.user, ...response.user },
    });

    setScreen("dashboard");
  }

  function handleLogout() {
    setSession(null);
    setError("");
    setScreen("login");
  }

  if (session) {
    return (
      <Dashboard
        user={session.user}
        onLogout={handleLogout}
      />
    );
  }

  if (screen === "register") {
    return (
      <Register
        onRegistered={() => setScreen("login")}
        onShowLogin={() => setScreen("login")}
      />
    );
  }

  return (
    <>
      {error && <p className="error-message" role="alert">{error}</p>}
      <Login
        onLogin={handleLogin}
        onShowRegister={() => setScreen("register")}
      />
    </>
  );
}
