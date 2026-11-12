import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const studies = {
  "the-new-lagos": {
    number: "01", title: "The New Lagos", category: "CITY / CULTURE FILM",
    line: "A city in motion. A thousand stories in every direction.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2000&q=88",
    brief: "An editorial concept exploring the pace, texture and restless creativity of Lagos after dark.",
    approach: "Build a sense of place through layered city details, human presence, movement and the contrast between warm street light and the cool evening skyline.",
    frames: ["Place and atmosphere", "People and movement", "Light after dark"],
  },
  "made-of-more": {
    number: "02", title: "Made of More", category: "FASHION / BRAND STORY",
    line: "Personal style as a language of confidence.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=88",
    brief: "A fashion-film direction study celebrating contemporary African style, self-expression and considered details.",
    approach: "Use strong silhouettes, tactile close-ups and unhurried portrait moments to give the subject room to own the frame.",
    frames: ["Character-led portraiture", "Texture and styling", "Editorial movement"],
  },
  "a-seat-at-the-table": {
    number: "03", title: "A Seat at the Table", category: "PEOPLE / DOCUMENTARY",
    line: "The most compelling stories begin with listening.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=2000&q=88",
    brief: "A portrait-led documentary concept about identity, belonging and the conversations that shape community.",
    approach: "Keep the visual language intimate and respectful: natural light, patient framing and details that reveal personality without forcing a performance.",
    frames: ["An honest introduction", "The conversation", "Portraits with presence"],
  },
  "golden-hour": {
    number: "04", title: "Golden Hour", category: "LIFESTYLE / CAMPAIGN",
    line: "A fleeting moment, held in the light.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=88",
    brief: "A lifestyle campaign study built around natural light, movement and the quiet confidence of a strong image.",
    approach: "Let the changing light do the storytelling, balancing composed frames with candid movement and a warm, tactile finish.",
    frames: ["Golden light", "Movement in the frame", "A final portrait"],
  },
  "the-gathering": {
    number: "05", title: "The Gathering", category: "EVENT / CULTURE",
    line: "The energy is in the moments between the moments.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2000&q=88",
    brief: "An event-film concept focused on atmosphere, collective energy and the small interactions that make a gathering memorable.",
    approach: "Move between wide establishing shots and close, human details so the final film feels lived-in rather than simply documented.",
    frames: ["The room comes alive", "People and connection", "The feeling that remains"],
  },
  "quiet-confidence": {
    number: "06", title: "Quiet Confidence", category: "PORTRAIT / EDITORIAL",
    line: "Character, without the noise.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=2000&q=88",
    brief: "A portrait editorial direction study that explores restraint, expression and the power of a considered frame.",
    approach: "A minimal set, deliberate light and subtle direction keep the focus on expression, presence and character.",
    frames: ["The first impression", "A closer look", "The still moment"],
  },
};

type StudySlug = keyof typeof studies;

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export default async function StudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  if (!study) notFound();

  return <>
    <section className="study-hero">
      <div className="study-hero-image" style={{ backgroundImage: `linear-gradient(90deg,rgba(5,5,5,.78),rgba(5,5,5,.12)),url(${study.image})` }} />
      <div className="study-hero-content">
        <Link href="/work" className="study-back"><ArrowLeft size={14}/> BACK TO SELECTED STORIES</Link>
        <p className="eyebrow">VISUAL STUDY / {study.number}</p>
        <h1>{study.title.split(" ").slice(0, -1).join(" ")} <em>{study.title.split(" ").slice(-1)}</em></h1>
        <p>{study.line}</p>
        <span className="study-category">{study.category} · CONCEPT DIRECTION</span>
      </div>
    </section>
    <section className="study-body section-pad">
      <div className="study-body-kicker"><span>THE IDEA</span><span>REELSBYTEMI / VISUAL STUDIES</span></div>
      <div className="study-copy-grid">
        <h2>Every frame<br/><em>has a reason.</em></h2>
        <div><p className="eyebrow">THE BRIEF</p><p>{study.brief}</p><p className="eyebrow study-approach-label">THE APPROACH</p><p>{study.approach}</p></div>
      </div>
      <div className="study-frame-list">{study.frames.map((frame, index) => <div key={frame}><span>0{index + 1}</span><strong>{frame}</strong><ArrowUpRight size={17}/></div>)}</div>
      <p className="study-disclaimer">This is a fictional art-direction study created to demonstrate the studio’s visual approach. It is not a commissioned client project.</p>
      <div className="study-next"><div><p className="eyebrow">HAVE A STORY IN MIND?</p><h2>Let’s make it<br/><em>mean something.</em></h2></div><Link href="/contact" className="text-link">START A CONVERSATION <ArrowUpRight size={15}/></Link></div>
    </section>
  </>;
}
