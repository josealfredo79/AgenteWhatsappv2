// Servidor Node.js para Next.js + Socket.io
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: '/socket.io',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado a Socket.io');
    // Ejemplo: emitir mensaje de bienvenida
    socket.emit('server-message', { msg: 'Conexión Socket.io exitosa' });
    // Aquí puedes manejar eventos personalizados para el dashboard
  });
  // MCP (Model Context Protocol) - endpoints mínimos embebidos
  // - GET  /mcp/health        -> { status: 'ok' }
  // - POST /mcp/v1/context   -> recibir contexto JSON y responder ack
  const handleMCP = async (req, res) => {
    if (req.method === 'GET' && req.url === '/mcp/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
      return true;
    }

    if (req.method === 'POST' && req.url === '/mcp/v1/context') {
      try {
        let body = '';
        for await (const chunk of req) body += chunk;
        const payload = body ? JSON.parse(body) : {};
        console.log('MCP context received:', payload);
        // Aquí podrías validar o enrutar el contexto a un gestor local o cola
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, received: Array.isArray(payload) ? payload.length : 1 }));
        return true;
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'invalid_json', message: err.message }));
        return true;
      }
    }

    return false;
  };

  const PORT = process.env.PORT || 3000;
  server.on('request', async (req, res) => {
    // Primero intentamos manejar rutas MCP antes de pasar a Next.js
    const handled = await handleMCP(req, res);
    if (!handled) {
      // Si no es ruta MCP, delegar a Next.js
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Servidor Next.js + Socket.io + MCP listo en http://localhost:${PORT}`);
  });
});
