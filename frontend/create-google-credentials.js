const fs = require('fs');
const path = require('path');

/**
 * Script para crear google-credentials.json desde variable de entorno
 * Se ejecuta antes de iniciar el servidor (prestart)
 * Necesario para Railway y otros entornos donde no se puede subir archivos
 */

const credentialsPath = path.join(__dirname, 'google-credentials.json');
const credentialsJson = process.env.GOOGLE_CREDENTIALS_JSON;

if (credentialsJson) {
  try {
    // Validar que sea JSON válido
    JSON.parse(credentialsJson);
    
    // Escribir el archivo
    fs.writeFileSync(credentialsPath, credentialsJson, 'utf8');
    console.log('✅ google-credentials.json creado correctamente desde variable de entorno');
  } catch (error) {
    console.error('❌ Error al crear google-credentials.json:', error.message);
    console.error('Verifica que GOOGLE_CREDENTIALS_JSON sea un JSON válido');
    process.exit(1);
  }
} else {
  // En desarrollo local, puede existir el archivo directamente
  if (fs.existsSync(credentialsPath)) {
    console.log('ℹ️  Usando google-credentials.json existente (desarrollo local)');
  } else {
    console.warn('⚠️  GOOGLE_CREDENTIALS_JSON no está definida y no existe google-credentials.json');
    console.warn('   Las funciones de Google APIs no funcionarán sin credenciales');
  }
}
