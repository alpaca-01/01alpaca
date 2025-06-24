export default async function handler(req, res) {
  const { baseUsuario, nombre } = req.query;

  const url = `https://script.google.com/macros/s/AKfycbwZoGdlpJfaDwaP2MH94xv1M3sQRe5eihzJSgRd_LSfW0JhwAt_2NZKzKjGOhN7wGdi/exec?baseUsuario=${encodeURIComponent(baseUsuario)}&nombre=${encodeURIComponent(nombre)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Habilitamos CORS para todos
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar Google Apps Script' });
  }
}
