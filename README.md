# TAREA3

Oscar José Cojulún Mendoza Carnet: 9490-22-4974

Descripción: El proyecto fue desarrollado utilizando React para el frontend y Express para el backend.

En el frontend, se empleó Vite como entorno de desarrollo rápido, React Router para la navegación entre páginas, Context API para manejar la sesión del usuario y Bootstrap para el diseño y estilo visual de la aplicación.

En el backend, se utilizó Node.js con Express para crear las rutas de registro y login, manejando los datos en un arreglo en memoria y permitiendo la comunicación con el frontend mediante CORS.

El despliegue se realizó en Render (API) y Netlify (frontend), conectando ambos servicios mediante una variable de entorno que define la URL de la API en producción.

Netlify: https://tarea3desarrollo.netlify.app/login
Render: https://tarea3-3t48.onrender.com/api

Estructura: 
tarea3/
  backend/           # API Express
    server.js
    package.json
  frontend/          # React + Vite
    src/
    public/_redirects
    vite.config.js
    package.json
  README.md
