"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type Goal = "book-meeting" | "get-reply" | "share-resource";
type Tone = "formal" | "casual" | "direct";

interface Template {
  label: string;
  subject: string;
  body: string;
}

const goalLabels: Record<Goal, string> = {
  "book-meeting": "Book a Meeting",
  "get-reply": "Get a Reply",
  "share-resource": "Share a Resource",
};

const toneLabels: Record<Tone, string> = {
  formal: "Formal",
  casual: "Casual",
  direct: "Direct",
};

/* ------------------------------------------------------------------ */
/*  Template generation                                                */
/* ------------------------------------------------------------------ */

function generateTemplates(
  product: string,
  audience: string,
  goal: Goal,
  tone: Tone
): Template[] {
  const p = product.trim() || "our solution";
  const a = audience.trim() || "your team";

  const templates: Record<Goal, Record<Tone, Template[]>> = {
    "book-meeting": {
      formal: [
        {
          label: "Initial Outreach",
          subject: `Quick question about ${a}'s workflow`,
          body: `Hi {{First Name}},\n\nI noticed ${a} teams often struggle with scaling outbound efficiently. ${p} helps companies like yours automate the heavy lifting — saving 10+ hours per week.\n\nWould you be open to a 15-minute call this week to see if it's a fit?\n\nBest regards`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Quick question about ${a}'s workflow`,
          body: `Hi {{First Name}},\n\nJust following up on my last note. I know your inbox is busy.\n\nWe recently helped a similar ${a} team cut their setup time by 80% with ${p}. Happy to share specifics on a quick call.\n\nWorth 15 minutes?`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Should I close the loop?`,
          body: `Hi {{First Name}},\n\nI don't want to be a pest — just want to make sure this didn't slip through the cracks.\n\nIf now isn't the right time, no worries. But if scaling outbound is still a priority, I'd love to show you what ${p} can do.\n\nEither way, appreciate your time.`,
        },
      ],
      casual: [
        {
          label: "Initial Outreach",
          subject: `Thought this might help ${a}`,
          body: `Hey {{First Name}},\n\nSaw you're working with ${a} — really cool stuff. We built ${p} specifically for teams like yours who need to scale outbound without the headache.\n\nAny chance you'd be up for a quick 15-min chat this week? No pressure at all.`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Thought this might help ${a}`,
          body: `Hey {{First Name}},\n\nJust bumping this up — I know things get buried.\n\nQuick version: ${p} saves ${a} teams hours of manual work every week. Would love to show you how.\n\n15 minutes — what do you think?`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Last one from me 🙂`,
          body: `Hey {{First Name}},\n\nLast follow-up, promise! If the timing's off, totally get it.\n\nBut if scaling outbound is on your radar, ${p} is worth a look. Happy to chat whenever works for you.\n\nCheers!`,
        },
      ],
      direct: [
        {
          label: "Initial Outreach",
          subject: `${p} for ${a}`,
          body: `{{First Name}},\n\n${p} helps ${a} teams send more outbound in less time — automated domains, mailboxes, and DNS in minutes.\n\nAre you free for 15 minutes this week? I'll show you exactly how it works.`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: ${p} for ${a}`,
          body: `{{First Name}},\n\nFollowing up. Quick stats: our clients in the ${a} space see 3x more replies after switching to ${p}.\n\n15-minute demo — interested?`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Closing the loop`,
          body: `{{First Name}},\n\nLast touch. If scaling cold email isn't a priority right now, I'll step back.\n\nIf it is — ${p} is the fastest way to get there. Let me know either way.`,
        },
      ],
    },
    "get-reply": {
      formal: [
        {
          label: "Initial Outreach",
          subject: `Question about ${a}'s outbound strategy`,
          body: `Hi {{First Name}},\n\nI work with ${a} teams who want better cold email results. ${p} automates infrastructure so your team can focus on what matters — writing great emails.\n\nI have a quick question: what's your biggest bottleneck with outbound right now?\n\nLooking forward to hearing from you.`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Question about ${a}'s outbound strategy`,
          body: `Hi {{First Name}},\n\nJust checking in on my previous message. I'd genuinely like to understand the challenges ${a} teams face with cold email delivery.\n\nEven a one-line reply would be incredibly helpful.\n\nThank you for your time.`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `One last thought`,
          body: `Hi {{First Name}},\n\nI'll keep this brief. If outbound delivery is something you're actively working on, I'd love to share how ${p} approaches it differently.\n\nIf not, no hard feelings at all. Wishing you and the team all the best.`,
        },
      ],
      casual: [
        {
          label: "Initial Outreach",
          subject: `Quick question for you`,
          body: `Hey {{First Name}},\n\nCurious — what's the biggest pain point for ${a} teams when it comes to cold email delivery?\n\nWe built ${p} to solve exactly that. Would love to hear your take.\n\nNo pitch, just genuinely interested.`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Quick question for you`,
          body: `Hey {{First Name}},\n\nNot trying to spam you — just really curious about your experience. A lot of ${a} folks tell us deliverability is their #1 headache.\n\nIs that true for you too? Even a quick "yes" or "no" works!`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Last ping 👋`,
          body: `Hey {{First Name}},\n\nAlright, last one! If cold email infra isn't on your mind right now, I'll leave you be.\n\nBut if it is — ${p} might surprise you. Just hit reply if you want to chat.\n\nHave a great week!`,
        },
      ],
      direct: [
        {
          label: "Initial Outreach",
          subject: `Cold email deliverability for ${a}`,
          body: `{{First Name}},\n\nMost ${a} teams lose 30-50% of emails to spam. ${p} fixes that with automated infrastructure and dedicated IPs.\n\nIs deliverability a problem you're solving right now?`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Cold email deliverability for ${a}`,
          body: `{{First Name}},\n\nFollowing up. One question: are you happy with your current inbox placement rate?\n\nIf not, ${p} guarantees 99%. Happy to share details.`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Yes or no?`,
          body: `{{First Name}},\n\nSimple question: is cold email infrastructure worth a conversation?\n\nYes → I'll send over some specifics about ${p}.\nNo → I'll stop reaching out.\n\nEither way works.`,
        },
      ],
    },
    "share-resource": {
      formal: [
        {
          label: "Initial Outreach",
          subject: `Resource for ${a}: cold email infrastructure guide`,
          body: `Hi {{First Name}},\n\nI put together a guide on cold email infrastructure best practices — covering domains, DNS, warmup, and deliverability.\n\nGiven your work with ${a}, I think you'd find it valuable. The guide draws on data from ${p}'s platform.\n\nWould you like me to send it over?`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Resource for ${a}: cold email infrastructure guide`,
          body: `Hi {{First Name}},\n\nJust following up on the cold email guide I mentioned. It covers the exact setup ${a} teams need for high deliverability.\n\nHappy to share it — just let me know and I'll send the link.\n\nBest regards`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `The guide (if you still want it)`,
          body: `Hi {{First Name}},\n\nLast follow-up on this. The cold email infrastructure guide has helped dozens of ${a} teams improve their delivery rates.\n\nIf you'd like it, just reply "send it" and I'll get it to you right away. Built on lessons from ${p}.`,
        },
      ],
      casual: [
        {
          label: "Initial Outreach",
          subject: `Free guide for ${a} teams`,
          body: `Hey {{First Name}},\n\nWe just published a no-fluff guide on cold email infrastructure — the exact setup that gets 99% inbox rates.\n\nBased on what ${p} does for ${a} teams daily. Figured you might dig it.\n\nWant me to send the link?`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Free guide for ${a} teams`,
          body: `Hey {{First Name}},\n\nQuick bump — the cold email infra guide is getting great feedback from ${a} folks.\n\nCovers domains, DNS, warmup, the works. Just say the word and I'll share it!`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Sharing this one last time`,
          body: `Hey {{First Name}},\n\nLast mention of the guide, promise 😄\n\nIf cold email delivery matters to your ${a} team, this is the resource. Built from ${p}'s playbook.\n\nReply "yes" and it's yours. If not, no worries at all!`,
        },
      ],
      direct: [
        {
          label: "Initial Outreach",
          subject: `Cold email setup guide for ${a}`,
          body: `{{First Name}},\n\nBuilt a guide on cold email infrastructure — domains, DNS, IPs, warmup. Everything ${a} teams need.\n\nBased on ${p}'s platform data. Want it?`,
        },
        {
          label: "Follow-up #1 (3 days later)",
          subject: `Re: Cold email setup guide for ${a}`,
          body: `{{First Name}},\n\nThe guide covers the full stack: domain setup, SPF/DKIM/DMARC, mailbox config, and warmup schedules.\n\n${a} teams are finding it useful. Reply "send" if you want it.`,
        },
        {
          label: "Follow-up #2 (7 days later)",
          subject: `Last chance for the guide`,
          body: `{{First Name}},\n\nFinal follow-up on the cold email infra guide from ${p}.\n\nReply "yes" → I send it.\nNo reply → I'll assume the timing's off.\n\nSimple as that.`,
        },
      ],
    },
  };

  return templates[goal][tone];
}

