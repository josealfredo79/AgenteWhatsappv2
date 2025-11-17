const fs = require('fs');

if (process.env.GOOGLE_CREDENTIALS_JSON) {
  fs.writeFileSync(
    './google-credentials.json',
    process.env.GOOGLE_CREDENTIALS_JSON
  );
  console.log('google-credentials.json creado correctamente');
} else {
  console.warn('GOOGLE_CREDENTIALS_JSON no está definida');
}
