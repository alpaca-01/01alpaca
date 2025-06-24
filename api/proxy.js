import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://script.google.com/macros/s/AKfycbwZoGdlpJfaDwaP2MH94xv1M3sQRe5eihzJSgRd_LSfW0JhwAt_2NZKzKjGOhN7wGdi/exec'; // <-- Poné acá tu URL deploy del Apps Script

  try {
    // Forward request parameters from client to Apps Script URL
    const params = new URLSearchParams(req.query).toString();
    const fetchUrl = `${url}?${params}`;

    const response = await fetch(fetchUrl);
    const data = await response.json();

    // Agregar cabecera CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Para preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error en el proxy', details: error.message });
  }
}
