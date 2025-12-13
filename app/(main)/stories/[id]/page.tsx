"use client";

import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import StoryViewer from "@/components/feed/StoryViewer";
import { mockStories } from "@/lib/mockData";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.id as string;

  const story = mockStories.find((s) => s.id === storyId);

  if (!story) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-sm p-8 rounded-xl border-2 shadow-lg text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <p className="text-xl" style={{ color: '#ff5252' }}>
              Story not found 🦐
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <StoryViewer
        story={story}
        onClose={() => router.push("/feed")}
      />
    </ProtectedRoute>
  );
}

