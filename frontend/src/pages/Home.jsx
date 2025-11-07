import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="p-4 bg-light border rounded-3">
        <h2 className="mb-2">Bienvenido{user?.name ? `, ${user.name}` : ''} 👋</h2>
        <p className="mb-0">Esta es una ruta protegida. Tu sesión está activa en el Context.</p>
      </div>
    </div>
  );
}
