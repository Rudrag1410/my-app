# AI Wealth Agent

A chat-first AI agent, backed by real OpenAI tool calling, that helps a user set a Save/Grow
goal and start a SIP — and, when the user signals a cash need, steers them toward borrowing
against their portfolio instead of breaking their SIP.

Built with [Expo](https://expo.dev) (SDK 57) and [Expo Router](https://docs.expo.dev/router/introduction/) using file-based routing.

## Setup

1. Install dependencies

   ```bash
   yarn install
   ```

2. Add your OpenAI API key to `.env` (already gitignored, see `.env.example`):

   ```
   EXPO_PUBLIC_OPENAI_API_KEY=sk-...
   ```

3. Start the app

   ```bash
   npx expo start
   ```

   Or target a platform directly:

   ```bash
   yarn ios       # expo run:ios
   yarn android   # expo run:android
   yarn web       # expo start --web
   ```

## Known trade-off

`EXPO_PUBLIC_OPENAI_API_KEY` ships inside the client bundle, so it's visible to anyone who
inspects the app. This is acceptable for this assignment's scope, but in production this call
should move behind a backend proxy that holds the key server-side and forwards chat/tool-call
requests on the client's behalf.

One consequence of this: OpenAI's Chat Completions API does not send CORS headers, so it can't
be called directly from a browser — the web target (`expo start --web`) will hit a CORS error
on every turn. Native (iOS/Android) is unaffected, since CORS is a browser-only restriction.

## Folder architecture

```
src/
  app/                  Expo Router routes (file-based). Thin re-exports of pages/.
    _layout.tsx           Root layout: fonts, splash overlay, tab navigation theme.
    index.tsx              "/" -> DashboardPage
    chat.tsx                "/chat" -> ChatPage

  components/           App-shell components used by the router layout (tabs, splash overlay).

  pages/                Screen-level feature code, one folder per screen.
    ChatPage/              Chat UI: bubbles, input, quick replies, typing indicator,
                            and Card/ for the rich tool-result cards (plan, growth chart,
                            borrow comparison, what-if slider, confirm action row).
    DashboardPage/          Goals dashboard: goal cards, progress ring, empty state.

  shared/                Code shared across pages/features.
    components/            Generic UI primitives (Button, Chip, Text, Screen, ErrorState).
    features/
      chat/                 Chat domain logic:
        service/              OpenAI client, system prompt, tool/function definitions,
                               tool registry, agent orchestrator (the tool-calling loop),
                               and tool-handlers/ (one file per callable tool, e.g.
                               calculateSipProjection, calculateBorrowEligibility, startSip).
        chat.types.ts, chat.constants.ts, mapToolCallsToCards.ts, chat.store.utils.ts
      portfolio/             Portfolio domain logic (SIP math, portfolio constants/types).
    store/                  Zustand stores (chat.store.ts, portfolio.store.ts).
    theme/                  Design tokens, theme, and font loading.
    utils/                  Small cross-cutting helpers (e.g. formatCurrency).
```

Path alias: `@/*` maps to `src/*` (see `tsconfig.json`), e.g. `import { theme } from '@/shared/theme/theme'`.

### How a chat turn flows

1. `ChatPage` (`src/pages/ChatPage`) collects user input and calls `useAgentChat`.
2. `useAgentChat` drives `agentOrchestrator` (`src/shared/features/chat/service`), which sends
   the conversation + `toolDefinitions` to OpenAI via `openaiClient`.
3. When the model calls a tool, `toolRegistry` resolves it to a handler in
   `service/tool-handlers/`, which runs and returns a typed result.
4. `mapToolCallsToCards` turns tool results into the rich cards rendered by
   `ChatCardRenderer` (plan, growth chart, borrow comparison, etc.).
5. Chat and portfolio state persist through the Zustand stores in `shared/store/`.

## Other scripts

- `yarn lint` / `yarn lint:fix` — ESLint (expo config)
- `yarn format` / `yarn format:check` — Prettier
- `yarn reset-project` — moves the starter code aside and resets `app/` (Expo boilerplate helper)

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
