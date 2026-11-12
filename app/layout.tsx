import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "ReelsbyTemi — Visual stories, thoughtfully told.", template: "%s — ReelsbyTemi" },
  description: "ReelsbyTemi is a visual storytelling studio in Lagos, Nigeria, creating thoughtful films, photography and brand experiences.",
  openGraph: {
    title: "ReelsbyTemi — Visual stories, thoughtfully told.",
    description: "Thoughtful films and visual experiences for people, places and ideas worth remembering.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
