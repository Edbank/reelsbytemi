"use client";
import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";

export default function Contact() {
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setNotice("Enquiry copied. You can now paste it into your email.");
    } catch {
      setCopied(false);
      setNotice("Clipboard access is unavailable. Select and copy the enquiry text below.");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const message = [
      "Project enquiry — ReelsbyTemi", "",
      "Name: " + String(form.get("name") || ""),
      "Email: " + email,
      "Project type: " + String(form.get("type") || ""), "",
      String(form.get("message") || ""),
    ].join("\n");
    const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

    if (recipient) {
      window.location.href = "mailto:" + recipient + "?subject=" +
        encodeURIComponent("Project enquiry — ReelsbyTemi") + "&body=" + encodeURIComponent(message);
      setNotice("Your email app should open with the enquiry prepared. Please send it from there.");
      return;
    }
    setDraft(message);
    setCopied(false);
    setNotice("Your enquiry is prepared below. The studio email destination has not been configured yet.");
  }

  return <>
    <section className="inner-hero">
      <p className="eyebrow">START A CONVERSATION</p>
      <h1>What are you<br/><em>imagining?</em></h1>
      <p>Tell us a little about the story, the idea or the moment you want to bring to life.</p>
    </section>
    <section className="inner-content">
      <h2>Tell us about it.</h2>
      <form className="contact-form" onSubmit={submit}>
        <label>Your name<input required name="name" autoComplete="name" placeholder="How should we address you?"/></label>
        <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com"/></label>
        <label>What do you have in mind?
          <select name="type" defaultValue="Film / video production">
            <option>Film / video production</option><option>Brand campaign</option><option>Event coverage</option><option>Photography</option><option>Creative direction</option><option>Something else</option>
          </select>
        </label>
        <label>Tell us about the project<textarea required name="message" rows={5} placeholder="A few details about your idea, timeline and goals..."/></label>
        <button type="submit"><Send size={14}/> PREPARE ENQUIRY <span aria-hidden="true">↗</span></button>
      </form>
      {notice && <div className="form-result" role="status">
        <p>{copied ? <Check size={15}/> : <Mail size={15}/>} {notice}</p>
        {draft && <>
          <label className="draft-label" htmlFor="enquiry-draft">YOUR ENQUIRY</label>
          <textarea id="enquiry-draft" className="enquiry-draft" rows={9} readOnly value={draft}/>
          <button type="button" className="copy-enquiry" onClick={copyDraft}><Copy size={14}/> {copied ? "COPIED" : "COPY ENQUIRY"}</button>
        </>}
      </div>}
      <small className="contact-privacy-note">This form does not store or transmit your details. If a studio email is configured, it opens your email app; otherwise, you can copy the prepared enquiry.</small>
    </section>
  </>;
}
