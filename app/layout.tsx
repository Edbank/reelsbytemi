import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
export const metadata: Metadata = { title: "ReelsbyTemi — Visual stories, thoughtfully told.", description: "A Lagos-based visual storytelling and film production studio creating thoughtful films, imagery and brand experiences.", metadataBase: new URL("https://reelsbytemi.com"), openGraph: { title: "ReelsbyTemi", description: "Visual stories, thoughtfully told.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>; }
