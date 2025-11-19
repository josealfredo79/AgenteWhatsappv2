# 🚀 Guía Rápida: Configurar Railway Paso a Paso

## 📋 Paso 1: Crear Proyecto en Railway

### 1.1 Iniciar Sesión

1. Ve a [railway.app](https://railway.app/)
2. Haz clic en **"Login"** o **"Start a New Project"**
3. Inicia sesión con GitHub (recomendado)

### 1.2 Crear Nuevo Proyecto

1. Haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Autoriza Railway a acceder a tus repositorios
4. Busca y selecciona: **`AgenteWhatsappv2`**
5. Railway detectará automáticamente que es Next.js

### 1.3 Configurar el Servicio

- Railway creará un servicio automáticamente
- **Name:** Puedes renombrarlo a "agente-whatsapp" (opcional)
- **Source:** Debe apuntar a `josealfredo79/AgenteWhatsappv2`
- **Branch:** `master` (o la rama que uses)

---

## 🔐 Paso 2: Configurar Variables de Entorno

### 2.1 Acceder a Variables

1. En tu proyecto de Railway, haz clic en el servicio
2. Ve a la pestaña **"Variables"** (en el menú lateral)
3. Haz clic en **"New Variable"** para cada variable

### 2.2 Agregar Variables Críticas

Usa el checklist en `CHECKLIST_VARIABLES_RAILWAY.md` como referencia.

#### Twilio (3 variables)

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_auth_token_real_aqui
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Cómo obtener:**
- Ve a [Twilio Console](https://console.twilio.com/)
- Dashboard muestra Account SID y Auth Token
- WhatsApp Number: Messaging > WhatsApp > Configuración

#### Anthropic (1 variable)

```env
ANTHROPIC_API_KEY=sk-ant-api03-tu_api_key_real_aqui
```

**Cómo obtener:**
- Ve a [Anthropic Console](https://console.anthropic.com/)
- Settings > API Keys > Create Key

#### Google Cloud (4 variables)

**Variable 1: Credenciales JSON**
```env
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

⚠️ **IMPORTANTE:** 
- Abre tu archivo `google-credentials.json` local
- Copia TODO el contenido
- Pégalo en Railway como valor de `GOOGLE_CREDENTIALS_JSON`
- Debe estar en UNA SOLA LÍNEA (sin saltos de línea)

**Variables 2-4: IDs de Recursos**

```env
GOOGLE_DOCS_ID=tu_documento_id_aqui
GOOGLE_SHEET_ID=tu_spreadsheet_id_aqui
GOOGLE_CALENDAR_ID=primary
```

**Cómo obtener:**
- **Google Docs ID:** URL del documento: `https://docs.google.com/document/d/[ID]/edit`
- **Google Sheets ID:** URL de la hoja: `https://docs.google.com/spreadsheets/d/[ID]/edit`
- **Google Calendar ID:** Configuración > ID de calendario (o usa `primary`)

#### Configuración del Servidor (3 variables)

```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://tu-app.up.railway.app
```

**Nota:** Railway asigna el PORT automáticamente, pero puedes dejarlo.

#### Dashboard (Opcional - 3 variables)

```env
NEXT_PUBLIC_DASHBOARD_USER=admin
NEXT_PUBLIC_DASHBOARD_PASS=tu_password_seguro_aqui
NEXT_PUBLIC_BACKEND_URL=https://tu-app.up.railway.app
```

⚠️ **Cambia el usuario y contraseña por defecto**

### 2.3 Verificar Variables

Asegúrate de tener estas 11 variables mínimas:

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

## 🚀 Paso 3: Desplegar

### 3.1 Trigger del Despliegue

Railway desplegará automáticamente cuando:

1. **Auto-deploy habilitado:** Cada push a `master` despliega automáticamente
2. **Manual:** Haz clic en **"Deploy"** en el dashboard

### 3.2 Monitorear el Build

1. Ve a la pestaña **"Deployments"**
2. Observa el proceso:
   - ✅ Setup: Instalando Node.js 20
   - ✅ Install: `npm ci` en frontend
   - ✅ Build: `npm run build`
   - ✅ Start: `npm run start`

### 3.3 Verificar Logs

1. Haz clic en el deployment activo
2. Revisa los logs, busca:
   - ✅ `google-credentials.json creado correctamente`
   - ✅ `Servidor Next.js + Socket.io listo`

### 3.4 Obtener URL de Producción

1. Ve a **"Settings"** del servicio
2. Busca **"Generate Domain"** o **"Domains"**
3. Railway generará: `https://tu-app.up.railway.app`
4. **Copia esta URL** (la necesitarás para Twilio)

---

## 📱 Paso 4: Configurar Webhook de Twilio

### 4.1 Acceder a Twilio Console

1. Ve a [Twilio Console](https://console.twilio.com/)
2. Navega a **Messaging > Settings > WhatsApp Sandbox** (o WhatsApp > Senders)

### 4.2 Configurar Webhook

1. En **"When a message comes in"**, ingresa:
   ```
   https://tu-app.up.railway.app/api/webhook/whatsapp
   ```
   (Reemplaza `tu-app.up.railway.app` con tu URL real de Railway)

2. **Método:** POST
3. **Guarda** los cambios

### 4.3 Verificar Configuración

- Asegúrate de que el número de WhatsApp esté verificado
- En modo sandbox, agrega números de prueba
- En producción, verifica tu número de negocio

---

## ✅ Paso 5: Verificar que Todo Funciona

### 5.1 Health Check

Abre en tu navegador:
```
https://tu-app.up.railway.app/api/health
```

**Debe retornar:**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": 1706380800000,
  "version": "1.0.0"
}
```

### 5.2 Probar Endpoint

```bash
# Probar registro (requiere credenciales válidas)
curl -X POST https://tu-app.up.railway.app/api/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","telefono":"+5215551234567","email":"test@example.com"}'
```

### 5.3 Probar WhatsApp

1. Envía un mensaje a tu número de Twilio WhatsApp
2. Verifica que el webhook reciba el mensaje
3. Revisa los logs de Railway para ver la respuesta

### 5.4 Dashboard

Accede al dashboard:
```
https://tu-app.up.railway.app/dashboard
```

Inicia sesión con las credenciales configuradas.

---

## 🐛 Troubleshooting Rápido

### Build Falla

- Verifica que todas las variables estén configuradas
- Revisa los logs para el error específico
- Asegúrate de que `nixpacks.toml` esté en la raíz

### Servidor No Inicia

- Verifica que `GOOGLE_CREDENTIALS_JSON` sea JSON válido
- Revisa los logs para errores específicos
- Asegúrate de que todas las variables críticas estén configuradas

### Webhook No Funciona

- Verifica la URL del webhook en Twilio (debe ser HTTPS)
- Verifica que el endpoint `/api/webhook/whatsapp` exista
- Revisa los logs de Railway para ver requests entrantes

### Google APIs No Funcionan

- Verifica que `GOOGLE_CREDENTIALS_JSON` sea JSON válido (una sola línea)
- Asegúrate de que las APIs estén habilitadas en Google Cloud
- Verifica que la cuenta de servicio tenga permisos

---

## 📊 Monitoreo

### Ver Logs en Tiempo Real

1. Ve a tu proyecto en Railway
2. Haz clic en el servicio
3. Pestaña **"Logs"**
4. Filtra por nivel (Error, Warning, Info)

### Métricas

Railway proporciona métricas básicas:
- CPU Usage
- Memory Usage
- Network I/O
- Request Count

Accede desde el dashboard de Railway.

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Proyecto creado en Railway
- [ ] Repositorio conectado
- [ ] Todas las variables de entorno configuradas (11 mínimas)
- [ ] Build exitoso
- [ ] Health check responde correctamente
- [ ] URL de producción obtenida
- [ ] Webhook de Twilio configurado
- [ ] Prueba de mensaje de WhatsApp exitosa
- [ ] Dashboard accesible
- [ ] Logs sin errores críticos

---

## 🔗 Enlaces Útiles

- [Railway Dashboard](https://railway.app/dashboard)
- [Railway Documentation](https://docs.railway.app/)
- [Twilio Console](https://console.twilio.com/)
- [Anthropic Console](https://console.anthropic.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**¡Listo para desplegar! 🚀**

Si tienes problemas, consulta `GUIA_DESPLIEGUE_RAILWAY.md` para más detalles.

