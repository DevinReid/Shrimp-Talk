# Shrimp Talk Development Roadmap

## Core Features (From Original Plan)

### Phase 1: Project Setup & UI Foundation ✅
- Next.js with TypeScript and Tailwind CSS
- Project structure
- Basic layout with navigation
- Mock data generators

### Phase 2-15: Core Features (See main plan)
- Authentication
- Feed System
- Messaging
- Friend Groups
- Location Sharing
- Chat Rooms

## New Feature: Intervention System

### Feature: "Friend Intervention Messages"

**Concept**: When a user tries to turn off their feed toggle (or other self-control features), instead of immediately allowing it, show them an intervention option with messages from friends.

**Use Cases**:
1. User has feed turned off and tries to turn it back on
2. User hits a time limit they set for themselves
3. User tries to bypass their own controls

**Functionality**:

#### Phase 1: Text Intervention Messages
- When user attempts to disable controls, show a modal/dialog
- Display option: "Maybe instead, send a message to a friend?"
- Friends can leave pre-written positive messages that appear in these moments
- Messages could be:
  - "Hey, I love you. You don't need to do this. We could just talk later."
  - "Hey, what's up? I miss you."
  - "Devin's really great because of [specific positive things]"
- User can choose to:
  - Send a message to a friend instead
  - Dismiss and continue (with optional delay/cooling-off period)
  - View the intervention message and reconsider

#### Phase 2: Video Intervention Messages
- Friends can record short video messages
- Videos play when user tries to disable controls
- More personal and impactful than text
- Video storage and playback system needed

**Technical Requirements**:
- New data model: `InterventionMessage`
  - id, fromUserId, toUserId, content (text or video URL), type, createdAt
- Intervention trigger system
- Modal/overlay component for intervention UI
- Friend message management (create, edit, delete intervention messages)
- Optional: Random selection of messages to show variety
- Optional: Analytics on intervention effectiveness

**Database Schema Addition**:
```sql
intervention_messages:
  - id
  - from_user_id (friend who created it)
  - to_user_id (user who will see it)
  - content (text message or video URL)
  - type ('text' | 'video')
  - created_at
  - updated_at
```

**UI Components Needed**:
- `InterventionModal` - Shows when user tries to disable controls
- `InterventionMessageCreator` - Friends can create messages
- `InterventionMessageList` - Manage existing messages
- Video recorder/uploader (for Phase 2)

**Integration Points**:
- Feed toggle component - trigger intervention before allowing toggle
- Settings/controls page - manage intervention preferences
- Friend management - who can leave intervention messages
- Messaging system - redirect to send message instead

**Future Enhancements**:
- Scheduled interventions (check in at certain times)
- Group interventions (multiple friends' messages)
- Customizable intervention triggers
- Intervention effectiveness tracking
- Positive reinforcement system

---

**Status**: Planned for future phase (after core features are complete)
**Priority**: High - This is a key differentiator for the app's mission of helping users break bad social media habits

