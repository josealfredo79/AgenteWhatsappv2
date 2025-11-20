# 🚀 Guía Completa de Despliegue en Railway

**Versión:** 1.0.0  
**Última actualización:** 2025-01-27

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Preparación del Repositorio](#preparación-del-repositorio)
3. [Crear Proyecto en Railway](#crear-proyecto-en-railway)
4. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
5. [Desplegar la Aplicación](#desplegar-la-aplicación)
6. [Configurar Webhook de Twilio](#configurar-webhook-de-twilio)
7. [Verificar Despliegue](#verificar-despliegue)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta en [Railway](https://railway.app/) (gratis o de pago)
- ✅ Repositorio en GitHub/GitLab/Bitbucket
- ✅ Credenciales de Twilio (Account SID, Auth Token, WhatsApp Number)
- ✅ API Key de Anthropic (Claude AI)
- ✅ Credenciales de Google Cloud (JSON de cuenta de servicio)
- ✅ IDs de recursos de Google:
  - Google Docs ID
  - Google Sheets ID
  - Google Calendar ID

---

## 🔧 Preparación del Repositorio

### 1. Verificar Archivos de Configuración

Asegúrate de que estos archivos estén en la raíz del repositorio:

- ✅ `nixpacks.toml` - Configuración de build
- ✅ `railway.json` - Configuración de despliegue
- ✅ `frontend/package.json` - Con scripts correctos
- ✅ `frontend/.env.example` - Template de variables

### 2. Verificar Estructura

```
agentewhatsappv1/
├── nixpacks.toml          ✅
├── railway.json            ✅
├── frontend/
│   ├── package.json        ✅
│   ├── next.config.ts      ✅
│   ├── server.js           ✅
│   └── .env.example        ✅
└── README.md              ✅
```

### 3. Commit y Push

Asegúrate de que todos los cambios estén en tu repositorio:

```bash
git add .
git commit -m "Preparar para despliegue en Railway"
git push origin main
```

---

## 🎯 Crear Proyecto en Railway

### Paso 1: Iniciar Sesión en Railway

1. Ve a [railway.app](https://railway.app/)
2. Inicia sesión con GitHub/GitLab/Bitbucket
3. Acepta los permisos necesarios

### Paso 2: Crear Nuevo Proyecto

1. Haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"** (o tu proveedor de Git)
3. Selecciona tu repositorio `agentewhatsappv1`
4. Railway detectará automáticamente que es un proyecto Next.js

### Paso 3: Configurar el Servicio

Railway creará automáticamente un servicio. Verifica que:

- **Name:** Puedes renombrarlo (ej: "agente-whatsapp")
- **Source:** Apunta a tu repositorio
- **Branch:** `main` (o la rama que uses)

---

## 🔐 Configurar Variables de Entorno

### Paso 1: Acceder a Variables de Entorno

1. En tu proyecto de Railway, haz clic en el servicio
2. Ve a la pestaña **"Variables"**
3. Haz clic en **"New Variable"** para cada variable

### Paso 2: Agregar Variables Críticas

#### Twilio (WhatsApp)

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Cómo obtener:**
- Ve a [Twilio Console](https://console.twilio.com/)
- Account SID y Auth Token están en el dashboard
- WhatsApp Number: Configuración > WhatsApp > Números

#### Anthropic (Claude AI)

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx
```

**Cómo obtener:**
- Ve a [Anthropic Console](https://console.anthropic.com/)
- Settings > API Keys
- Crea una nueva API key

#### Google Cloud APIs

**Opción 1: Variable de Entorno (Recomendado)**

```env
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

⚠️ **Importante:** Pega el JSON completo en una sola línea. Si tienes problemas, escapa las comillas dobles.

**Opción 2: Usar el contenido completo del archivo JSON**

1. Abre tu archivo `google-credentials.json`
2. Copia TODO el contenido
3. Pégalo en Railway como valor de `GOOGLE_CREDENTIALS_JSON`
4. Asegúrate de que esté en una sola línea (sin saltos de línea)

**IDs de Recursos de Google:**

```env
GOOGLE_DOCS_ID=tu_documento_id_aqui
GOOGLE_SHEET_ID=tu_spreadsheet_id_aqui
GOOGLE_CALENDAR_ID=tu_calendar_id_aqui
```

**Cómo obtener los IDs:**

- **Google Docs ID:** 
  - Abre el documento
  - URL: `https://docs.google.com/document/d/[ID_AQUI]/edit`
  - Copia el ID de la URL

- **Google Sheets ID:**
  - Abre la hoja de cálculo
  - URL: `https://docs.google.com/spreadsheets/d/[ID_AQUI]/edit`
  - Copia el ID de la URL

- **Google Calendar ID:**
  - Abre Google Calendar
  - Configuración > Configuración de calendarios
  - Busca "ID de calendario" en la sección del calendario
  - O usa `primary` para el calendario principal

#### Dashboard (Opcional)

```env
NEXT_PUBLIC_DASHBOARD_USER=admin
NEXT_PUBLIC_DASHBOARD_PASS=tu_password_seguro_aqui
NEXT_PUBLIC_BACKEND_URL=https://tu-app.railway.app
```

⚠️ **Seguridad:** Cambia el usuario y contraseña por defecto.

#### Configuración del Servidor

```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://tu-dominio.com
```

**Nota:** Railway asignará automáticamente el `PORT`, pero puedes dejarlo por si acaso.

### Paso 3: Verificar Variables

Asegúrate de tener todas estas variables configuradas:

- ✅ `TWILIO_ACCOUNT_SID`
- ✅ `TWILIO_AUTH_TOKEN`
- ✅ `TWILIO_WHATSAPP_NUMBER`
- ✅ `ANTHROPIC_API_KEY`
- ✅ `GOOGLE_CREDENTIALS_JSON`
- ✅ `GOOGLE_DOCS_ID`
- ✅ `GOOGLE_SHEET_ID`
- ✅ `GOOGLE_CALENDAR_ID`
- ✅ `NODE_ENV=production`
- ✅ `NEXT_PUBLIC_DASHBOARD_USER` (opcional)
- ✅ `NEXT_PUBLIC_DASHBOARD_PASS` (opcional)

---

## 🚀 Desplegar la Aplicación

### Paso 1: Trigger del Despliegue

Railway desplegará automáticamente cuando:

1. **Push a la rama principal** (si tienes auto-deploy habilitado)
2. **Manual:** Haz clic en **"Deploy"** en el dashboard
3. **Railway CLI:** Si usas la CLI

### Paso 2: Monitorear el Build

1. Ve a la pestaña **"Deployments"**
2. Observa el proceso de build:
   - ✅ Setup: Instalando Node.js
   - ✅ Install: `npm ci` en frontend
   - ✅ Build: `npm run build`
   - ✅ Start: `npm run start`

### Paso 3: Verificar Logs

1. Haz clic en el deployment activo
2. Revisa los logs para verificar:
   - ✅ Dependencias instaladas correctamente
   - ✅ Build completado sin errores
   - ✅ `google-credentials.json` creado correctamente
   - ✅ Servidor iniciado en el puerto correcto

**Logs esperados:**
```
✅ google-credentials.json creado correctamente desde variable de entorno
Servidor Next.js + Socket.io listo en http://0.0.0.0:3000
```

### Nota importante: Forzar reconstrucción (Rebuild without cache)

Si acabas de añadir o cambiar variables de entorno críticas (especialmente `GOOGLE_CREDENTIALS_JSON` o `GOOGLE_CREDENTIALS_B64`), Railway puede usar cache de dependencias o artefactos previos. Para asegurarte de que la build use la configuración y lockfile actuales, haz un **Rebuild without cache**:

1. En el dashboard del proyecto, ve a **Deployments**
2. Selecciona el deployment más reciente
3. Haz clic en **Redeploy** y elige **Rebuild without cache** (o similar) para forzar una build limpia

Esto es especialmente importante porque `frontend/create-google-credentials.js` aborta el arranque en `NODE_ENV=production` si no detecta `GOOGLE_CREDENTIALS_JSON` o `GOOGLE_CREDENTIALS_B64` (fail-fast). Si no configuras estas variables antes de un deploy, la fase `prestart` puede fallar y el proceso no iniciará.


### Paso 4: Obtener URL de Producción

1. En el dashboard de Railway, ve a **"Settings"**
2. Busca **"Domains"** o **"Generate Domain"**
3. Railway generará una URL como: `https://tu-app.up.railway.app`
4. Copia esta URL (la necesitarás para Twilio)

---

## 📱 Configurar Webhook de Twilio

### Paso 1: Acceder a Twilio Console

1. Ve a [Twilio Console](https://console.twilio.com/)
2. Navega a **Messaging > Settings > WhatsApp Sandbox** (o WhatsApp > Senders)

### Paso 2: Configurar Webhook

1. En **"When a message comes in"**, ingresa:
   ```
   https://tu-app.up.railway.app/api/webhook/whatsapp
   ```
2. Método: **POST**
3. Guarda los cambios

### Paso 3: Verificar Configuración

- Asegúrate de que el número de WhatsApp esté verificado
- En modo sandbox, agrega números de prueba
- En producción, verifica tu número de negocio

---

## ✅ Verificar Despliegue

### 1. Health Check

Abre en tu navegador:
```
https://tu-app.up.railway.app/api/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": 1706380800000,
  "version": "1.0.0"
}
```

### 2. Probar Endpoints

Usa `curl` o Postman para probar:

```bash
# Health check
curl https://tu-app.up.railway.app/api/health

# Probar registro (requiere credenciales)
curl -X POST https://tu-app.up.railway.app/api/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","telefono":"+5215551234567","email":"test@example.com"}'
```

### 3. Probar WhatsApp

1. Envía un mensaje a tu número de Twilio WhatsApp
2. Verifica que el webhook reciba el mensaje
3. Revisa los logs de Railway para ver la respuesta

### 4. Dashboard

Accede al dashboard:
```
https://tu-app.up.railway.app/dashboard
```

Inicia sesión con las credenciales configuradas.

---

## 🐛 Troubleshooting

### Problema: Build Falla

**Síntomas:**
- Error en la fase de build
- Dependencias no se instalan

**Soluciones:**
1. Verifica que `frontend/package.json` tenga los scripts correctos
2. Revisa los logs de Railway para el error específico
3. Asegúrate de que `nixpacks.toml` esté en la raíz
4. Verifica que Node.js 20 esté disponible

### Problema: Servidor No Inicia

**Síntomas:**
- Build exitoso pero servicio no responde
- Error en logs: "Cannot find module"

**Soluciones:**
1. Verifica que `GOOGLE_CREDENTIALS_JSON` esté configurada
2. Revisa que todas las variables de entorno estén configuradas
3. Verifica los logs para errores específicos
4. Asegúrate de que `server.js` esté en `frontend/`

### Problema: Webhook No Funciona

**Síntomas:**
- Mensajes de WhatsApp no se procesan
- Error 404 en webhook

**Soluciones:**
1. Verifica la URL del webhook en Twilio
2. Asegúrate de que la URL sea HTTPS (no HTTP)
3. Verifica que el endpoint `/api/webhook/whatsapp` exista
4. Revisa los logs de Railway para ver requests entrantes

### Problema: Google APIs No Funcionan

**Síntomas:**
- Error al registrar clientes
- Error al agendar eventos

**Soluciones:**
1. Verifica que `GOOGLE_CREDENTIALS_JSON` sea JSON válido
2. Asegúrate de que las APIs estén habilitadas en Google Cloud
3. Verifica que la cuenta de servicio tenga permisos
4. Revisa los IDs de recursos (Docs, Sheets, Calendar)

### Problema: Claude AI No Responde

**Síntomas:**
- Error al procesar mensajes
- Timeout en webhook

**Soluciones:**
1. Verifica que `ANTHROPIC_API_KEY` sea válida
2. Asegúrate de tener créditos en tu cuenta de Anthropic
3. Revisa los logs para errores específicos de la API

### Ver Logs en Railway

1. Ve a tu proyecto en Railway
2. Haz clic en el servicio
3. Ve a la pestaña **"Logs"**
4. Filtra por nivel (Error, Warning, Info)

---

## 📊 Monitoreo y Métricas

### Railway Metrics

Railway proporciona métricas básicas:
- CPU Usage
- Memory Usage
- Network I/O
- Request Count

Accede desde el dashboard de Railway.

### Health Check Automático

Railway usa `/api/health` para verificar que el servicio esté funcionando. Si falla, Railway reiniciará el servicio automáticamente.

### Logs Estructurados

Considera agregar logging estructurado para mejor monitoreo:
- Winston
- Pino
- Sentry (para errores)

---

## 🔄 Actualizaciones y Re-despliegue

### Despliegue Automático

Railway despliega automáticamente cuando haces push a la rama principal.

### Despliegue Manual

1. Ve a Railway dashboard
2. Haz clic en **"Deploy"**
3. Selecciona la rama y commit

### Rollback

Si algo sale mal:
1. Ve a **"Deployments"**
2. Selecciona un deployment anterior
3. Haz clic en **"Redeploy"**

---

## 🔒 Seguridad en Producción

### Checklist de Seguridad

- ✅ Variables de entorno configuradas (no hardcodeadas)
- ✅ Credenciales no en el código
- ✅ HTTPS habilitado (Railway lo proporciona automáticamente)
- ✅ Dashboard con autenticación
- ✅ CORS configurado apropiadamente
- ✅ Headers de seguridad en `next.config.ts`

### Mejores Prácticas

1. **Rotar credenciales regularmente**
2. **Usar Railway Secrets** para datos sensibles
3. **Monitorear logs** para actividad sospechosa
4. **Limitar acceso** al dashboard
5. **Actualizar dependencias** regularmente

---

## 📚 Recursos Adicionales

- [Railway Documentation](https://docs.railway.app/)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Twilio WhatsApp Setup](https://www.twilio.com/docs/whatsapp)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Google Cloud APIs](https://developers.google.com/api-client-library)

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Proyecto creado en Railway
- [ ] Repositorio conectado
- [ ] Todas las variables de entorno configuradas
- [ ] Build exitoso
- [ ] Health check responde correctamente
- [ ] Webhook de Twilio configurado
- [ ] Prueba de mensaje de WhatsApp exitosa
- [ ] Dashboard accesible
- [ ] Logs sin errores críticos

---

**¡Despliegue completado! 🎉**

Si tienes problemas, consulta la sección de Troubleshooting o revisa los logs en Railway.

---

**Última actualización:** 2025-01-27

