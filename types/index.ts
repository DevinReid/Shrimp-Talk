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
export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption?: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
  visibleToGroups: string[]; // Group IDs
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
  participants: User[];
  lastMessage?: Message;
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

