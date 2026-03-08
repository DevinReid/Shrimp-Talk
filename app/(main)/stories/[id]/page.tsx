"use client";

import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import StoryViewer from "@/components/feed/StoryViewer";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
import { mockStories } from "@/lib/mockData";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.id as string;

  const story = mockStories.find((s) => s.id === storyId);

  if (!story) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: wonkyColors.coral }}>
          <div
            className="p-6 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              borderRadius: wonkyCardRadius,
              border: `2.5px solid ${wonkyColors.black}`,
            }}
          >
            <p className="text-lg font-bold" style={{ color: wonkyColors.pink }}>
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
