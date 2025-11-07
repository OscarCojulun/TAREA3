import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 4000;

// --- middlewares ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// --- "base de datos" en memoria ---
const users = []; // { name, dpi, email, password }
const emailExists = (email) =>
  users.some(u => u.email.toLowerCase() === email.toLowerCase());

// --- rutas API (prefijo /api) ---
app.post('/api/register', (req, res) => {
  const { name, dpi, email, password } = req.body || {};
  if (!name || !dpi || !email || !password) {
    return res.status(400).json({ ok: false, message: 'Todos los campos son obligatorios.' });
  }
  if (emailExists(email)) {
    return res.status(409).json({ ok: false, message: 'El email ya está registrado.' });
  }
  users.push({ name, dpi, email, password });
  return res.status(201).json({ ok: true, message: 'Registro exitoso.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return res.status(401).json({ ok: false, message: 'Credenciales inválidas.' });
  res.json({ ok: true, user: { name: user.name, dpi: user.dpi, email: user.email } });
});

// --- SERVIR FRONTEND en PRODUCCIÓN ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// carpeta del build de React
const distPath = path.resolve(__dirname, '../frontend/dist');

// si existe el build, sirve estáticos
app.use(express.static(distPath));
// para cualquier ruta que no sea /api, devuelve index.html (SPA)
app.get('*', (req, res) => {
  // si piden una ruta de la SPA y no es api, devuelve el index del build
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  // si es /api y no match, 404 json
  res.status(404).json({ ok: false, message: 'Endpoint no encontrado' });
});

app.listen(PORT, () => {
  console.log(`✅ API escuchando en http://localhost:${PORT}`);
});
