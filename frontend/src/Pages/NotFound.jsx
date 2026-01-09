import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-200" />

      {/* Glass Card */}
      <div className="relative z-10 max-w-lg w-full mx-4 p-10 rounded-3xl 
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center">

        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>

        <p className="mt-4 text-xl font-semibold text-white">
          Page Not Found
        </p>

        <p className="mt-2 text-gray-400 text-sm">
          You either mistyped the URL or this page dipped without notice.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500
              text-black font-semibold hover:scale-105 transition-transform"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-white/20 text-white
              hover:bg-white/10 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
