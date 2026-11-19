# AquaSinal

Aplicação web que orienta o cidadão nas **três etapas de uma enchente urbana**: **Antes**, **Durante** e **Depois**. Para cada etapa, o usuário vê orientações de segurança, um mapa ilustrativo e um **plano de ação** (lista de tarefas) que ele pode personalizar.

Projeto da **Global Solution 2026.2 (CitizenTech)** — FIAP.

- **Acesse:** [PREENCHER: link do site]
- **Repositório:** [PREENCHER: link do GitHub]
- **Local (fictício):** São Paulo, SP

> Todos os dados do mapa e das orientações são **ilustrativos**. O app não usa localização real nem substitui os canais oficiais (Defesa Civil: 199).

---

## Funcionalidades

- **Linha do tempo em 3 etapas** (Antes, Durante, Depois). Cada uma tem cor própria: amarelo, vermelho e verde.
- **Orientações de segurança** por etapa, com nível de prioridade.
- **Plano de ação com CRUD completo**, consumindo uma API externa (MockAPI.io):
  - **Create:** adicionar uma ação à etapa atual.
  - **Read:** listar as ações de cada etapa (filtro `?etapa=`).
  - **Update:** marcar como feita ou editar o texto.
  - **Delete:** apagar uma ação.
- **Barra de progresso** ("N de M feitas") por etapa.
- **Mapa ilustrativo** de cada etapa (áreas de risco, rotas seguras e pontos de apoio), com legenda.
- **Modo offline:** o app avisa quando a conexão cai, mostra a última lista salva no navegador e bloqueia alterações até a internet voltar.
- **Layout responsivo** (celular, tablet e desktop), com estados de carregamento e de erro.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React + Vite | Interface e ambiente de desenvolvimento |
| JavaScript | Linguagem |
| Tailwind CSS v4 | Estilização |
| MockAPI.io | API REST externa (dados das ações) |
| `localStorage` | Cópia local das listas para o modo offline |

O app usa **apenas** os hooks `useState` e `useEffect`, e não depende de bibliotecas de componentes, de ícones, de formulários nem de requisições.

---

## Arquitetura

O código é dividido em três camadas, e cada uma só conversa com a vizinha:

```
Componente  →  Hook  →  Service  →  API
 (interface)  (lógica)   (dados)    (MockAPI)
```

| Camada | Pasta | Responsabilidade |
|---|---|---|
| Interface | `src/components`, `src/pages` | Desenhar a tela e reagir a cliques. Não conhece a API. |
| Lógica | `src/hooks`, `src/utils` | Estado, regras e efeitos. Não desenha nada. |
| Dados | `src/services` | Falar com a API (`fetch`). Não conhece o React. |
| Constantes | `src/constants` | Textos, cores das etapas, orientações, mapas e integrantes. |

### Estrutura de pastas

```
src/
├── assets/mapas/        # imagens do mapa (antes, durante, depois)
├── components/
│   ├── actions/         # ActionForm, ActionItem, ActionList
│   ├── layout/          # Header, Footer
│   ├── stage/           # StageStepper, StagePanel, GuidanceCard, RouteMap, SafeRouteCard
│   └── ui/              # Button, Loading, ErrorMessage, ProgressBar
├── constants/           # stages.js, guidance.js, routes.js, config.js
├── hooks/               # useActions, useOnlineStatus, useLocalStorage
├── pages/               # Home.jsx
├── services/            # api.js, actionsService.js
├── utils/               # progress.js (calcularProgresso)
├── App.jsx
├── main.jsx
└── index.css
```

### Custom hooks

| Hook | O que faz |
|---|---|
| `useActions(etapa)` | Carrega as ações da etapa e expõe `criar`, `atualizar` e `remover`. Controla `loading` e erros. Usa os dois hooks abaixo. |
| `useOnlineStatus()` | Devolve `true` ou `false` conforme a conexão, ouvindo os eventos `online` e `offline`. |
| `useLocalStorage(chave, inicial)` | Funciona como um `useState`, mas guarda o valor no `localStorage`. |

### Componentes (14)

