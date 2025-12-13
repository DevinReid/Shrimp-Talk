# Shrimp Talk

A social media app focused on user control and intentional engagement. No algorithms, no endless scrolling—just you and your friends.

## Features (Planned)

- **Instagram-like Feed**: Posts, stories, comments, and likes
- **Real-time Messaging**: Direct messages and group chats with WebSocket support
- **Friend Groups**: Create multiple friend groups for targeted sharing
- **Feed Toggle**: Turn off the feed entirely when you need to focus
- **Location Sharing**: Share your location with specific friend groups
- **Chat Rooms**: Discord-like rooms for group discussions
- **No Algorithm**: Chronological feed, no algorithmic manipulation
- **Intervention System**: Friends can leave positive messages/videos that appear when you try to disable your self-control settings, helping break anxious social media habits

> See [ROADMAP.md](./ROADMAP.md) for detailed feature plans including the new Intervention System.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Node.js with Express (planned)
- **Database**: PostgreSQL (on Render)
- **Real-time**: WebSocket/Socket.io (planned)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DevinReid/Shrimp-Talk.git
cd Shrimp-Talk
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
shrimp-talk/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── feed/            # Feed-related components
│   ├── messages/        # Messaging components
│   ├── groups/          # Friend groups components
│   └── shared/          # Shared components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, API clients, mock data
├── stores/              # Zustand state stores
└── types/               # TypeScript type definitions
```

## Development Status

**Phase 1: Complete** ✅
- Project setup with Next.js, TypeScript, and Tailwind CSS
- Project structure and directory organization
- Basic layout with navigation
- Mock data generators
- Type definitions

**Next Steps**: Phase 2 - Authentication UI

