# 🚀 Início Rápido - GamePromo CV

## Começar em 30 segundos

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Iniciar Desenvolvimento
```bash
npm run dev
```

Pronto! Acesse: http://localhost:5173

---

## 🔧 Problemas SSL?

**Não se preocupe!** Os comandos já resolvem automaticamente.

Se ainda tiver problemas, leia: [SSL-FIX.md](./SSL-FIX.md)

---

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos estarão em `dist/`

---

## 📱 Ver em Outros Dispositivos

```bash
npm run dev
```

Depois acesse o IP mostrado no terminal de outro dispositivo na mesma rede.

---

## 🔑 Configurar Supabase

1. Copie `.env.example` para `.env`
2. Adicione suas credenciais do Supabase
3. Reinicie o servidor

---

## 📚 Documentação Completa

- **Setup Completo**: [README.md](./README.md)
- **Problemas SSL**: [SSL-FIX.md](./SSL-FIX.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🆘 Ajuda Rápida

**Site não carrega?**
1. Verifique se instalou: `npm install`
2. Verifique se `.env` existe e está configurado
3. Tente limpar: `npm cache clean --force`

**Erro de SSL?**
- Use: `npm run dev` (já tem correção automática)
- Ou leia: [SSL-FIX.md](./SSL-FIX.md)

**Erro de porta em uso?**
- O Vite tentará outra porta automaticamente
- Ou configure em `vite.config.ts`
