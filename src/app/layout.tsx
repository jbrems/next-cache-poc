import type { Metadata } from "next";
import "./globals.css"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next Cache POC",
  description: "Proof of concept project for using caching in Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-neutral-300 flex flex-col items-center gap-2">
        <h1 className="text-5xl text-yellow-600">Next cache POCemon</h1>
        <ul className="flex gap-32 *:text-xl *:border-b">
          <li><Link href="/">Favorites</Link></li>
          <li><Link href="/stats">Stats</Link></li>
          <li><Link href="/types">Types</Link></li>
        </ul>
        {children}
      </body>
    </html>
  );
}
