# Toolkit

Coleção de ferramentas úteis para desenvolvedores e usuários. Uma aplicação web moderna com calculadoras financeiras e geradores de segurança.

## Ferramentas Disponíveis

### Calculadoras Financeiras

- **Calculadora de Financiamento** - Calcule a parcela fixa mensal usando o Sistema Price. Ideal para simular empréstimos e financiamentos imobiliários.
- **Simulador de Investimentos** - Simule o crescimento dos seus investimentos ao longo do tempo com aportes mensais e visualização em gráfico.

### Ferramentas para Desenvolvedores

- **Gerador de API Keys** - Gere chaves de API seguras com entropia criptográfica em diversos formatos (alfanumérico, hex, base64, UUID). Suporte para prefixos customizados e pares chave-segredo.
- **Gerador de Webhook Secrets** - Gere secrets para verificação de assinaturas HMAC (SHA-256, SHA-384, SHA-512) com exemplos de código em Node.js e Python.
- **Gerador de UUID** - Gere identificadores únicos universais em várias versões: v4 (aleatório), v7 (ordenado por tempo), v1 (time-based), v3 (MD5) e v5 (SHA-1).

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd toolkit

# Instale as dependências
npm install
```

## Executando

```bash
# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar build de produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## Stack Tecnológica

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilos utilitários
- **Web Crypto API** - Geração criptográfica segura

## Estrutura do Projeto

```
app/
├── page.tsx                    # Página inicial
├── financiamento/              # Calculadora de financiamento
├── investimentos/              # Simulador de investimentos
├── api-key-generator/          # Gerador de API Keys
├── webhook-secrets/            # Gerador de Webhook Secrets
└── uuid-generator/             # Gerador de UUID

components/
├── calculators/                # Componentes de calculadoras
├── generators/                 # Componentes de geradores
└── ui/                         # Componentes UI reutilizáveis

lib/
├── types.ts                    # Definições de tipos TypeScript
├── calculators.ts              # Lógica das calculadoras
└── generators.ts               # Lógica dos geradores
```

## Licença

MIT
