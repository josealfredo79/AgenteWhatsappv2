# Agente WhatsApp con Claude AI, Google APIs y MCP

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Railway](https://img.shields.io/badge/Railway-Ready-0B0D0E)](https://railway.app/)

[![CI](https://github.com/josealfredo79/AgenteWhatsappv2/actions/workflows/ci.yml/badge.svg)](https://github.com/josealfredo79/AgenteWhatsappv2/actions/workflows/ci.yml)

> ⚠️ **ADVERTENCIA DE SEGURIDAD:** 
> 
> **NUNCA subas credenciales, API keys, tokens o archivos `.env` a GitHub/GitLab.**
> 
> Google, GitHub y otras plataformas escanean repositorios automáticamente y invalidan credenciales expuestas.
> 
> 📖 **Lee [SEGURIDAD.md](./SEGURIDAD.md) antes de hacer commit.**

Plataforma profesional para atención al cliente vía WhatsApp, integrando:
- 🤖 **Claude AI (Anthropic)** - Procesamiento de lenguaje natural
- 📄 **Google Docs** - Base de conocimiento
- 📊 **Google Sheets** - Registro de clientes
- 📅 **Google Calendar** - Agendamiento de citas
- 💬 **Twilio WhatsApp** - Comunicación por WhatsApp
- ⚡ **Next.js 16** - Framework React con API Routes
- 🚀 **Railway** - Despliegue cloud-ready

---

## 📋 Requisitos Previos

- Node.js 18+ (recomendado: Node.js 20 LTS)
- npm o yarn
- Cuenta de Twilio con WhatsApp habilitado
- API Key de Anthropic (Claude AI)
- Proyecto de Google Cloud con APIs habilitadas:
  - Google Docs API
  - Google Sheets API
  - Google Calendar API
- Credenciales de servicio de Google Cloud (JSON)

---

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd agentewhatsappv1
```

### 2. Instalar dependencias

```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `frontend/.env.local` basándote en `frontend/.env.example`:

```bash
cp frontend/.env.example frontend/.env.local
```

Edita `frontend/.env.local` y completa todas las variables. Ver sección [Variables de Entorno](#-variables-de-entorno) para más detalles.

### 4. Configurar credenciales de Google

**Opción A: Usando variable de entorno (Recomendado para producción)**
- Configura `GOOGLE_CREDENTIALS_JSON` en Railway/entorno de producción con el contenido completo del JSON

**Opción B: Usando archivo local (Solo desarrollo)**
- Coloca tu archivo `google-credentials.json` en `frontend/`
- ⚠️ **NUNCA** subas este archivo a git (está en `.gitignore`)

### 5. Ejecutar en desarrollo

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🌐 Despliegue en Railway

Railway detecta automáticamente proyectos Next.js. Sigue estos pasos:

### 1. Preparar el proyecto

- Asegúrate de que `nixpacks.toml` y `railway.json` estén en la raíz
- Verifica que `frontend/package.json` tenga los scripts correctos

### 2. Conectar con Railway

1. Crea un nuevo proyecto en [Railway](https://railway.app/)
2. Conecta tu repositorio de GitHub/GitLab
3. Railway detectará automáticamente la configuración

### 3. Configurar variables de entorno

En el dashboard de Railway, agrega todas las variables de entorno necesarias. Consulta `frontend/.env.example` para la lista completa.

**Variables críticas:**
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_NUMBER`
- `ANTHROPIC_API_KEY`
- `GOOGLE_CREDENTIALS_JSON` (contenido completo del JSON)
- `GOOGLE_DOCS_ID`
- `GOOGLE_SHEET_ID`
- `GOOGLE_CALENDAR_ID`

### 4. Desplegar

Railway construirá y desplegará automáticamente. El proceso:
1. Instala dependencias (`npm ci` en `frontend/`)
2. Construye la aplicación (`npm run build`)
3. Inicia el servidor (`npm run start`)

### 5. Configurar Webhook de Twilio

Una vez desplegado, configura el webhook de Twilio:
- URL: `https://tu-app.railway.app/api/webhook/whatsapp`
- Método: `POST`

---

## 📦 Despliegue detallado y credenciales (Railway)

Sigue estas instrucciones rápidas para asegurar un despliegue correcto en Railway:

1. En el panel del proyecto (Railway) ve a **Variables** y añade las variables necesarias. Marca las sensibles como secret.

2. Variables recomendadas (mínimo para producción):

  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_WHATSAPP_NUMBER`
  - `ANTHROPIC_API_KEY`
  - `GOOGLE_CREDENTIALS_JSON`  (preferido) o `GOOGLE_CREDENTIALS_B64`
  - `GOOGLE_DOCS_ID`, `GOOGLE_SHEET_ID`, `GOOGLE_CALENDAR_ID` (si aplica)

3. Cómo proporcionar las credenciales de Google:

  - Opción 1 (directo): Copia el contenido del archivo JSON de la cuenta de servicio en `GOOGLE_CREDENTIALS_JSON`.
  - Opción 2 (base64): `base64 -w0 service-account.json > creds.b64` y copia el contenido a `GOOGLE_CREDENTIALS_B64`.

  El script `frontend/create-google-credentials.js` generará `frontend/google-credentials.json` en `prestart` a partir de cualquiera de estas variables.

4. Forzar reconstrucción: después de añadir variables, en **Deployments** elige `Redeploy` o `Rebuild without cache` para que Nixpacks seleccione la versión de Node configurada (`nodejs_20`).

5. Logs y verificación: revisa los logs del build y del proceso web. El servidor responde en la ruta `/mcp/health` con `{ "status": "ok" }` cuando está listo.

6. CI: el workflow `.github/workflows/ci.yml` usa Node 20 y ejecuta `cd frontend && npm test` para validar que los endpoints MCP respondan correctamente.

---

## 🔐 Variables de Entorno

### Variables Requeridas

#### Twilio
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

#### Anthropic (Claude AI)
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx
```

#### Google APIs
```env
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}  # Contenido completo del JSON
# O para desarrollo local:
GOOGLE_SERVICE_ACCOUNT_FILE=./google-credentials.json
GOOGLE_DOCS_ID=tu_documento_id
GOOGLE_SHEET_ID=tu_spreadsheet_id
GOOGLE_CALENDAR_ID=tu_calendar_id
```

#### Dashboard (Opcional)
```env
NEXT_PUBLIC_DASHBOARD_USER=admin
NEXT_PUBLIC_DASHBOARD_PASS=tu_password_seguro
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

#### Otros
```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://tu-dominio.com,https://otro-dominio.com
```

> 📝 **Nota:** Consulta `frontend/.env.example` para ver todas las variables disponibles.

---

## 📡 Endpoints de la API

### Webhook WhatsApp
```http
POST /api/webhook/whatsapp
Content-Type: application/json

{
  "Body": "Mensaje del usuario",
  "From": "whatsapp:+5215551234567"
}
```
Procesa mensajes entrantes de WhatsApp usando Claude AI y responde automáticamente.

### Registrar Cliente
```http
POST /api/registro
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "telefono": "+5215551234567",
  "email": "juan@example.com"
}
```
Registra un nuevo cliente en Google Sheets.

### Agendar Evento
```http
POST /api/agendar
Content-Type: application/json

{
  "resumen": "Consulta médica",
  "descripcion": "Primera consulta",
  "inicio": "2025-01-28T10:00:00-06:00",
  "fin": "2025-01-28T11:00:00-06:00",
  "email": "cliente@example.com"
}
```
Crea un evento en Google Calendar.

### Enviar Mensaje
```http
POST /api/send-message
Content-Type: application/json

{
  "to": "whatsapp:+5215551234567",
  "body": "Mensaje a enviar"
}
```
Envía un mensaje manual a través de Twilio WhatsApp.

### Obtener Mensajes
```http
GET /api/messages/[id]
```
Obtiene el historial de mensajes de una conversación.

### Health Check
```http
GET /api/health
```
Verifica el estado de la aplicación. Retorna:
```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": 1706380800000,
  "version": "1.0.0"
}
```

---

## 🛡️ Seguridad y Mejores Prácticas

### Seguridad

- ✅ **Nunca subas credenciales a git** - Usa variables de entorno
- ✅ **Valida todas las entradas** - Implementa validación en todos los endpoints
- ✅ **Usa HTTPS en producción** - Railway proporciona SSL automático
- ✅ **Configura CORS apropiadamente** - Limita orígenes permitidos
- ✅ **Maneja errores de forma segura** - No expongas detalles internos en producción
- ✅ **Actualiza dependencias regularmente** - Ejecuta `npm audit` periódicamente

### Monitoreo

- Usa `/api/health` para healthchecks
- Considera integrar:
  - [Railway Metrics](https://docs.railway.app/develop/metrics)
  - [Sentry](https://sentry.io/) para error tracking
  - [Datadog](https://www.datadoghq.com/) para APM

### Performance

- Next.js optimiza automáticamente imágenes y assets
- Usa `npm run build` para producción (optimizaciones incluidas)
- Considera implementar caché para consultas frecuentes a Google APIs

---

## 🧪 Testing

### Pruebas Manuales

Ejecuta el script de pruebas de API:

```bash
cd frontend
chmod +x test_api_connections.sh
./test_api_connections.sh
```

### Pruebas de Endpoints

Consulta `frontend/RESULTADOS_PRUEBAS_API.md` para ver resultados de pruebas.

---

## 🐛 Troubleshooting

### La API no responde

1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs en Railway: `railway logs`
3. Verifica el healthcheck: `curl https://tu-app.railway.app/api/health`

### El dashboard no carga

1. Verifica las credenciales en `NEXT_PUBLIC_DASHBOARD_USER` y `NEXT_PUBLIC_DASHBOARD_PASS`
2. Revisa la consola del navegador para errores
3. Verifica que `NEXT_PUBLIC_BACKEND_URL` apunte a la URL correcta

### Errores con Google APIs

1. Verifica que las credenciales de servicio sean válidas
2. Asegúrate de que las APIs estén habilitadas en Google Cloud Console
3. Verifica que los IDs de documentos/hojas/calendario sean correctos
4. Revisa los permisos de la cuenta de servicio

### Mensajes de WhatsApp no llegan

1. Verifica la configuración del webhook en Twilio
2. Asegúrate de que `TWILIO_WHATSAPP_NUMBER` esté correcto
3. Verifica que el número esté verificado en Twilio
4. Revisa los logs de Twilio para errores

---

## 📚 Documentación Adicional

- 🔒 **[SEGURIDAD.md](./SEGURIDAD.md)** - **⚠️ LEE ESTO PRIMERO** - Protección de credenciales
- [Análisis del Repositorio](./ANALISIS_REPOSITORIO.md) - Análisis detallado y recomendaciones
- [Guía de Despliegue en Railway](./GUIA_DESPLIEGUE_RAILWAY.md) - Instrucciones paso a paso
- [Checklist de Variables Railway](./CHECKLIST_VARIABLES_RAILWAY.md) - Checklist de configuración
- [Resultados de Pruebas](./frontend/RESULTADOS_PRUEBAS_API.md) - Resultados de pruebas de API
- [Next.js Documentation](https://nextjs.org/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp)
- [Anthropic API Documentation](https://docs.anthropic.com/)

---

## 🔄 Actualización de Dependencias

Para mantener el proyecto actualizado:

```bash
cd frontend
npm outdated          # Ver dependencias desactualizadas
npm update            # Actualizar dependencias (minor/patch)
npm audit             # Verificar vulnerabilidades
npm audit fix         # Corregir vulnerabilidades automáticamente
```

---

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados.

---

## 👥 Créditos

Desarrollado con mejores prácticas de:
- Next.js 16 (App Router)
- TypeScript
- Railway Deployment
- Claude AI (Anthropic)
- Google Cloud APIs
- Twilio WhatsApp API

---

**Versión:** 1.0.0  
**Última actualización:** 2025-01-27
