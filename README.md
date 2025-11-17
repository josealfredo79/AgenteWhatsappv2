# Agente WhatsApp con Claude AI, Google APIs y MCP


Plataforma profesional para atención al cliente vía WhatsApp, integrando:
- Claude AI (Anthropic)
- Google Docs (base de conocimiento)
- Google Sheets (registro de clientes)
- Google Calendar (agendamiento de citas)
- Twilio WhatsApp
- Next.js (API routes y dashboard)
- Configuración lista para Railway

---

## Despliegue rápido en Railway

1. **Clona el repositorio y sube tus credenciales**
   - Sube `google-credentials.json` (no lo subas a git)
   - Completa `.env` usando `.env.example`
2. **Instala dependencias**
   ```bash
   cd frontend
   npm install
   ```
3. **Configura Railway**
   - Usa el `Procfile` y `railway.json` incluidos
   - Variables de entorno: copia todas las de `.env.example` en Railway
   - Asegúrate de tener los plugins de Node.js y variables de entorno seguras
4. **Despliega**
   - Railway detectará el frontend Next.js automáticamente

---


## Variables de entorno recomendadas

Revisa y completa `frontend/.env.local`:
- **Twilio**: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER`
- **Claude AI**: `ANTHROPIC_API_KEY`
- **Google APIs**: `GOOGLE_DOCS_ID`, `GOOGLE_SHEET_ID`, `GOOGLE_CALENDAR_ID`, `GOOGLE_SERVICE_ACCOUNT_FILE`
- **Dashboard**: `NEXT_PUBLIC_DASHBOARD_USER`, `NEXT_PUBLIC_DASHBOARD_PASS`

---


## Endpoints principales

- **Webhook WhatsApp**: `POST /api/webhook/whatsapp`
- **Registro cliente**: `POST /api/registro`
- **Agendar evento**: `POST /api/agendar`
- **Enviar mensaje**: `POST /api/send-message`
- **Historial mensajes**: `GET /api/messages/[id]`
- **Dashboard**: Next.js en `/dashboard`
- **Healthcheck**: `/api/health`

---


## Buenas prácticas y seguridad

- **API Next.js**: Validación de payload, manejo seguro de variables de entorno
- **Frontend**: Autenticación protegida, manejo de sesión seguro, límite de intentos
- **Monitoreo**: Usa `/api/health` y considera integrar Railway Metrics, Datadog o Sentry
- **No subas credenciales ni `.env.local` a git**
- **Pruebas**: Usa la carpeta `test/` para pruebas automáticas

---


## Troubleshooting y recomendaciones producción

- Si la API no responde, revisa variables de entorno y credenciales en `frontend/.env.local`
- Si el dashboard no conecta, revisa rutas y autenticación
- Para escalar, usa Railway o Vercel para Next.js
- Actualiza dependencias regularmente y revisa vulnerabilidades con `npm audit`

---

## Créditos y contacto


Desarrollado por tu equipo con mejores prácticas de IA, Node.js y despliegue cloud.