/* ------------------------------------------------------------------ */
/*  Tips                                                                */
/* ------------------------------------------------------------------ */

const tips = [
  "Keep every email under 100 words. Shorter emails get 2x more replies.",
  "Personalize the first line — reference the recipient's company, role, or recent activity.",
  "One CTA per email. Don't give them multiple things to do.",
  "Space follow-ups 3-5 days apart. Persistence beats volume.",
  "Ask a question instead of making a statement. Questions drive replies.",
  "Avoid spam triggers: 'free', 'guaranteed', 'act now', ALL CAPS, and excessive exclamation marks.",
  "Use a conversational tone — write like you're emailing a colleague, not a stranger.",
  "Test your emails across multiple providers before launching a campaign.",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "How many follow-ups should I send?",
    a: "Research shows that 80% of deals require at least 5 follow-ups. We recommend a minimum sequence of 3 emails (initial + 2 follow-ups), but 5-7 touch-points across email and other channels typically yield the best results.",
  },
  {
    q: "What makes a good cold email?",
    a: "A good cold email is short (under 100 words), personalized (mentions something specific to the recipient), has a clear single CTA, and provides value rather than just pitching. The best cold emails feel like they were written by a human, not a template.",
  },
  {
    q: "Should I use HTML or plain text?",
    a: "Plain text consistently outperforms HTML in cold email. HTML emails with images, links, and formatting trigger spam filters more often. Use plain text with minimal formatting — it feels more personal and delivers better.",
  },
  {
    q: "How do I avoid the spam folder?",
    a: "Use proper email authentication (SPF, DKIM, DMARC), warm up your mailboxes gradually, keep volume under 50 emails per day per mailbox, personalize every email, and avoid spam trigger words. ColdRelay handles all of this automatically.",
  },
  {
    q: "What's the best time to send cold emails?",
    a: "Tuesday through Thursday, between 8-10 AM in the recipient's timezone, tend to get the highest open and reply rates. Avoid Mondays (inbox overload) and Fridays (weekend mindset).",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function ColdEmailTemplateGeneratorPage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState<Goal>("book-meeting");
  const [tone, setTone] = useState<Tone>("direct");
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!product.trim() && !audience.trim()) return;
    setTemplates(generateTemplates(product, audience, goal, tone));
  };

  const copyTemplate = (idx: number) => {
    if (!templates) return;
    const t = templates[idx];
    const text = `Subject: ${t.subject}\n\n${t.body}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cold Email Template Generator",
            url: "https://coldrelay.com/tools/cold-email-template-generator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4A73D5]/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors mb-6"
          >
            ← All Tools
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6 ml-3">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">
              Free Tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            Cold Email Template Generator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Generate proven cold email sequences in seconds. Get an initial outreach email plus two
            follow-ups — customized for your product, audience, and goals.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            {/* Product */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Your Product / Service
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. ColdRelay, email infrastructure platform"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
            </div>

            {/* Audience */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. B2B SaaS, sales teams, agencies"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
            </div>

            {/* Goal */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-3">Email Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(goalLabels) as Goal[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      goal === g
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {goalLabels[g]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/70 mb-3">Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(toneLabels) as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      tone === t
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {toneLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate */}
            <button
              onClick={handleGenerate}
              disabled={!product.trim() && !audience.trim()}
              className="w-full rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
            >
              Generate Email Sequence
            </button>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {templates && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-6"
              >
                {templates.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#4A73D5]/10 flex items-center justify-center text-sm font-bold text-[#6B8FE6]">
                          {i + 1}
                        </span>
                        <h3 className="text-base font-semibold text-white">{t.label}</h3>
                      </div>
                      <button
                        onClick={() => copyTemplate(i)}
                        className="rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-all"
                      >
                        {copiedIdx === i ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-white/40 mb-1 font-medium">Subject Line</p>
                      <p className="text-sm text-[#6B8FE6] font-medium">{t.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1 font-medium">Email Body</p>
                      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
                        {t.body}
                      </p>
                    </div>
                    <p className="mt-3 text-xs text-white/30">
                      {t.body.split(/\s+/).length} words
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Cold Email Copywriting Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="text-[#6B8FE6] text-sm font-bold mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-white/60 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Great Emails Need Great Infrastructure
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              The best cold email templates won&apos;t help if they land in spam. ColdRelay gives you
              domains, mailboxes, DNS, and dedicated IPs — all automated. 99% inbox placement
              guaranteed.
            </p>
            <a
              href="https://app.coldrelay.com/auth/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 hover:brightness-110 transition-all uppercase tracking-wide"
            >
              Get Started Free →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
