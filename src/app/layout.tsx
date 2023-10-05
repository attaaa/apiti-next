import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apiti",
  description: "Money management app, by devatta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex h-screen w-screen select-none items-center justify-center bg-neutral-50 ${inter.className}`}
      >
        {/* frame */}
        <div className="relative h-full max-h-[844px] w-full max-w-[400px] overflow-hidden rounded-[40px] border-[11px] border-slate-700 bg-light">
          {/* app bar */}
          <div className="flex h-7 w-full items-center justify-center bg-light">
            <div className="island h-4 w-16 rounded-lg bg-slate-700"></div>
          </div>
          <div className="relative h-[calc(100%-1.75rem)] overflow-hidden bg-light">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
