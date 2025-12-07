# Correção Rápida para Problemas SSL

## ⚠️ Erro: "failing to initialize ssl certificate"

### Solução Rápida (1 minuto)

Simplesmente execute:

```bash
npm run dev
```

**Isso já funciona!** Os comandos foram configurados para resolver problemas SSL automaticamente.

---

## Por que isso acontece?

Problemas SSL geralmente ocorrem quando:
- Você está atrás de um firewall corporativo
- Seu antivírus intercepta conexões HTTPS
- Certificados do sistema estão desatualizados
- Proxy intermediário modifica certificados

---

## Soluções Alternativas

### Opção 1: Scripts Multiplataforma

**Linux/macOS:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows CMD:**
```cmd
start-dev.bat
```

**Windows PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\start-dev.ps1
```

### Opção 2: Variável de Ambiente Manual

**Bash (Linux/macOS):**
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev:secure
```

**PowerShell (Windows):**
```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
npm run dev:secure
```

**CMD (Windows):**
```cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev:secure
```

### Opção 3: Arquivo .env Local

Crie/edite `.env.local`:
```env
NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

## ✅ Verificação

Após executar, você deve ver:
```
VITE v5.x.x ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🔒 Segurança

**IMPORTANTE:**
- ⚠️ Essas configurações são **SOMENTE para desenvolvimento local**
- ✅ O build de produção **NÃO é afetado** por esses problemas
- ✅ Em produção, seu site terá SSL/HTTPS normal
- ⚠️ **NUNCA** desabilite SSL em produção

---

## 🆘 Ainda não funciona?

1. Limpe o cache do NPM:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. Verifique se o `.env` está configurado:
```bash
cat .env
```

Deve mostrar:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave...
```

3. Consulte o [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) completo

---

## 📚 Mais Informações

- **Arquivo**: `src/lib/ssl-config.ts` - Configuração SSL
- **Arquivo**: `vite.config.ts` - Configuração do Vite
- **Arquivo**: `.npmrc` - Configuração do NPM
- **Docs**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
