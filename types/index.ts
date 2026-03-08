// User types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
}

// Friend Group types
export interface FriendGroup {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  members: User[];
}

// Post types
export type PostType = "photo" | "video" | "text" | "checkin";

export type PostDuration = "forever" | "1h" | "6h" | "24h" | "3d" | "1w";

export interface Post {
  id: string;
  userId: string;
  user: User;
  type?: PostType;
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
  locationName?: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
  visibleToGroups: string[];
  expiresAt?: Date;
  createdAt: Date;
}

// Calendar Event types
export interface CalendarEvent {
  id: string;
  userId: string;
  user: User;
  title: string;
  description?: string;
  date: Date;
  endDate?: Date;
  location?: string;
  attendees: User[];
  visibleToGroups: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: Date;
}

// Story types
export interface Story {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  visibleToGroups: string[]; // Group IDs
  expiresAt: Date;
  createdAt: Date;
}

// Message types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  type: "text" | "image" | "location";
  createdAt: Date;
}

export interface Conversation {
  id: string;
  type: "dm" | "group";
  groupName?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  createdAt: Date;
}

// Location types
export interface LocationShare {
  id: string;
  userId: string;
  user: User;
  latitude: number;
  longitude: number;
  sharedWithGroupId?: string;
  createdAt: Date;
}

// Room types
export interface Room {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdBy: string;
  members: User[];
  createdAt: Date;
}

// Intervention Message types
// Friends can leave positive messages/videos that appear when user tries to disable self-control settings
export interface InterventionMessage {
  id: string;
  fromUserId: string;
  fromUser: User;
  toUserId: string;
  content: string; // Text message or video URL
  type: "text" | "video";
  createdAt: Date;
  updatedAt: Date;
}

