#!/bin/bash
# Script para hacer push a GitHub

echo "🚀 Preparando push a GitHub..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] && [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: No estás en el directorio del proyecto"
    exit 1
fi

# Verificar estado de git
echo "📋 Estado actual de git:"
git status --short
echo ""

# Verificar que no haya archivos sensibles
echo "🔍 Verificando archivos sensibles..."
if git status --short | grep -E "\.env$|credentials|\.key|\.pem" | grep -v ".example"; then
    echo "❌ ADVERTENCIA: Se encontraron archivos sensibles"
    echo "   No hagas push hasta verificar"
    exit 1
fi
echo "✅ No se encontraron archivos sensibles"
echo ""

# Verificar remote
echo "🔗 Remote configurado:"
git remote -v
echo ""

# Mostrar opciones
echo "📤 Opciones para hacer push:"
echo ""
echo "1. Usar Personal Access Token (Recomendado para ahora)"
echo "2. Usar SSH (Requiere configuración previa)"
echo "3. Usar GitHub CLI (Requiere instalación)"
echo ""
read -p "Elige una opción (1-3): " opcion

case $opcion in
    1)
        echo ""
        echo "📝 Para usar Personal Access Token:"
        echo "   1. Ve a: https://github.com/settings/tokens"
        echo "   2. Genera un nuevo token (classic) con permisos 'repo'"
        echo "   3. Ejecuta:"
        echo "      git push https://TU_TOKEN@github.com/josealfredo79/AgenteWhatsappv2.git master"
        echo ""
        read -p "¿Tienes el token listo? (s/n): " tiene_token
        if [ "$tiene_token" = "s" ] || [ "$tiene_token" = "S" ]; then
            read -p "Pega el token aquí: " token
            git push https://${token}@github.com/josealfredo79/AgenteWhatsappv2.git master
        else
            echo "Genera el token primero y luego ejecuta el comando manualmente"
        fi
        ;;
    2)
        echo ""
        echo "🔐 Para usar SSH, primero configura la clave SSH"
        echo "   Ver: INSTRUCCIONES_PUSH_GITHUB.md"
        git push origin master
        ;;
    3)
        echo ""
        echo "📦 Para usar GitHub CLI, primero instálalo"
        echo "   Ver: INSTRUCCIONES_PUSH_GITHUB.md"
        gh auth login
        git push origin master
        ;;
    *)
        echo "Opción inválida"
        exit 1
        ;;
esac

echo ""
echo "✅ Push completado (si no hubo errores)"
echo "   Verifica en: https://github.com/josealfredo79/AgenteWhatsappv2"
