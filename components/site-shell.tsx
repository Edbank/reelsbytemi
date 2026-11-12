"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Sun, Moon, Instagram } from "lucide-react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Collaborate" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const saved = window.localStorage.getItem("rt-theme");
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(.hero)"));
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    sections.forEach((section) => section.classList.add("reveal-section"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("rt-theme", next);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="ReelsbyTemi home">
          <img src="/rt-monogram.svg" alt="" />
          <span>REELSBYTEMI<small>VISUAL STORYTELLING</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link className="header-cta" href="/contact">Let’s talk <ArrowUpRight size={14}/></Link>
        </div>
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X/> : <Menu/>}
        </button>
      </header>
      <main id="main-content" tabIndex={-1} aria-label="Page content">{children}</main>
      <footer className="footer">
        <div className="footer-top">
          <div><p className="eyebrow">HAVE A STORY TO TELL?</p><h2>Let’s make<br/><em>something lasting.</em></h2></div>
          <Link className="round-link" href="/contact" aria-label="Contact ReelsbyTemi"><ArrowUpRight size={28}/></Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} REELSBYTEMI</span>
          <span>LAGOS, NIGERIA · AVAILABLE WORLDWIDE</span>
          <a href="https://www.instagram.com/reelsby_temi/" target="_blank" rel="noreferrer" aria-label="ReelsbyTemi on Instagram"><Instagram size={12}/> INSTAGRAM</a><span>VISUAL STORIES, THOUGHTFULLY TOLD.</span>
        </div>
      </footer>
      {open && (
        <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
          <p className="eyebrow">EXPLORE REELSBYTEMI</p>
          {links.map((link, index) => (
            <Link onClick={() => setOpen(false)} key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              <span>0{index + 1}</span>{link.label}<ArrowUpRight/>
            </Link>
          ))}
          <button className="mobile-theme" onClick={toggleTheme}>{theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>} Switch to {theme === "dark" ? "light" : "dark"} theme</button>
        </nav>
      )}
    </>
  );
}
