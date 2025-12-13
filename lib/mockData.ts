import type { User, Post, Story, Conversation, Message, FriendGroup, LocationShare, Room } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "alice@example.com",
    displayName: "Alice",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    bio: "Just living life",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "bob@example.com",
    displayName: "Bob",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    bio: "Coffee enthusiast",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    email: "charlie@example.com",
    displayName: "Charlie",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    bio: "Adventure seeker",
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    email: "diana@example.com",
    displayName: "Diana",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
    bio: "Photography lover",
    createdAt: new Date("2024-01-04"),
  },
];

// Mock friend groups
export const mockFriendGroups: FriendGroup[] = [
  {
    id: "group1",
    userId: "1",
    name: "Close Friends",
    createdAt: new Date("2024-01-05"),
    members: [mockUsers[1], mockUsers[2]],
  },
  {
    id: "group2",
    userId: "1",
    name: "Family",
    createdAt: new Date("2024-01-06"),
    members: [mockUsers[3]],
  },
  {
    id: "group3",
    userId: "1",
    name: "Work",
    createdAt: new Date("2024-01-07"),
    members: [mockUsers[2], mockUsers[3]],
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: "post1",
    userId: "2",
    user: mockUsers[1],
    imageUrl: "https://picsum.photos/800/600?random=1",
    caption: "Beautiful sunset today! 🌅",
    likes: 12,
    likedByUser: false,
    comments: [
      {
        id: "comment1",
        postId: "post1",
        userId: "3",
        user: mockUsers[2],
        content: "Amazing shot!",
        createdAt: new Date("2024-01-10T10:00:00"),
      },
    ],
    visibleToGroups: ["group1"],
    createdAt: new Date("2024-01-10T09:00:00"),
  },
  {
    id: "post2",
    userId: "3",
    user: mockUsers[2],
    imageUrl: "https://picsum.photos/800/600?random=2",
    caption: "New coffee shop opened! ☕",
    likes: 8,
    likedByUser: true,
    comments: [],
    visibleToGroups: ["group1", "group3"],
    createdAt: new Date("2024-01-10T11:00:00"),
  },
  {
    id: "post3",
    userId: "4",
    user: mockUsers[3],
    imageUrl: "https://picsum.photos/800/600?random=3",
    caption: "Weekend vibes 📸",
    likes: 15,
    likedByUser: false,
    comments: [],
    visibleToGroups: ["group2"],
    createdAt: new Date("2024-01-10T12:00:00"),
  },
];

// Mock stories
export const mockStories: Story[] = [
  {
    id: "story1",
    userId: "2",
    user: mockUsers[1],
    imageUrl: "https://picsum.photos/400/700?random=4",
    visibleToGroups: ["group1"],
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "story2",
    userId: "3",
    user: mockUsers[2],
    imageUrl: "https://picsum.photos/400/700?random=5",
    visibleToGroups: ["group1", "group3"],
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    type: "dm",
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: "msg1",
      conversationId: "conv1",
      senderId: "2",
      sender: mockUsers[1],
      content: "Hey, how are you?",
      type: "text",
      createdAt: new Date("2024-01-10T13:00:00"),
    },
    createdAt: new Date("2024-01-09"),
  },
  {
    id: "conv2",
    type: "group",
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    lastMessage: {
      id: "msg2",
      conversationId: "conv2",
      senderId: "3",
      sender: mockUsers[2],
      content: "Anyone up for coffee?",
      type: "text",
      createdAt: new Date("2024-01-10T14:00:00"),
    },
    createdAt: new Date("2024-01-08"),
  },
];

// Mock messages for conversations
export const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      conversationId: "conv1",
      senderId: "2",
      sender: mockUsers[1],
      content: "Hey, how are you?",
      type: "text",
      createdAt: new Date("2024-01-10T13:00:00"),
    },
    {
      id: "msg2",
      conversationId: "conv1",
      senderId: "1",
      sender: mockUsers[0],
      content: "I'm doing great! Thanks for asking.",
      type: "text",
      createdAt: new Date("2024-01-10T13:05:00"),
    },
  ],
  conv2: [
    {
      id: "msg3",
      conversationId: "conv2",
      senderId: "3",
      sender: mockUsers[2],
      content: "Anyone up for coffee?",
      type: "text",
      createdAt: new Date("2024-01-10T14:00:00"),
    },
    {
      id: "msg4",
      conversationId: "conv2",
      senderId: "4",
      sender: mockUsers[3],
      content: "I'm in!",
      type: "text",
      createdAt: new Date("2024-01-10T14:02:00"),
    },
  ],
};

// Mock rooms
export const mockRooms: Room[] = [
  {
    id: "room1",
    name: "General",
    description: "General discussion",
    isPublic: true,
    createdBy: "1",
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "room2",
    name: "Tech Talk",
    description: "Discussing technology",
    isPublic: false,
    createdBy: "2",
    members: [mockUsers[0], mockUsers[2]],
    createdAt: new Date("2024-01-02"),
  },
];

// Current user (for mock purposes)
export const currentUser: User = mockUsers[0];

