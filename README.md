# GamePromo Cabo Verde

Website moderno para promoções de jogos para PlayStation, Xbox, Nintendo e PC em Cabo Verde.

## Funcionalidades

- 🎮 Catálogo completo de jogos com promoções
- 🔍 Filtros por plataforma e tipo de promoção
- ⭐ Sistema de favoritos e avaliações
- 🔐 Autenticação de usuários
- 📰 Seção de notícias e novidades
- ❓ FAQ completo
- 📱 Design responsivo

## Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Database + Auth + Edge Functions)
- Lucide React (Ícones)

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais do Supabase

5. Inicie o servidor de desenvolvimento:

**Opção A - NPM (Recomendado):**
```bash
npm run dev
```

**Opção B - Scripts personalizados:**
```bash
# Linux/macOS
./start-dev.sh

# Windows (CMD)
start-dev.bat

# Windows (PowerShell)
.\start-dev.ps1
```

> **Nota sobre SSL:** Os comandos acima já incluem correção para problemas de certificado SSL. Se não tiver problemas SSL, use `npm run dev:secure`.

## Build para Produção

```bash
npm run build
```

O comando de build já está configurado para ignorar problemas SSL em desenvolvimento.

## Sincronização com Airtable

Para sincronizar dados do Airtable automaticamente:

1. Configure as variáveis de ambiente no painel do Supabase:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME` (padrão: Games)

2. Chame a edge function:
```bash
curl -X POST https://your-project.supabase.co/functions/v1/sync-airtable \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Estrutura do Airtable

Seu Airtable deve conter as seguintes colunas:

- Title (texto)
- Description (texto longo)
- Original Price (número)
- Promotional Price (número)
- Discount Percentage (número)
- Cover Image (anexo)
- Genre (texto)
- Developer (texto)
- Publisher (texto)
- Platform (seleção: PlayStation, Xbox, Nintendo, PC)
- Promotion Type (seleção: discount, preorder, launch)
- Is Featured (checkbox)
- Purchase URL (URL)
- Release Date (data)

## Resolução de Problemas SSL

Se você encontrar problemas SSL durante o desenvolvimento:

### Opção 1: Configuração do Node.js (Desenvolvimento)
```bash
# Linux/Mac
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev

# Windows (PowerShell)
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev

# Windows (CMD)
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev
```

### Opção 2: Configuração do NPM
Crie um arquivo `.npmrc` na raiz do projeto:
```
strict-ssl=false
```

### Opção 3: Atualizar certificados
```bash
npm config set cafile /path/to/certificate.crt
```

**Nota:** Essas configurações devem ser usadas apenas em ambiente de desenvolvimento. Em produção, sempre use SSL apropriado.

## Licença

© 2024 GamePromo Cabo Verde. Todos os direitos reservados.
