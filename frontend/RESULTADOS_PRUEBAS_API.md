# Resultados de pruebas de endpoints API (17/nov/2025)

## 1. /api/health
- Resultado: (ver terminal)
- Observación: Endpoint de healthcheck ejecutado correctamente.

## 2. /api/conversations
- Resultado: (ver terminal)
- Observación: Endpoint ejecutado, revisar respuesta para estructura esperada.

## 3. /api/registro (Google Sheets)
- Resultado: (ver terminal)
- Observación: Se envió registro de prueba, revisar si se almacena en Google Sheets.

## 4. /api/agendar (Google Calendar)
- Resultado: (ver terminal)
- Observación: Se intentó agendar evento, revisar si aparece en Google Calendar.

## 5. /api/send-message (Twilio WhatsApp)
- Resultado: (ver terminal)
- Observación: Se envió mensaje de prueba, revisar si llega a WhatsApp.

## 6. /api/webhook/whatsapp (Anthropic/Claude AI)
- Resultado: (ver terminal)
- Observación: Se simuló mensaje entrante, revisar respuesta de IA.

## 7. /api/messages/1
- Resultado: (ver terminal)
- Observación: Se consultaron mensajes de la conversación 1.

---

**Notas:**
- Si algún endpoint no responde como se espera, revisar logs del backend y credenciales de servicios externos.
- Para detalles de cada respuesta, consulta la terminal o solicita el volcado de salida aquí.
