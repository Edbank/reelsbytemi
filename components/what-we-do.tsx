"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

const services = [
  { number: "01", title: "Film & video production", intro: "From concept to final cut, stories shaped with intention.", detail: "We shape the full production journey — developing the idea, planning the shoot, capturing the story and crafting the final edit.", deliverables: "Concept development · Pre-production · Filming · Editing" },
  { number: "02", title: "Brand films & campaigns", intro: "Distinctive visual worlds for brands with something to say.", detail: "Story-led films and campaign assets that help people connect with a brand beyond what it sells.", deliverables: "Brand films · Campaign visuals · Social cutdowns" },
  { number: "03", title: "Event films", intro: "The energy, the details, the moments worth keeping.", detail: "We document the atmosphere and human moments that make an experience memorable, from the big moments to the in-between.", deliverables: "Event highlights · Recap films · Event photography" },
  { number: "04", title: "Photography", intro: "Still frames with feeling, character and clarity.", detail: "Portrait, lifestyle, event and editorial photography shaped around people, place, light and a clear visual point of view.", deliverables: "Portraits · Lifestyle · Editorial · Events" },
];

export function WhatWeDo() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section className="services-section section-pad" id="what-we-do">
      <div className="section-kicker"><span>04 / WHAT WE DO</span><span>CRAFT WITH INTENTION</span></div>
      <div className="services-layout">
        <div className="services-heading">
          <p className="eyebrow">OUR CAPABILITIES</p>
          <h2>From first<br/>thought to<br/><em>final frame.</em></h2>
          <p className="services-hint">Select a service to explore what goes into the work.</p>
        </div>
        <div className="service-list" aria-label="Explore our services">
          {services.map((service, index) => {
            const expanded = active === index;
            const panelId = `service-panel-${index}`;
            return (
              <article className={`service-row service-accordion-item ${expanded ? "is-open" : ""}`} key={service.number}>
                <span>{service.number}</span>
                <div className="service-accordion-content">
                  <button className="service-accordion-trigger" type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setActive(expanded ? null : index)}>
                    <span>{service.title}</span>
                    {expanded ? <Minus size={17} aria-hidden="true"/> : <Plus size={17} aria-hidden="true"/>}
                  </button>
                  <p className="service-intro">{service.intro}</p>
                  <div className="service-accordion-panel" id={panelId} hidden={!expanded}>
                    <p>{service.detail}</p>
                    <span className="service-deliverables">{service.deliverables}</span>
                    <Link href="/contact" className="service-enquire">ENQUIRE ABOUT THIS SERVICE <ArrowUpRight size={14}/></Link>
                  </div>
                </div>
              </article>
            );
          })}
          <Link href="/services" className="text-link">DISCOVER ALL SERVICES <ArrowUpRight size={15}/></Link>
        </div>
      </div>
    </section>
  );
}
