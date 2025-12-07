#!/bin/bash

echo "🚀 GamePromo CV - Deploy para Netlify"
echo "======================================"
echo ""

# Build do projeto
echo "📦 Building o projeto..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo ""
    echo "📤 Para fazer deploy:"
    echo ""
    echo "Opção 1 - Netlify CLI:"
    echo "  npm install -g netlify-cli"
    echo "  netlify deploy --prod"
    echo ""
    echo "Opção 2 - Drag & Drop:"
    echo "  1. Acesse: https://app.netlify.com/drop"
    echo "  2. Arraste a pasta 'dist' para o site"
    echo ""
    echo "Opção 3 - GitHub:"
    echo "  1. Push para GitHub"
    echo "  2. Conecte o repositório no Netlify"
    echo ""
    echo "⚠️  Não esqueça de configurar as variáveis de ambiente:"
    echo "  - VITE_SUPABASE_URL"
    echo "  - VITE_SUPABASE_ANON_KEY"
    echo ""
    echo "📚 Mais informações: DEPLOYMENT.md"
else
    echo "❌ Erro no build. Verifique os erros acima."
    exit 1
fi
