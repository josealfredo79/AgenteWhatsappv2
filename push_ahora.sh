#!/bin/bash
# Script para hacer push con el token

TOKEN="ghp_0n0td3jTFkH06FD1Jh4feqVCgo4Cp63Kq0Mf"
USER="josealfredo79"
REPO="josealfredo79/AgenteWhatsappv2"

echo "🚀 Haciendo push a GitHub..."
git push https://${USER}:${TOKEN}@github.com/${REPO}.git master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push completado exitosamente!"
    echo "   Verifica en: https://github.com/${REPO}"
else
    echo ""
    echo "❌ Error en el push"
    echo "   Verifica que el token tenga permisos 'repo'"
    echo "   Ve a: https://github.com/settings/tokens"
fi

unset TOKEN
