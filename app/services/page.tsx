import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  { number: "01", title: "Film & video production", intro: "From the first conversation to the final cut.", detail: "Concept development, pre-production, filming and post-production shaped around the story and the people in it.", deliverables: "Creative development · Production · Editing" },
  { number: "02", title: "Brand films & campaigns", intro: "A visual language people can recognise and remember.", detail: "Story-led campaign films and visual assets that give brands a point of view beyond the product.", deliverables: "Brand storytelling · Campaign films · Social cutdowns" },
  { number: "03", title: "Event films", intro: "More than coverage. The feeling of being there.", detail: "Thoughtful event documentation that captures atmosphere, people, key moments and the energy in between.", deliverables: "Event highlights · Recap films · Photography" },
  { number: "04", title: "Photography", intro: "Still frames with feeling, character and clarity.", detail: "Portrait, lifestyle, event and editorial photography with a considered approach to light and composition.", deliverables: "Portraits · Lifestyle · Editorial · Events" },
  { number: "05", title: "Creative direction", intro: "A clear point of view before the camera rolls.", detail: "Visual research, references, mood and narrative direction to bring a consistent idea to life across formats.", deliverables: "Visual research · Art direction · Story development" },
];

export default function Services() {
  return <>
    <section className="inner-hero">
      <p className="eyebrow">WHAT WE BRING TO THE TABLE</p>
      <h1>Ideas into<br/><em>images.</em></h1>
      <p>Flexible creative production for stories that deserve attention, care and a clear point of view.</p>
    </section>
    <section className="service-detail-list section-pad">
      <div className="section-kicker"><span>OUR CAPABILITIES</span><span>FROM FIRST THOUGHT TO FINAL FRAME</span></div>
      {services.map((service) => <article className="service-detail" key={service.number}>
        <span className="service-detail-number">{service.number}</span>
        <div className="service-detail-main"><h2>{service.title}</h2><h3>{service.intro}</h3><p>{service.detail}</p><span>{service.deliverables}</span></div>
        <ArrowUpRight className="service-detail-arrow" size={20}/>
      </article>)}
      <div className="service-bottom-note"><p>Every project is different. We shape the right team, process and production approach around the story, its audience and its goals.</p><Link href="/contact" className="text-link">TALK THROUGH YOUR BRIEF <ArrowUpRight size={15}/></Link></div>
    </section>
  </>;
}