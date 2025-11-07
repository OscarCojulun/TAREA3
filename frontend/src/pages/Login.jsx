import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.message || 'Error al iniciar sesión');
      login(data.user);
      navigate('/');
    } catch (err) {
      setMsg({ type: 'danger', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Login</h3>
              {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required />
                </div>
                <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'Ingresando…' : 'Entrar'}
                </button>
              </form>
              <p className="mt-3 mb-0">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
