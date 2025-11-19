# 📤 Instrucciones para Hacer Push a GitHub

## Opción 1: Usando Personal Access Token (Recomendado)

### Paso 1: Crear Personal Access Token

1. Ve a GitHub: https://github.com/settings/tokens
2. Haz clic en **"Generate new token"** > **"Generate new token (classic)"**
3. Configura:
   - **Note:** "Agente WhatsApp - Railway"
   - **Expiration:** Elige una fecha (ej: 90 días)
   - **Scopes:** Marca `repo` (acceso completo a repositorios)
4. Haz clic en **"Generate token"**
5. **⚠️ COPIA EL TOKEN INMEDIATAMENTE** (solo se muestra una vez)

### Paso 2: Hacer Push

```bash
# Opción A: Usar token en la URL (temporal)
git push https://TU_TOKEN@github.com/josealfredo79/AgenteWhatsappv2.git master

# Opción B: Configurar credenciales (más seguro)
git config --global credential.helper store
git push origin master
# Cuando pida usuario: tu_usuario_github
# Cuando pida contraseña: pega el TOKEN (no tu contraseña)
```

---

## Opción 2: Usando SSH (Más Seguro a Largo Plazo)

### Paso 1: Generar Clave SSH

```bash
# Generar nueva clave SSH
ssh-keygen -t ed25519 -C "tu_email@example.com"

# Presiona Enter para aceptar ubicación por defecto
# Opcional: agrega una contraseña para mayor seguridad

# Copiar la clave pública
cat ~/.ssh/id_ed25519.pub
```

### Paso 2: Agregar Clave a GitHub

1. Copia el contenido de `~/.ssh/id_ed25519.pub`
2. Ve a GitHub: https://github.com/settings/keys
3. Haz clic en **"New SSH key"**
4. Pega la clave y guarda

### Paso 3: Cambiar Remote a SSH

```bash
# Cambiar remote a SSH
git remote set-url origin git@github.com:josealfredo79/AgenteWhatsappv2.git

# Verificar
git remote -v

# Hacer push
git push origin master
```

---

## Opción 3: Usando GitHub CLI (Más Fácil)

### Instalar GitHub CLI

```bash
# En Linux/WSL
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### Autenticarse y Push

```bash
# Autenticarse
gh auth login

# Hacer push
git push origin master
```

---

## Verificar que Funcionó

```bash
# Ver el último commit en GitHub
git log --oneline -1

# Verificar que está en GitHub
# Ve a: https://github.com/josealfredo79/AgenteWhatsappv2
```

---

## Solución de Problemas

### Error: "Authentication failed"

- Verifica que el token tenga permisos `repo`
- Si usas token, asegúrate de usar el token como contraseña (no tu contraseña de GitHub)

### Error: "Permission denied (publickey)"

- Verifica que la clave SSH esté agregada a GitHub
- Prueba: `ssh -T git@github.com`

### Error: "Repository not found"

- Verifica que el repositorio exista
- Verifica que tengas permisos de escritura

---

**Recomendación:** Usa la Opción 1 (Personal Access Token) para hacer push ahora, y luego configura SSH para el futuro.

