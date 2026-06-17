# g-review

A multi-tenant workspace application featuring an AI assistant capable of managing your Gmail and Google Calendar seamlessly. Built using Next.js, Corsair, Drizzle ORM, and OpenAI Agents.

## Features

- **Multi-Tenant Architecture**: Supports multiple users with independent Google accounts using Corsair's tenant system.
- **Google OAuth**: Secure login with Google using `next-auth`.
- **AI Chatbot Assistant**: An intelligent agent that can read your inbox and send emails on your behalf, utilizing the `@corsair-dev/mcp` and `@openai/agents`.
- **Modern Dashboard**: A responsive frontend dashboard with a sidebar, inbox view, and calendar integrations.

## Folder Structure

Based on the proposed architecture:

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── chat/page.tsx
│   │   ├── inbox/page.tsx
│   │   └── calendar/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── gmail/route.ts
│       ├── calendar/route.ts
│       └── chat/route.ts
├── components/
│   ├── Sidebar.tsx
│   ├── EmailList.tsx
│   ├── ChatWindow.tsx
│   └── CalendarView.tsx
└── lib/
    ├── corsair.ts
    └── auth.ts
```

## Getting Started

1. Clone the repository and install dependencies using `npm install`.
2. Configure `.env` with your `DATABASE_URL`, Google OAuth credentials, and Corsair keys.
3. Run `npm run dev` to start the development server.
