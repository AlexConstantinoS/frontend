
export default function Dashboard({ user, onLogout }) {
  return (
    <main className="dashboard-container">
      <section className="dashboard-card">
        <h1>Bienvenido, {user.name}</h1>
        <p>Has iniciado sesion correctamente.</p>

        <div className="account-info">
          <h2>Datos de tu cuenta</h2>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>

        {user.role === "admin" && (
          <p className="admin-notice">
            Tu cuenta tiene permisos de administrador.
          </p>
        )}

        <button type="button" onClick={onLogout}>
          Cerrar sesion
        </button>
      </section>
    </main>
  );
}
