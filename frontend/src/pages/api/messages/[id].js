let mensajesPorConversacion = {};

export default function handler(req, res) {
  const {
    query: { id },
  } = req;
  res.json(mensajesPorConversacion[id] || []);
}
