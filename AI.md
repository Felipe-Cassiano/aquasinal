# Uso de IA no projeto AquaSinal

Este documento registra como a inteligência artificial foi usada no desenvolvimento do AquaSinal (Global Solution 2026.2 — FIAP), o que ela fez, o que a equipe decidiu e como o resultado foi verificado.

## 1. Ferramentas usadas

| Ferramenta | Para que foi usada |
|---|---|
| **Claude (Anthropic)** | Planejamento do projeto, decisões de arquitetura, explicação dos conceitos, geração do código de cada etapa, geração das imagens do mapa e revisão de erros. |
| **GitHub Copilot** | Aplicar no projeto, nos arquivos certos, o código que o Claude produziu, por meio de prompts prontos. |

## 2. Como trabalhamos

O desenvolvimento foi feito em **etapas pequenas, uma de cada vez**, em um ciclo fixo:

1. O Claude explicava a etapa e o que cada trecho de código fazia.
2. O Claude entregava o código e um **prompt para o Copilot** com o código exato, as regras ("não altere outros arquivos", "não instale dependências", "não faça commits") e a lista de arquivos.
3. O aluno colava o prompt no Copilot, que criava ou substituía os arquivos.
4. O aluno **testava no navegador** seguindo uma tabela de testes e relatava o resultado.
5. Só depois de tudo certo era feito o commit, e a próxima etapa era pedida.

Pedimos explicitamente que o código fosse **simples e explicado**, para que todos da equipe consigam entendê-lo e defendê-lo na apresentação.

## 3. O que foi decidido pela equipe

A IA propôs opções, mas as decisões de produto foram da equipe:

- **Tema e escopo:** guiar o cidadão pelas 3 etapas de uma enchente, tudo hipoteticamente em São Paulo, SP, sem escolha de localização.
- **Como o CRUD entra no projeto:** cada etapa tem um plano de ação (to-do list), com algumas tarefas pré-cadastradas pela API e outras criadas pelo usuário. O CRUD não cria locais nem outros dados complexos.
- **Papel da API:** apenas guardar as tarefas de cada etapa e devolvê-las quando pedidas (por exemplo, um `GET` ao trocar de etapa).
- **Hooks:** manter somente `useState` e `useEffect` em toda a aplicação, e juntar `useLocalStorage`, `useOnlineStatus` e `useActions`, porque combinam com o tema (avisar que a internet caiu e não perder o que já foi carregado).
- **Offline:** nível 1. Sem conexão, o app mostra a última lista salva e bloqueia alterações.
- **Visual:** um container colorido por etapa (amarelo, vermelho e verde), título grande à esquerda, plano de ação com barra de rolagem e mapa à direita, sem ruas reais.
- **Apagar:** apaga direto, sem janela de confirmação.
- **Rodapé:** com os nomes e RMs dos integrantes.

## 4. O que a IA gerou

- Estrutura de pastas e separação em camadas (componente → hook → service → API).
- O código dos componentes, dos três custom hooks, dos services, das constantes e da função `calcularProgresso`.
- Os textos de orientação de cada etapa (conteúdo de segurança). **Esse conteúdo deve ser revisado pela equipe**, e não foi validado por um órgão oficial.
- As três imagens do mapa, geradas como diagramas ilustrativos (nós e ligações, sem ruas reais).
- O script de seed que cadastrou as 36 ações iniciais na MockAPI.
- Os prompts para o Copilot, as tabelas de teste, as mensagens de commit sugeridas e este documento, o README.md.

## 5. Como verificamos o resultado

- **Testes manuais em cada etapa**, com uma tabela de itens (criar, editar, marcar, apagar, trocar de etapa, erro de API, offline, responsividade).
- **Conferência na própria API:** abrir a URL do MockAPI no navegador e verificar os dados após cada operação.
- **Simulação de falhas** no DevTools (modo Offline e bloqueio de requisições) para testar a cópia local.
- **Teste em larguras de celular, tablet e desktop** com o modo dispositivo do DevTools.
- **Revisão do código pela equipe** antes de cada commit, para entender o que cada trecho faz.

## 6. Erros da IA que encontramos e corrigimos

| Situação | O que aconteceu | Correção |
|---|---|---|
| Seed da API | Todos os `POST` retornaram 400. A URL base de exemplo dada pela IA tinha `/api/v1`, que não existe nessa MockAPI. | Usar a URL base real do projeto, sem caminho extra. O seed passou a retornar 201. |
| Tailwind | O Tailwind não havia sido instalado junto com o projeto. | A IA forneceu os passos de instalação e configuração. |
| Cursor dos botões | No Tailwind v4, os botões não mostram o cursor de clique por padrão. | Acrescentamos `cursor-pointer` nos botões e no seletor de etapas. |
| Teste de offline | A IA indicou um teste que dá F5 sem internet e esperava ver a cópia local. Isso é impossível sem *service worker*. | O teste foi corrigido e a limitação ficou documentada. |
| Itens duplicados | Ao criar uma ação durante os testes, duas ações foram criadas (ids 37 e 38) por causa do modo estrito do React em desenvolvimento. | O comportamento foi investigado e as ações de teste foram apagadas pela própria interface. |

## 7. Prompts da conversa

A conversa completa com o Claude é o registro principal do uso de IA. Abaixo estão os principais prompts do aluno, na ordem em que aconteceram (transcritos como foram escritos).

### 7.1 Definição do projeto e do CRUD

- "A Ideia é de um site que, ao dado uma localização (por exemplo, São Paulo, SP) ele mostra soluções simples para cada uma das 3 etapas. Como o CRUD pode entrar nesse plano?"
- "o CRUD então seria uma "todo-list" em cada um dos estágios, com alguns já precriados pela API, outros o usuário pode criar"

### 7.2 Arquitetura, constantes e hooks

- "Quais hooks o useActions usa? precisamos que todos os custom hooks, na realidade toda a aplicação, use apenas useState e useEffect"
- "talvez podemos juntar o LocalStorage, OnlineStatus e useActions. O localStorage é complexo e os 3 fazem uma boa harmonia junto (salva as alterações caso a internet caia, e avisa que a internet caiu. Combina com o tema)"

### 7.3 Visual

- "Faça tudo, exceto as etapas (essa pode manter do mesmo estilo), tudo dentro de um container, cada container tendo a cor respectiva da etapa (antes, amarelo, durante, vermelho, depois, verde). Na esquerda, coloque o título bem grande da etapa, uma lista pequena (quase como sustítulo) os GuidanceCard e no topo da todo list coloque o lugar de adicionar, no fim, para manter o tamanho, coloque uma barra de rolagem. Na direita, podemos fazer a parte de rotas, talvez usando rotas fictícias como pins, imagens e afins"
- "o mapa não precisa apresentar uma rua real, faça apenas as ligações"

### 7.4 Correções e verificação

- "400 em todos os teste"
- "ao dar f5 offline, a página apenas não carrega"

> O histórico completo pode ser exportado a partir da conversa original: [PREENCHER: link ou anexo do histórico].

## 8. Limites e responsabilidade

- A equipe revisou, testou e é responsável por todo o código entregue.
- O conteúdo de segurança (orientações em caso de enchente) é **ilustrativo** e não substitui as orientações oficiais da Defesa Civil.
- Os dados do mapa, os locais e os nomes dos abrigos são **fictícios**.
