# ✅ Checklist de Variables de Entorno para Railway

**Usa este checklist para asegurarte de que todas las variables estén configuradas antes del despliegue.**

---

## 🔴 Variables Críticas (Requeridas)

### Twilio - WhatsApp

- [ ] `TWILIO_ACCOUNT_SID`
  - **Dónde obtener:** [Twilio Console](https://console.twilio.com/) > Dashboard
  - **Formato:** `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
  - **Ejemplo:** `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (reemplaza las x con tu Account SID real)

- [ ] `TWILIO_AUTH_TOKEN`
  - **Dónde obtener:** [Twilio Console](https://console.twilio.com/) > Dashboard
  - **Formato:** String alfanumérico
  - **⚠️ Secreto:** No compartir

- [ ] `TWILIO_WHATSAPP_NUMBER`
  - **Dónde obtener:** Twilio Console > Messaging > WhatsApp
  - **Formato:** `whatsapp:+14155238886`
  - **Nota:** En sandbox, usa el número de prueba

### Anthropic - Claude AI

- [ ] `ANTHROPIC_API_KEY`
  - **Dónde obtener:** [Anthropic Console](https://console.anthropic.com/) > Settings > API Keys
  - **Formato:** `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx`
  - **⚠️ Secreto:** No compartir
  - **Nota:** Asegúrate de tener créditos disponibles

### Google Cloud APIs

- [ ] `GOOGLE_CREDENTIALS_JSON`
  - **Dónde obtener:** Google Cloud Console > IAM & Admin > Service Accounts > Crear/Descargar JSON
  - **Formato:** JSON completo en una sola línea
  - **⚠️ Secreto:** No compartir
  - **Nota:** Pega el contenido completo del archivo JSON

- [ ] `GOOGLE_DOCS_ID`
  - **Dónde obtener:** URL del documento de Google Docs
  - **Formato:** ID del documento (sin la URL completa)
  - **Ejemplo:** `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
  - **Cómo obtener:** Abre el documento > URL contiene el ID

- [ ] `GOOGLE_SHEET_ID`
  - **Dónde obtener:** URL de la hoja de cálculo de Google Sheets
  - **Formato:** ID de la hoja (sin la URL completa)
  - **Ejemplo:** `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
  - **Cómo obtener:** Abre la hoja > URL contiene el ID
  - **Nota:** Asegúrate de que la hoja tenga la estructura: `Clientes!A:C`

- [ ] `GOOGLE_CALENDAR_ID`
  - **Dónde obtener:** Google Calendar > Configuración > ID de calendario
  - **Formato:** Email del calendario o `primary`
  - **Ejemplo:** `primary` o `calendario@example.com`
  - **Cómo obtener:** Configuración > Configuración de calendarios > ID de calendario

---

## 🟡 Variables Opcionales (Recomendadas)

### Dashboard

- [ ] `NEXT_PUBLIC_DASHBOARD_USER`
  - **Valor por defecto:** `admin`
  - **Recomendación:** Cambiar por un usuario único
  - **Formato:** String (sin espacios)

- [ ] `NEXT_PUBLIC_DASHBOARD_PASS`
  - **Valor por defecto:** `admin123`
  - **Recomendación:** Usar contraseña segura
  - **Formato:** String (mínimo 8 caracteres)
  - **⚠️ Seguridad:** Cambiar en producción

- [ ] `NEXT_PUBLIC_BACKEND_URL`
  - **Valor por defecto:** `http://localhost:3000`
  - **En Railway:** `https://tu-app.up.railway.app`
  - **Formato:** URL completa con protocolo

### Configuración del Servidor

- [ ] `NODE_ENV`
  - **Valor:** `production`
  - **Nota:** Railway puede configurarlo automáticamente

- [ ] `PORT`
  - **Valor:** `3000` (o el que Railway asigne)
  - **Nota:** Railway asigna el puerto automáticamente, pero puedes dejarlo

- [ ] `ALLOWED_ORIGINS`
  - **Valor:** URLs permitidas separadas por comas
  - **Ejemplo:** `https://tu-dominio.com,https://otro-dominio.com`
  - **Nota:** Para CORS, limita a tus dominios

---

## 📋 Verificación Rápida

### Antes de Desplegar

```bash
# Verifica que tengas estas variables en Railway:
✅ TWILIO_ACCOUNT_SID
✅ TWILIO_AUTH_TOKEN
✅ TWILIO_WHATSAPP_NUMBER
✅ ANTHROPIC_API_KEY
✅ GOOGLE_CREDENTIALS_JSON
✅ GOOGLE_DOCS_ID
✅ GOOGLE_SHEET_ID
✅ GOOGLE_CALENDAR_ID
✅ NODE_ENV=production
```

### Después de Desplegar

Verifica que el servicio funcione:

1. **Health Check:**
   ```bash
   curl https://tu-app.up.railway.app/api/health
   ```
   Debe retornar: `{"status":"ok",...}`

2. **Verificar Logs:**
   - Busca: `✅ google-credentials.json creado correctamente`
   - Busca: `Servidor Next.js + Socket.io listo`

3. **Probar Endpoint:**
   ```bash
   curl -X POST https://tu-app.up.railway.app/api/registro \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Test","telefono":"+5215551234567","email":"test@example.com"}'
   ```

---

## 🔍 Cómo Verificar Variables en Railway

1. Ve a tu proyecto en Railway
2. Haz clic en el servicio
3. Ve a la pestaña **"Variables"**
4. Verifica que todas las variables críticas estén presentes
5. Verifica que los valores sean correctos (sin espacios extra, JSON válido, etc.)

---

## ⚠️ Errores Comunes

### Error: "GOOGLE_CREDENTIALS_JSON no está definida"

**Solución:** Agrega la variable `GOOGLE_CREDENTIALS_JSON` con el JSON completo

### Error: "Invalid JSON"

**Solución:** Asegúrate de que el JSON esté en una sola línea y sea válido

### Error: "TWILIO_ACCOUNT_SID is not defined"

**Solución:** Verifica que todas las variables de Twilio estén configuradas

### Error: "ANTHROPIC_API_KEY is invalid"

**Solución:** Verifica que la API key sea correcta y tenga créditos disponibles

---

## 📝 Notas Importantes

1. **Nunca subas credenciales al código** - Usa variables de entorno
2. **Rota credenciales regularmente** - Especialmente en producción
3. **Usa Railway Secrets** - Para datos muy sensibles
4. **Verifica permisos** - Asegúrate de que las cuentas de servicio tengan los permisos correctos
5. **Prueba en desarrollo primero** - Usa el entorno de desarrollo antes de producción

---

## 🔗 Enlaces Útiles

- [Railway Variables Documentation](https://docs.railway.app/develop/variables)
- [Twilio Console](https://console.twilio.com/)
- [Anthropic Console](https://console.anthropic.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Última actualización:** 2025-01-27

