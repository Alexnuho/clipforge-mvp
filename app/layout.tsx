import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClipForge",
  description: "AI Video Clipper for Viral Shorts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_25%),linear-gradient(to_bottom,#050505,#0a0a0a)]" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                C
              </div>
              <div>
                <p className="text-base font-semibold text-white">ClipForge</p>
                <p className="text-xs text-white/45">AI Repurposing Studio</p>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                Home
              </Link>
              <Link
                href="/results"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                Results
              </Link>
              <Link
                href="/history"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                History
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}