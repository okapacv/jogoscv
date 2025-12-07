# 🚀 COMO COLOCAR ONLINE AGORA - GamePromo CV

## ⚡ Método Mais Rápido (5 minutos)

### Passo 1: Build está PRONTO! ✅

A pasta `dist/` já contém todos os arquivos necessários.

### Passo 2: Escolha uma plataforma GRATUITA:

---

## 🟢 NETLIFY (Mais Fácil - Recomendado)

### Método Drag & Drop (SEM instalar nada)

1. **Acesse**: https://app.netlify.com/drop

2. **Arraste** a pasta `dist` para o site

3. **Pronto!** Seu site está online!

4. **Configurar variáveis**:
   - Clique no site criado
   - Site settings → Environment variables → Add a variable
   - Adicione:
     ```
     VITE_SUPABASE_URL=https://zkounrnpwkktnzzlpxeq.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprb3Vucm5wd2trdG56emxweGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNzU2NzUsImV4cCI6MjA4MDY1MTY3NX0.O3RrSPiXMOgxt2v06WCBr14Rs-d8A5OmxfSpuI7w85k
     ```

5. **Trigger deploy**: Deploys → Trigger deploy → Deploy site

**Seu site estará em**: `https://[nome-aleatório].netlify.app`

---

## 🔵 VERCEL (Também Muito Fácil)

1. **Acesse**: https://vercel.com

2. **Login** com GitHub/GitLab/Email

3. **Clique**: Add New → Project

4. **Arraste** a pasta `dist` ou conecte repositório Git

5. **Configure variáveis** de ambiente (mesmas do Netlify)

6. **Deploy!**

**Seu site estará em**: `https://[nome].vercel.app`

---

## 📱 Testar Localmente Antes

```bash
# Preview do build
npm run preview
```

Acesse: http://localhost:4173

---

## 🔄 Atualizações Futuras

### Se usou Drag & Drop:

1. Faça alterações no código
2. Rode: `npm run build`
3. Arraste novamente a pasta `dist` para o Netlify/Vercel

### Se conectou Git:

1. Faça alterações
2. Commit e push:
```bash
git add .
git commit -m "Atualização"
git push
```

O site atualiza AUTOMATICAMENTE!

---

## ⚙️ Variáveis de Ambiente

**IMPORTANTE**: Sem essas variáveis, o site não carrega dados!

```env
VITE_SUPABASE_URL=https://zkounrnpwkktnzzlpxeq.supabase.co

VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprb3Vucm5wd2trdG56emxweGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNzU2NzUsImV4cCI6MjA4MDY1MTY3NX0.O3RrSPiXMOgxt2v06WCBr14Rs-d8A5OmxfSpuI7w85k
```

---

## ✅ Checklist de Deploy

- [x] Build criado (pasta `dist/` existe)
- [x] Arquivo `_redirects` incluído
- [x] `vercel.json` configurado
- [x] `netlify.toml` configurado
- [ ] Variáveis de ambiente configuradas na plataforma
- [ ] Deploy feito
- [ ] Site testado e funcionando

---

## 🆘 Problemas?

### Site mostra tela branca
- Adicione as variáveis de ambiente
- Faça rebuild do site na plataforma

### Erro 404 nas rotas
- Verifique se `_redirects` está na pasta `dist/`
- Para Vercel: verifique `vercel.json`

### Dados não carregam
- Verifique variáveis de ambiente
- Certifique-se que começam com `VITE_`
- Faça rebuild

---

## 📚 Mais Detalhes

Consulte: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎉 Tudo Pronto!

Seu site GamePromo CV está pronto para ir ao ar!

Qualquer plataforma que escolher, seu site estará online em minutos.

**Boa sorte! 🚀**
