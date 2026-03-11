import Link from "next/link";
import "./globals.css";

export const metadata = {
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
      <body className="bg-black text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-blue-400">
              ClipForge
            </Link>

            <nav className="flex items-center gap-3">
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