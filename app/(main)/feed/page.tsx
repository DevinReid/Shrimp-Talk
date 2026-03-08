"use client";

import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import MobilePostCard from "@/components/app/MobilePostCard";
import { wonkyColors } from "@/lib/wonkyTheme";
import { mockUsers } from "@/lib/mockData";
import type { Post } from "@/types";

const feedPosts: Post[] = [
  {
    id: "fp1",
    userId: "2",
    user: mockUsers[1],
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
    caption: "Morning hike was absolutely worth the early alarm",
    likes: 0,
    likedByUser: false,
    comments: [
      { id: "c1", postId: "fp1", userId: "3", user: mockUsers[2], content: "Where is this?? I need to go", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    ],
    visibleToGroups: ["group1"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "fp2",
    userId: "3",
    user: mockUsers[2],
    type: "text",
    caption: "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address if you don't have it. Starts at 7, BYOB.",
    likes: 0,
    likedByUser: false,
    comments: [],
    visibleToGroups: ["group1"],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "fp3",
    userId: "4",
    user: mockUsers[3],
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=800&fit=crop",
    caption: "New studio setup is finally coming together",
    likes: 0,
    likedByUser: false,
    comments: [],
    visibleToGroups: ["group2"],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "fp4",
    userId: "2",
    user: mockUsers[1],
    type: "text",
    caption: "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.",
    likes: 0,
    likedByUser: false,
    comments: [
      { id: "c2", postId: "fp4", userId: "4", user: mockUsers[3], content: "Literally same. Mine lasted 2 days.", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
      { id: "c3", postId: "fp4", userId: "3", user: mockUsers[2], content: "I'll send you the one that finally worked for me", createdAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000) },
    ],
    visibleToGroups: ["group1"],
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
  },
  {
    id: "fp5",
    userId: "3",
    user: mockUsers[2],
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop",
    caption: "Sunday brunch situation",
    likes: 0,
    likedByUser: false,
    comments: [],
    visibleToGroups: ["group1", "group3"],
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
  {
    id: "fp6",
    userId: "4",
    user: mockUsers[3],
    type: "text",
    caption: "Reminder: Book club is moved to Wednesday this week because of the holiday. Same time, same place. We're finishing the last 3 chapters.",
    likes: 0,
    likedByUser: false,
    comments: [],
    visibleToGroups: ["group2"],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "fp7",
    userId: "2",
    user: mockUsers[1],
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    caption: "Couldn't believe this was real life",
    likes: 0,
    likedByUser: false,
    comments: [
      { id: "c4", postId: "fp7", userId: "4", user: mockUsers[3], content: "This looks like a painting", createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000) },
    ],
    visibleToGroups: ["group1"],
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
  },
  {
    id: "fp8",
    userId: "3",
    user: mockUsers[2],
    type: "text",
    caption: "Lost my keys somewhere between the coffee shop on Main and the parking garage. Silver keychain with a little cactus on it. Let me know if you spot them!",
    likes: 0,
    likedByUser: false,
    comments: [],
    visibleToGroups: ["group1", "group3"],
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
  },
];

export default function FeedPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: wonkyColors.coral }}
    >
      <MobileTopBar />

      <div className="pb-24 pt-2 px-3 space-y-4">
        {feedPosts.map((post) => (
          <MobilePostCard key={post.id} post={post} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
