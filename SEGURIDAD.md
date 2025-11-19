# 🔒 Guía de Seguridad - Protección de Credenciales

**⚠️ CRÍTICO: NUNCA subas credenciales, API keys, tokens o archivos de configuración sensibles a GitHub/GitLab.**

Google, GitHub y otras plataformas escanean automáticamente los repositorios públicos y privados buscando credenciales expuestas. Si detectan credenciales, las invalidan automáticamente por seguridad.

---

## 🚨 ¿Por Qué Es Importante?

1. **Detección Automática:** GitHub, Google Cloud, Twilio y Anthropic escanean repositorios buscando:
   - API Keys
   - Tokens de autenticación
   - Credenciales de servicio
   - Private keys

2. **Invalidación Automática:** Si detectan credenciales expuestas:
   - Las invalidan inmediatamente
   - Te notifican (si está configurado)
   - Pueden suspender tu cuenta

3. **Riesgos de Seguridad:**
   - Acceso no autorizado a tus servicios
   - Uso malicioso de tus APIs
   - Costos inesperados
   - Violación de datos

---

## ✅ Archivos que NUNCA Debes Subir

### ❌ Archivos Prohibidos

- ❌ `.env` (cualquier variante: `.env.local`, `.env.production`, etc.)
- ❌ `google-credentials.json`
- ❌ Cualquier archivo con credenciales
- ❌ Archivos `.key`, `.pem`, `.p12`
- ❌ Código con API keys hardcodeadas
- ❌ Logs que contengan credenciales

### ✅ Archivos Seguros para Subir

- ✅ `.env.example` (solo con placeholders)
- ✅ `README.md` (solo con ejemplos)
- ✅ Código que use `process.env.VARIABLE_NAME`
- ✅ Documentación sin credenciales reales

---

## 🛡️ Protección Implementada

### 1. `.gitignore` Configurado

El repositorio tiene `.gitignore` configurado para ignorar:

```
# Environment variables
.env
.env.*
*.env.local

# Google Credentials
google-credentials.json
**/google-credentials.json

# API Keys
*.key
*.pem
secrets/
```

### 2. Código Seguro

✅ **Todas las credenciales se obtienen de variables de entorno:**

```javascript
// ✅ CORRECTO - Usa variables de entorno
const apiKey = process.env.ANTHROPIC_API_KEY;
const accountSid = process.env.TWILIO_ACCOUNT_SID;

// ❌ INCORRECTO - Nunca hagas esto
const apiKey = "sk-ant-api03-abc123...";
```

### 3. Documentación con Placeholders

✅ **Todos los ejemplos usan placeholders:**

```env
# ✅ CORRECTO - Placeholder
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx

# ❌ INCORRECTO - Credencial real
ANTHROPIC_API_KEY=sk-ant-api03-abc123def456...
```

---

## 📋 Checklist Antes de Hacer Commit

Antes de hacer `git add` y `git commit`, verifica:

- [ ] ❌ No hay archivos `.env` en el staging area
- [ ] ❌ No hay `google-credentials.json` en el staging area
- [ ] ❌ No hay credenciales hardcodeadas en el código
- [ ] ❌ No hay tokens o API keys en comentarios
- [ ] ✅ Solo usas `process.env.VARIABLE_NAME` en el código
- [ ] ✅ Los ejemplos en documentación usan placeholders
- [ ] ✅ `.gitignore` está actualizado

### Verificar Antes de Commit

```bash
# Ver qué archivos se van a subir
git status

# Verificar que no haya archivos sensibles
git diff --cached | grep -i "api_key\|token\|credentials\|password"

# Si encuentras algo, NO HAGAS COMMIT
```

---

## 🔍 Cómo Verificar si Ya Subiste Credenciales

### 1. Buscar en el Historial de Git

```bash
# Buscar posibles credenciales en el historial
git log --all --full-history --source -- "*credentials*"
git log --all --full-history --source -- "*.env"
```

