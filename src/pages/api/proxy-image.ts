import type { NextApiRequest, NextApiResponse } from 'next';

// Este endpoint sirve imágenes externas usando una API key de Google de forma segura
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  // Tu API key de Google (debería estar en una variable de entorno en producción)
  const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyDY2t9c_ArGRbviemVxc29A7-a-s5IAR7o';

  // Construye la URL segura (ajusta según el servicio de Google que uses)
  const proxiedUrl = `${url}${url.includes('?') ? '&' : '?'}key=${API_KEY}`;

  try {
    const response = await fetch(proxiedUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    }
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
