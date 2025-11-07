import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// 👇 Solo UNA definición de API y después de los imports
const API = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', dpi: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Error al registrar');
      setMsg({ type: 'success', text: 'Registro exitoso. Redirigiendo a login…' });
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setMsg({ type: 'danger', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3">Registro</h3>
              {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" name="name" value={form.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">DPI</label>
                  <input className="form-control" name="dpi" value={form.dpi} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required />
                </div>
                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Registrando…' : 'Crear cuenta'}
                </button>
              </form>
              <p className="mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