### 2. Buscar en el Código Actual

```bash
# Buscar posibles API keys hardcodeadas
grep -r "sk-ant-api" --exclude-dir=node_modules .
grep -r "AC[a-zA-Z0-9]\{32\}" --exclude-dir=node_modules .
grep -r "TWILIO_AUTH_TOKEN" --exclude-dir=node_modules .
```

### 3. Usar Herramientas de Detección

- **GitHub Secret Scanning:** Automático en repositorios
- **git-secrets:** Herramienta para prevenir commits con secretos
- **truffleHog:** Escanea repositorios buscando secretos

---

## 🚨 Si Ya Subiste Credenciales por Error

### Pasos Inmediatos

1. **Rotar Credenciales INMEDIATAMENTE:**
   - ✅ Genera nuevas API keys en Anthropic
   - ✅ Genera nuevas credenciales en Twilio
   - ✅ Crea nueva cuenta de servicio en Google Cloud
   - ✅ Revoca las credenciales antiguas

2. **Eliminar del Historial de Git:**
   ```bash
   # Eliminar archivo del historial (CUIDADO: esto reescribe el historial)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch google-credentials.json" \
     --prune-empty --tag-name-filter cat -- --all
   
   # O usar BFG Repo-Cleaner (más seguro)
   # https://rtyley.github.io/bfg-repo-cleaner/
   ```

3. **Forzar Push (Solo si es necesario):**
   ```bash
   # ⚠️ ADVERTENCIA: Esto reescribe el historial
   # Solo hazlo si es absolutamente necesario
   git push origin --force --all
   ```

4. **Notificar al Equipo:**
   - Si trabajas en equipo, notifica inmediatamente
   - Todos deben actualizar sus variables de entorno

---

## ✅ Mejores Prácticas

### 1. Usar Variables de Entorno

```javascript
// ✅ SIEMPRE usa variables de entorno
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEY no está configurada');
}
```

### 2. Validar en Inicio

```javascript
// Validar que todas las variables críticas estén configuradas
const requiredEnvVars = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'ANTHROPIC_API_KEY',
  'GOOGLE_CREDENTIALS_JSON'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ ${varName} no está configurada`);
    process.exit(1);
  }
});
```

### 3. Usar `.env.example`

Mantén un archivo `.env.example` con placeholders:

```env
# .env.example
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. No Committear Archivos de Configuración Local

```bash
# Verificar antes de commit
git status

# Si ves archivos .env, elimínalos del staging
git reset HEAD .env
git reset HEAD .env.local
```

---

## 🔐 Configuración en Railway

En Railway, **NUNCA** pongas credenciales en el código. Usa las Variables de Entorno del dashboard:

1. Ve a tu proyecto en Railway
2. Settings > Variables
3. Agrega cada variable de entorno
4. Railway las inyecta automáticamente en `process.env`

---

## 📚 Recursos Adicionales

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [12 Factor App - Config](https://12factor.net/config)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)

---

## ✅ Checklist de Seguridad

Antes de cada commit:

- [ ] Verificado `git status` - no hay archivos `.env`
- [ ] Verificado `git status` - no hay `google-credentials.json`
- [ ] No hay credenciales hardcodeadas en el código
- [ ] Solo uso `process.env.VARIABLE_NAME`
- [ ] Ejemplos en documentación usan placeholders
- [ ] `.gitignore` está actualizado
- [ ] He rotado credenciales si las expuse por error

---

## 🆘 Contacto de Emergencia

Si descubres que subiste credenciales:

1. **Rotar credenciales INMEDIATAMENTE**
2. **Eliminar del historial de Git** (si es posible)
3. **Revisar logs** de servicios para actividad sospechosa
4. **Notificar al equipo** si trabajas en grupo

---

**Recuerda: Es mejor prevenir que curar. Siempre verifica antes de hacer commit.**

---

**Última actualización:** 2025-01-27

