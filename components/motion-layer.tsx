"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionLayer() {
  const pathname = usePathname();
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = [
      ".inner-hero > *",
      ".intro-grid > *",
      ".founder-grid > *",
      ".about-founder > *",
      ".work-heading > *",
      ".project-card",
      ".portfolio-card",
      ".services-heading > *",
      ".service-accordion-item",
      ".service-detail",
      ".client-collab-card",
      ".study-hero-content > *",
      ".study-copy-grid > *",
      ".study-frame-list > div",
      ".study-next > *",
      ".inner-content > *",
      ".gallery-cta > *",
      ".contact-form > *",
      ".statement > *",
      ".contact-strip > *",
      ".footer-top > *"
    ].join(",");

    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealTargets));
    targets.forEach((element, index) => {
      element.classList.add("motion-reveal");
      const siblings = element.parentElement ? Array.from(element.parentElement.querySelectorAll(":scope > .motion-reveal")) : [];
      const siblingIndex = siblings.indexOf(element);
      element.style.setProperty("--motion-delay", `${Math.min(siblingIndex, 5) * 85}ms`);
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
      targets.forEach((element) => observer.observe(element));
      document.querySelectorAll<HTMLElement>(".hero-cinematic .hero-center > *").forEach((element, index) => {
        element.style.setProperty("--hero-stagger", `${index * 130}ms`);
        element.classList.add("hero-line-reveal");
      });
      document.querySelectorAll<HTMLElement>(".hero-cinematic .hero-meta > *, .hero-cinematic .hero-bottom > *").forEach((element, index) => {
        element.style.setProperty("--hero-stagger", `${180 + index * 100}ms`);
        element.classList.add("hero-line-reveal");
      });
    } else {
      targets.forEach((element) => element.classList.add("motion-in"));
    }

    let frame = 0;
    const progress = document.querySelector<HTMLElement>(".scroll-progress-fill");
    const backdrop = document.querySelector<HTMLElement>(".hero-backdrop");
    const updateScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
        if (progress) progress.style.transform = `scaleX(${amount})`;
        if (backdrop && !reduceMotion) {
          backdrop.style.setProperty("--hero-parallax-y", `${Math.min(window.scrollY * 0.14, 110)}px`);
        }
      });
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card, .portfolio-card, .client-collab-card"));
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    if (pointerFine && !reduceMotion) {
      cards.forEach((card) => {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty("--card-tilt-x", `${(-y * 1.8).toFixed(2)}deg`);
          card.style.setProperty("--card-tilt-y", `${(x * 1.8).toFixed(2)}deg`);
        };
        const onLeave = () => {
          card.style.setProperty("--card-tilt-x", "0deg");
          card.style.setProperty("--card-tilt-y", "0deg");
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (frame) window.cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress-fill" /></div>;
}