`Header`, `Footer`, `StageStepper`, `StagePanel`, `GuidanceCard`, `RouteMap`, `SafeRouteCard`, `ActionForm`, `ActionItem`, `ActionList`, `Button`, `Loading`, `ErrorMessage` e `ProgressBar`.

---

## API (MockAPI.io)

Recurso `acoes`, com os campos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Gerado pela API |
| `etapa` | string | `antes`, `durante` ou `depois` |
| `texto` | string | Descrição da ação |
| `feito` | boolean | Se a ação foi concluída |

| Operação | Requisição |
|---|---|
| Listar por etapa | `GET /acoes?etapa=durante` |
| Criar | `POST /acoes` |
| Atualizar | `PUT /acoes/:id` |
| Apagar | `DELETE /acoes/:id` |

A API foi criada com **36 ações iniciais** (12 por etapa). O usuário pode criar, editar e apagar à vontade.

---

## Modo offline

1. Cada lista carregada com sucesso é copiada para o `localStorage` (chave `aquasinal:acoes`).
2. Se a conexão cair com a página aberta, ou se a API não responder, o app mostra a **última lista salva** e um aviso.
3. Nesse modo, criar, editar e apagar ficam **bloqueados**, para não divergir da API.
4. Quando a conexão volta, a lista oficial é buscada de novo.

**Limitação:** recarregar a página (F5) sem internet não funciona, porque isso exigiria um *service worker*, que está fora do escopo do projeto.

---

## Como rodar na sua máquina

**Pré-requisitos:** [Node.js](https://nodejs.org) 18 ou superior (já inclui o npm) e [Git](https://git-scm.com). Para conferir: `node -v`, `npm -v` e `git --version`.

### 1. Clonar o repositório

```bash
git clone [PREENCHER: link do repositório]
cd [PREENCHER: nome da pasta]
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar a API

O app lê o endereço da API de uma variável de ambiente. Crie o arquivo `.env` a partir do exemplo:

```bash
# Linux e macOS
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Abra o `.env` e preencha com a URL base da API, **sem** `/acoes` no final:

```
VITE_API_URL=[PREENCHER: URL base da MockAPI]
```

> Sem essa variável, o app abre, mas mostra erro ao carregar as ações.

### 4. Iniciar

```bash
npm run dev
```

O terminal mostra o endereço local, normalmente `http://localhost:5173`. Abra no navegador.

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Abre a versão de produção localmente (rode o `build` antes) |

### Problemas comuns

| Sintoma | O que fazer |
|---|---|
| `npm: command not found` | Instale o Node.js e abra um novo terminal. |
| Mensagem "Não foi possível carregar as ações" | Confira o `.env` (URL sem `/acoes`) e reinicie o `npm run dev`, pois o Vite só lê o `.env` ao iniciar. |
| Porta `5173` ocupada | O Vite escolhe a próxima porta livre e mostra o endereço no terminal. |

---

## Como usar

1. **Escolha a etapa** na linha do tempo no topo: Antes, Durante ou Depois. A cor do painel muda conforme a etapa.
2. **Leia as orientações** de segurança da etapa. Elas vêm com um nível de prioridade.
3. **Monte seu plano de ação:**
   - Digite uma ação no campo e clique em **+ Adicionar**.
   - Clique na **caixinha** para marcar uma ação como feita (ou desmarcar).
   - Clique em **Editar** para mudar o texto (Enter salva, Esc cancela).
   - Clique em **Apagar** para remover a ação. A remoção é imediata.
4. **Acompanhe o progresso** na barra "N de M feitas".
5. **Consulte o mapa** à direita (ou abaixo da lista, no celular) para ver as áreas de risco, as rotas seguras ou os pontos de apoio de cada etapa.

Sem internet, o app avisa e mostra a última lista salva no navegador. Nesse caso é possível ler, mas não criar, editar nem apagar.

---

## Equipe

| Nome | RM |
|---|---|
| Felipe Roberto Cassiano | 569238 |
| Paulo Henrique Moreira Angueira | 573245 |
| Raphael Martins Manfredi | 570500 |
| Eduardo de Abreu Gouvêa | 573414 |
| Vinícius Mansur Magalhães | 571518 |

---

## Uso de inteligência artificial

O uso de IA no projeto está documentado em [`AI.md`](./AI.md).
