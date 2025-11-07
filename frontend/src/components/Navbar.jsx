import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Auth Demo</Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">Hola, <strong>{user?.name}</strong></span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={logout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Registro</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
