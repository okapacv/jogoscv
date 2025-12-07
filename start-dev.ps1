# Script para iniciar o servidor de desenvolvimento com SSL desabilitado (PowerShell)

$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
$env:NODE_OPTIONS="--max-old-space-size=4096"

Write-Host "🚀 Iniciando GamePromo CV em modo desenvolvimento..." -ForegroundColor Green
Write-Host "⚠️  SSL verification desabilitado para desenvolvimento local" -ForegroundColor Yellow
Write-Host ""

npm run dev
