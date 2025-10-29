/* const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { xss } = require("express-xss-sanitizer");

app.use(helmet()); // Seguridad HTTP headers

// Límite de peticiones por IP (100 cada 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde.",
});
app.use(limiter);

app.use(xss()); // Sanitiza entradas XSS */

// (Opcional) — CORS si tu frontend está en otro dominio
// const cors = require('cors')
// app.use(cors({ origin: 'https://tu-frontend.com', credentials: true }))