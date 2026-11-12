"use client";
import { useState, type FormEvent } from "react";
import { Copy, Check } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Project enquiry — ReelsbyTemi",
      "",
      "Name: " + form.get("name"),
      "Email: " + form.get("email"),
      "Project type: " + form.get("type"),
      "",
      String(form.get("message")),
    ].join("\n");
    const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (recipient) {
      const subject = encodeURIComponent("Project enquiry — ReelsbyTemi");
      window.location.href = "mailto:" + recipient + "?subject=" + subject + "&body=" + encodeURIComponent(message);
      setNotice("Your email app should open with your enquiry prepared.");
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setNotice("Your enquiry has been copied. The studio email destination still needs to be configured.");
    } catch {
      setNotice("Your enquiry is ready, but clipboard access is unavailable. Please copy the text from the form before leaving.");
    }
  }

  return (
    <>
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
            <select name="type">
              <option>Film / video production</option><option>Brand campaign</option><option>Event coverage</option><option>Photography</option><option>Something else</option>
            </select>
          </label>
          <label>Tell us about the project<textarea required name="message" rows={5} placeholder="A few details about your idea, timeline and goals..."/></label>
          <button type="submit">PREPARE ENQUIRY <span aria-hidden="true">↗</span></button>
          {notice && <p className="form-notice" role="status">{copied ? <Check size={15}/> : <Copy size={15}/>} {notice}</p>}
          <small>We don’t store form submissions. The studio’s preferred contact email can be connected before launch.</small>
        </form>
      </section>
    </>
  );
}
