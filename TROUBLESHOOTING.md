# Guia de Resolução de Problemas - GamePromo CV

## Problemas SSL/HTTPS

### Sintomas Comuns
- Erro: `UNABLE_TO_VERIFY_LEAF_SIGNATURE`
- Erro: `SELF_SIGNED_CERT_IN_CHAIN`
- Erro: `certificate has expired`
- Erro: `unable to get local issuer certificate`
- Erro: `failing to initialize ssl certificate`

### Soluções (RECOMENDADAS)

#### Método 1: Usar NPM Scripts (Mais Fácil) ⭐
Os comandos padrão já incluem a correção SSL:

```bash
# Desenvolvimento (com SSL fix automático)
npm run dev

# Build (com SSL fix automático)
npm run build

# Se precisar rodar SEM o SSL fix:
npm run dev:secure
npm run build:secure
```

#### Método 2: Scripts Personalizados (Multiplataforma)

**Linux/macOS:**
```bash
./start-dev.sh
```

**Windows (CMD):**
```bash
start-dev.bat
```

**Windows (PowerShell):**
```powershell
.\start-dev.ps1
```

#### 2. Configurar variável de ambiente (Temporário)

**Linux/macOS:**
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev
```

**Windows PowerShell:**
```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev
```

**Windows CMD:**
```cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev
```

#### 3. Configurar .npmrc (Permanente)

Edite o arquivo `.npmrc` na raiz do projeto e descomente:
```
strict-ssl=false
```

#### 4. Atualizar certificados do sistema

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install --reinstall ca-certificates
```

**macOS:**
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /path/to/certificate.crt
```

**Windows:**
- Abra "Gerenciar certificados de computador"
- Importe o certificado na pasta "Autoridades de Certificação Raiz Confiáveis"

#### 5. Limpar cache do NPM
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Problemas com Supabase

### Erro: "Missing Supabase environment variables"

**Solução:**
1. Verifique se o arquivo `.env` existe
2. Confirme que as variáveis estão corretas:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

### Erro de autenticação

**Solução:**
1. Limpe o localStorage:
```javascript
localStorage.clear()
```
2. Recarregue a página
3. Tente fazer login novamente

## Problemas de Build

### Erro: "Out of memory"

**Solução:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Erro de TypeScript

**Solução:**
```bash
npm run typecheck
```
Corrija os erros mostrados e tente novamente.

## Problemas de Performance

### Site carregando lento

1. Verifique a conexão com o Supabase
2. Otimize imagens (use formatos WebP)
3. Ative cache no navegador

### Imagens não carregam

1. Verifique as URLs no banco de dados
2. Confirme que as URLs são públicas
3. Verifique CORS no servidor de imagens

## Sincronização com Airtable

### Edge function não funciona

**Solução:**
1. Verifique as variáveis de ambiente no Supabase Dashboard
2. Confirme que as credenciais do Airtable estão corretas
3. Teste a API do Airtable manualmente:
```bash
curl "https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_NAME" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Dados não sincronizam

**Verificações:**
1. A estrutura do Airtable corresponde às colunas esperadas?
2. Os nomes das colunas estão exatamente como especificado?
3. Há dados na tabela do Airtable?

## Suporte

Se os problemas persistirem:

1. Verifique os logs no console do navegador (F12)
2. Verifique os logs do Supabase Dashboard
3. Consulte a documentação:
   - [Supabase Docs](https://supabase.com/docs)
   - [Vite Docs](https://vitejs.dev)
   - [React Docs](https://react.dev)

## Notas Importantes

⚠️ **IMPORTANTE:** As configurações de SSL desabilitadas (`NODE_TLS_REJECT_UNAUTHORIZED=0` ou `strict-ssl=false`) devem ser usadas APENAS em ambiente de desenvolvimento local. Nunca use essas configurações em produção.

✅ **Produção:** Em produção, o build estático não terá problemas SSL pois será servido via HTTPS pelo seu hosting (Netlify, Vercel, etc).
