"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";

export function HomeHero() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  useEffect(() => {
    if (!showreelOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setShowreelOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showreelOpen]);

  return <>
    <section className="hero hero-cinematic">
      <div className="hero-backdrop" aria-hidden="true"/>
      <div className="hero-grain"/>
      <div className="hero-meta"><span>INDEPENDENT CREATIVE PRODUCTION</span><span>LAGOS, NG · AVAILABLE WORLDWIDE</span></div>
      <div className="hero-center">
        <p className="eyebrow">FILM · CREATE · INSPIRE</p>
        <h1>Stories live<br/>in the <em>details.</em></h1>
        <p className="hero-copy">ReelsbyTemi is a creative production studio<br/>that turns ideas into powerful visual stories.</p>
        <div className="hero-actions">
          <Link href="/work" className="hero-primary-link">Explore Our Work <ArrowRight size={18}/></Link>
          <button type="button" className="hero-showreel-button" onClick={() => setShowreelOpen(true)} aria-haspopup="dialog">
            <span className="play-circle"><Play size={15} fill="currentColor"/></span> Watch Showreel
          </button>
        </div>
      </div>
      <div className="hero-bottom"><span>01 — 03 <i className="hero-progress"><b/></i></span><a href="#approach">SCROLL TO EXPLORE <ArrowDown size={13}/></a></div>
    </section>
    {showreelOpen && <div className="showreel-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowreelOpen(false); }}>
      <section className="showreel-dialog" role="dialog" aria-modal="true" aria-labelledby="showreel-title">
        <button type="button" className="showreel-close" onClick={() => setShowreelOpen(false)} aria-label="Close showreel panel"><X size={20}/></button>
        <span className="eyebrow">REELSBYTEMI · SHOWREEL</span>
        <div className="showreel-mark"><Play size={25} fill="currentColor"/></div>
        <h2 id="showreel-title">A reel worth<br/><em>waiting for.</em></h2>
        <p>Our studio showreel is being prepared. Explore the visual direction and selected studies while we get the real footage ready.</p>
        <Link href="/work" className="text-link" onClick={() => setShowreelOpen(false)}>EXPLORE SELECTED WORK <ArrowUpRight size={15}/></Link>
      </section>
    </div>}
  </>;
}
