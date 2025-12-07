# 🚀 Guia de Deploy - GamePromo CV

## Como Colocar Online em 5 Minutos

Escolha uma das plataformas abaixo (todas são GRATUITAS):

---

## 🟢 Opção 1: Netlify (Recomendado)

### Deploy Automático via Git

1. **Push para GitHub/GitLab**:
```bash
git init
git add .
git commit -m "GamePromo CV"
git remote add origin SEU_REPOSITORIO
git push -u origin main
```

2. **Conectar no Netlify**:
   - Acesse: https://netlify.com
   - Clique em "Add new site" → "Import from Git"
   - Selecione seu repositório
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Adicione variáveis de ambiente:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Clique em "Deploy"

### Deploy Manual (Drag & Drop)

1. **Build o projeto**:
```bash
npm run build
```

2. **Acesse Netlify**:
   - Vá para: https://app.netlify.com/drop
   - Arraste a pasta `dist` para o site
   - Pronto! Site online em segundos

3. **Configurar variáveis**:
   - Site settings → Environment variables
   - Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
   - Rebuild o site

---

## 🔵 Opção 2: Vercel

### Deploy via CLI

1. **Instalar Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
npm run build
vercel --prod
```

3. **Adicionar variáveis**:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Deploy via Git

1. **Push para GitHub**
2. **Importar no Vercel**:
   - Acesse: https://vercel.com
   - "Add New" → "Project"
   - Selecione repositório
   - Configure variáveis de ambiente
   - Deploy!

---

## 🟣 Opção 3: GitHub Pages

1. **Instalar gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Adicionar scripts ao package.json**:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Configurar vite.config.ts**:
```typescript
export default defineConfig({
  base: '/seu-repositorio/',
  // ... resto da config
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Ativar GitHub Pages**:
   - Settings → Pages
   - Source: gh-pages branch
   - Save

---

## 🟠 Opção 4: Render

1. **Criar conta**: https://render.com
2. **New Static Site**
3. **Configurar**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. **Adicionar variáveis de ambiente**
5. **Deploy**

---

## 🟡 Opção 5: Cloudflare Pages

1. **Push para Git**
2. **Cloudflare Dashboard**:
   - Pages → Create a project
   - Connect Git
   - Configurar:
     - Build command: `npm run build`
     - Build output: `dist`
3. **Variáveis de ambiente**
4. **Deploy**

---

## ⚙️ Configuração de Variáveis de Ambiente

**IMPORTANTE**: Todas as plataformas precisam das variáveis:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

### Como adicionar:

**Netlify**: Site settings → Environment variables
**Vercel**: Project settings → Environment Variables
**Render**: Environment → Environment Variables
**Cloudflare**: Settings → Environment variables

---

## 🔧 Problemas Comuns

### Site mostra tela branca

**Solução**:
1. Verifique as variáveis de ambiente
2. Limpe o cache do build
3. Reconstrua o projeto:
```bash
rm -rf dist node_modules
npm install
npm run build
```

### Rotas não funcionam (404)

**Solução**:
- Verifique se o arquivo `_redirects` está em `public/`
- Para Vercel: Verifique se `vercel.json` existe
- Rebuilde o projeto

### Erro de CORS

**Solução**:
1. Verifique URL do Supabase no `.env`
2. Certifique-se que a URL não tem barra no final
3. Limpe o cache do navegador

### Variáveis de ambiente não funcionam

**Certificar**:
- Todas começam com `VITE_`
- Estão configuradas na plataforma de hosting
- Rebuild foi feito após adicionar

---

## 📊 Monitoramento

Após o deploy, monitore:

1. **Analytics** (opcional):
   - Google Analytics
   - Plausible
   - Simple Analytics

2. **Erros**:
   - Sentry
   - LogRocket
   - Console do navegador

3. **Performance**:
   - Lighthouse
   - WebPageTest
   - GTmetrix

---

## 🔄 Atualizações Automáticas

### Netlify/Vercel/Cloudflare

Com Git conectado:
```bash
git add .
git commit -m "Atualização"
git push
```

O site atualiza automaticamente!

### Manual (Drag & Drop)

```bash
npm run build
```

Arraste novamente a pasta `dist` para o site.

---

## 🌐 Custom Domain

### Adicionar domínio personalizado:

1. **Compre um domínio** (Namecheap, Google Domains, etc.)
2. **Configure DNS**:
   - Tipo: A ou CNAME
   - Aponta para: IP/URL da plataforma
3. **Configure na plataforma**:
   - Netlify: Domain settings → Add custom domain
   - Vercel: Project settings → Domains
4. **SSL automático** (todas plataformas oferecem)

---

## ✅ Checklist Pré-Deploy

- [ ] Build funciona localmente: `npm run build`
- [ ] Preview funciona: `npm run preview`
- [ ] `.env` configurado
- [ ] Variáveis de ambiente na plataforma
- [ ] `_redirects` ou `vercel.json` presente
- [ ] Git commit com tudo
- [ ] Testado em mobile e desktop

---

## 🆘 Suporte

**Problema específico de plataforma?**

- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Cloudflare: https://developers.cloudflare.com/pages

**Problema com o código?**

Consulte:
- [README.md](./README.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- [SSL-FIX.md](./SSL-FIX.md)

---

## 🎉 Pronto!

Seu site estará online em:
- **Netlify**: `https://seu-site.netlify.app`
- **Vercel**: `https://seu-site.vercel.app`
- **Render**: `https://seu-site.onrender.com`
- **Cloudflare**: `https://seu-site.pages.dev`

**Depois pode adicionar domínio personalizado!**
