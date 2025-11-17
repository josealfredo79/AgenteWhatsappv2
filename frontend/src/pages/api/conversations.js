export default function handler(req, res) {
  res.json([
    { id: 1, usuario: 'Juan', ultimoMensaje: 'Hola', timestamp: Date.now() },
    { id: 2, usuario: 'Ana', ultimoMensaje: '¿Puedo agendar cita?', timestamp: Date.now() }
  ]);
}
