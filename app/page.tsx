import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6">
        <div className="mb-4">
          <span className="text-7xl">🦐</span>
        </div>
        <h1 className="text-6xl font-bold shrimp-gradient-text">
          Welcome to Shrimp Talk
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#ff5252' }}>
          Just you and your shrimp
        </p>
        <div className="flex gap-4 justify-center mt-10">
          <Link
            href="/feed"
            className="shrimp-gradient hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Go to Feed 🦐
          </Link>
          <Link
            href="/messages"
            className="border-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-lg hover:opacity-90"
            style={{ backgroundColor: 'white', borderColor: '#ffb3b3', color: '#ff6b6b' }}
          >
            Messages 💬
          </Link>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
          <div className="backdrop-blur-sm p-6 rounded-xl border-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: '#ffd4d4' }}>
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold mb-2" style={{ color: '#ff5252' }}>You're in Control</h3>
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              Toggle your feed on or off. See only what you want, when you want.
            </p>
          </div>
          <div className="backdrop-blur-sm p-6 rounded-xl border-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: '#ffd4d4' }}>
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-bold mb-2" style={{ color: '#ff5252' }}>Friend Groups</h3>
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              Create multiple groups and share with exactly who you want.
            </p>
          </div>
          <div className="backdrop-blur-sm p-6 rounded-xl border-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: '#ffd4d4' }}>
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold mb-2" style={{ color: '#ff5252' }}>Real-time Chat</h3>
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              Instant messaging with your friends, no algorithms getting in the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

