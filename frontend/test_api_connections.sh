#!/bin/bash
# Pruebas automáticas de endpoints principales Next.js API

API_URL="http://localhost:3000/api"

# Healthcheck
echo "\n== Healthcheck =="
curl -s $API_URL/health | jq

# Conversations
echo "\n== Conversations =="
curl -s $API_URL/conversations | jq

# Registro (Google Sheets)
echo "\n== Registro (Google Sheets) =="
curl -s -X POST $API_URL/registro -H 'Content-Type: application/json' -d '{"nombre":"Prueba","telefono":"5551234567","email":"prueba@correo.com"}' | jq

# Agendar (Google Calendar)
echo "\n== Agendar (Google Calendar) =="
curl -s -X POST $API_URL/agendar -H 'Content-Type: application/json' -d '{"resumen":"Cita de prueba","descripcion":"Test API","inicio":"2025-11-16T10:00:00-06:00","fin":"2025-11-16T11:00:00-06:00","email":"prueba@correo.com"}' | jq

# Enviar mensaje (Twilio)
echo "\n== Enviar mensaje (Twilio) =="
curl -s -X POST $API_URL/send-message -H 'Content-Type: application/json' -d '{"to":"5215551234567","body":"Mensaje de prueba desde API"}' | jq

# Webhook WhatsApp (Anthropic)
echo "\n== Webhook WhatsApp (Anthropic) =="
curl -s -X POST $API_URL/webhook/whatsapp -H 'Content-Type: application/json' -d '{"Body":"Hola, ¿puedes ayudarme?","From":"whatsapp:+5215551234567"}' | jq

# Mensajes por conversación
echo "\n== Mensajes por conversación =="
curl -s $API_URL/messages/1 | jq
