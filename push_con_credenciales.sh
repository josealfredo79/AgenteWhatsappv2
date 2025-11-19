#!/bin/bash
# Script para hacer push con credenciales

echo "🚀 Push a GitHub - Agente WhatsApp"
echo ""

# Pedir usuario
read -p "Usuario de GitHub: " GIT_USER

# Pedir contraseña/token (oculto)
read -sp "Contraseña o Personal Access Token: " GIT_PASS
echo ""

# Hacer push
echo ""
echo "📤 Haciendo push..."
git push https://${GIT_USER}:${GIT_PASS}@github.com/josealfredo79/AgenteWhatsappv2.git master

# Limpiar variables
unset GIT_USER
unset GIT_PASS

echo ""
echo "✅ Proceso completado"

