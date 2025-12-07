#!/bin/bash

# Script para iniciar o servidor de desenvolvimento com SSL desabilitado
export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_OPTIONS="--max-old-space-size=4096"

echo "🚀 Iniciando GamePromo CV em modo desenvolvimento..."
echo "⚠️  SSL verification desabilitado para desenvolvimento local"
echo ""

npm run dev
