import type { Metadata } from "next";
import "./globals.css"

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
      <body className="bg-neutral-200">
        {children}
      </body>
    </html>
  );
}
