import React, { useEffect, useMemo, useState } from "react";

// --- Color palette pulled from book cover ---
// Night sky navy: #0B1B2B
// Deep space blue: #0A2A5E
// Horizon glow: #00B3FF
// Sunrise blue: #A8D0FF
// Soft white: #F8FAFC

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1B2B] text-white">
      <SiteNav />
      <MainRouter />
      <SiteFooter />
    </div>
  );
}

// ---------------- NAV ----------------
function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0B1B2B]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00B3FF] to-[#A8D0FF] shadow-lg shadow-cyan-500/30" />
          <span className="font-semibold tracking-wide text-white group-hover:text-[#A8D0FF] transition">Insights from Beyond</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a className="hover:text-[#A8D0FF]" href="#/about">About</a>
          <a className="hover:text-[#A8D0FF]" href="#/contact">Contact</a>
          <a className="px-4 py-2 rounded-xl bg-[#00B3FF] hover:bg-[#36c7ff] text-[#0B1B2B] font-semibold shadow-lg" href="#/preorder">Pre‑order</a>
        </nav>
        <button className="md:hidden p-2 rounded-lg border border-white/10" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-3 flex flex-col gap-3">
            <a className="hover:text-[#A8D0FF]" href="#/about" onClick={() => setOpen(false)}>About</a>
            <a className="hover:text-[#A8D0FF]" href="#/contact" onClick={() => setOpen(false)}>Contact</a>
            <a className="px-4 py-2 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold shadow" href="#/preorder" onClick={() => setOpen(false)}>Pre‑order</a>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------------- ROUTER ----------------
function MainRouter() {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '#/');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (hash.startsWith('#/about')) return <AboutPage/>;
  if (hash.startsWith('#/contact')) return <ContactPage/>;
  if (hash.startsWith('#/preorder')) return <PreorderPage/>;
  return <HomePage/>;
}

// ---------------- PAGES ----------------
function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <InsideTheBook />
      <Endorsements />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A2A5E] via-[#0B1B2B] to-black"/>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[#A8D0FF] uppercase tracking-widest text-xs mb-3">Official Launch · September 26</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Insights from Beyond
          </h1>
          <p className="mt-5 text-white/90 leading-relaxed">
            A bridge between science and spirituality. In <span className="italic">Insights from Beyond</span>, Anaja Metellus explores near‑death experiences through scripture, research, and a profoundly personal journey.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#/preorder" className="px-5 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold shadow-lg">
              Pre‑order now
            </a>
            <a href="#about-blurb" className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30">Read description</a>
          </div>
          <div className="mt-8"><Countdown targetDate={new Date('2025-09-26T00:00:00-04:00')} /></div>
        </div>
        <div className="relative">
          {/* Book cover frame */}
          <div className="mx-auto w-72 md:w-80 aspect-[2/3] rounded-xl ring-2 ring-white/10 shadow-2xl shadow-cyan-500/20 bg-gradient-to-b from-black via-[#0A2A5E] to-[#00111f] flex items-center justify-center">
            {/* If you deploy, replace this placeholder with the real image src below */}
            <img src="/images/insights-from-beyond-book-cover.webp" alt="Insights from Beyond book cover" className="w-full h-full object-cover rounded-xl"/>
          </div>
          <div className="absolute -bottom-6 -left-6 h-24 w-24 blur-2xl bg-cyan-400/30 rounded-full"/>
          <div className="absolute -top-8 -right-10 h-24 w-24 blur-2xl bg-blue-300/20 rounded-full"/>
        </div>
      </div>
    </section>
  );
}

function Countdown({ targetDate }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetDate - now);
  const parts = useMemo(() => {
    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    return { days, hours, minutes, seconds };
  }, [diff]);
  return (
    <div className="grid grid-flow-col gap-4 text-center auto-cols-max">
      {Object.entries(parts).map(([k,v]) => (
        <div key={k} className="px-4 py-2 rounded-xl border border-white/10 bg-white/[.03]">
          <div className="text-2xl font-bold tabular-nums">{String(v).padStart(2,'0')}</div>
          <div className="text-xs uppercase tracking-widest text-white/70">{k}</div>
        </div>
      ))}
    </div>
  );
}

function ValueProps() {
  return (
    <section className="py-14 md:py-20" id="about-blurb">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">About the Book</h2>
        <p className="text-white/90 leading-relaxed">
          In <span className="italic">Insights from Beyond</span>, Anaja Metellus invites readers on a personal and spiritually rich journey born out of grief and a longing to see his long‑held beliefs come to life. After losing his grandmother and two young cousins, he found himself consumed by questions about mortality and the meaning of life. A late‑night YouTube search led him into the world of near‑death experiences (NDEs). These testimonies would go on to profoundly shift his understanding of life, death, and God.
        </p>
        <p className="text-white/90 leading-relaxed mt-4">
          Raised within Evangelical Christianity, Anaja began to see his inherited worldview through fresh eyes. NDEs didn’t pull him away from his faith—but they did prompt him to examine it objectively. With honesty and reverence, he explores foundational truths through biblical reflection and scientific research. Questions of origin, identity, purpose, and destiny unfold in ways that invite every reader to reconsider what they believe and why.
        </p>
        <p className="text-white/90 leading-relaxed mt-4">
          To Anaja, NDEs aren’t hallucinations but spiritual breadcrumbs—God’s way of whispering to us through the veil. In an age where religion can feel divisive or shallow, this book offers something deeper. Whether you’re a believer, seeker, or curious skeptic, you’re invited to explore the mystery. You may find that God isn’t offended by your search. In fact, He may have been waiting for you to begin it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/preorder" className="px-5 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold shadow">Pre‑order now</a>
          <a href="#/about" className="px-5 py-3 rounded-xl border border-white/15">About the author</a>
        </div>
      </div>
    </section>
  );
}

function InsideTheBook() {
  const bullets = [
    {
      title: "Where science meets spirit",
      text: "Clear, approachable summaries of peer‑reviewed research on NDEs and what they imply about consciousness."
    },
    {
      title: "An evangelical lens—widened",
      text: "Thoughtful engagement with scripture that invites curiosity without dogma."
    },
    {
      title: "Stories that transform",
      text: "Human accounts that move beyond argument into lived, compassionate change."
    },
    {
      title: "Practical hope",
      text: "Gentle prompts and reflections to help you live with more presence, courage, and love."
    }
  ];
  return (
    <section className="py-14 md:py-20 bg-[#081522]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Inside the Book</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bullets.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[.03]">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#00B3FF] to-[#A8D0FF] mb-4"/>
              <div className="font-semibold mb-2">{b.title}</div>
              <p className="text-white/80 text-sm leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Endorsements() {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Early Praise</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "A thoughtful bridge between rigorous research and living faith—warm, generous, and deeply humane.",
              name: "Advance Reader",
              title: ""
            },
            {
              quote: "Moves the conversation on NDEs beyond debate into transformation.",
              name: "Advance Reader",
              title: ""
            },
            {
              quote: "Written with honesty and reverence. It invites seekers without lecturing them.",
              name: "Advance Reader",
              title: ""
            }
          ].map((e, i) => (
            <figure key={i} className="p-6 rounded-2xl bg-white/[.03] border border-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#00B3FF"><path d="M7 7h4v10H5V9l2-2zm10 0h4v10h-6V9l2-2z"/></svg>
              <blockquote className="mt-3 text-white/90">{e.quote}</blockquote>
              <figcaption className="mt-4 text-sm text-white/70">— {e.name}{e.title && `, ${e.title}`}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#06101a] to-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[.03] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Be among the first to read it</h3>
            <p className="text-white/80 mt-1">Pre‑orders help the launch make a splash on release day.</p>
          </div>
          <div className="flex gap-3">
            <a href="#/preorder" className="px-5 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold shadow">Pre‑order now</a>
            <a href="#/contact" className="px-5 py-3 rounded-xl border border-white/15">Media & Speaking</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreorderPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Pre‑order</h1>
      <p className="mt-3 text-white/90">Reserve your copy ahead of the September 26 launch. Choose a retailer below, or leave your email and we’ll notify you the moment it goes live.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/[.03] border border-white/10">
          <div className="font-semibold">Retailers</div>
          <div className="mt-3 grid gap-3">
            <a href="#" className="px-4 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold text-center">Amazon (coming soon)</a>
            <a href="#" className="px-4 py-3 rounded-xl bg-[#A8D0FF] text-[#0B1B2B] font-semibold text-center">Barnes & Noble (coming soon)</a>
          </div>
          <p className="text-xs text-white/60 mt-3">Links will activate as soon as product pages are published.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[.03] border border-white/10">
          <div className="font-semibold">Email me when it’s live</div>
          <NotifyForm />
          <p className="text-xs text-white/60 mt-3">We’ll send a single launch‑day email—no spam, ever.</p>
        </div>
      </div>
    </main>
  );
}

function NotifyForm() {
  // --- Mailchimp embed (replace with your actual form action URL) ---
  // Find this in Mailchimp: Audience > Signup forms > Embedded forms.
  // Example format: https://YOUR_DC.list-manage.com/subscribe/post?u=XXXXXXX&id=YYYYYYY
  const MAILCHIMP_URL = "https://YOUR_DC.list-manage.com/subscribe/post?u=YOUR_U&id=YOUR_ID";
  return (
    <form className="mt-4" action={MAILCHIMP_URL} method="post" target="_blank" noValidate>
      {/* honeypot to reduce bots (Mailchimp expects this name) */}
      <div style={{position:'absolute', left:'-5000px'}} aria-hidden="true">
        <input type="text" name="b_YOUR_U_YOUR_ID" tabIndex={-1} defaultValue="" />
      </div>
      <div className="flex gap-3">
        <input name="EMAIL" required type="email" placeholder="you@example.com" className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#00B3FF]"/>
        <button className="px-5 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold" type="submit">Notify me</button>
      </div>
    </form>
  );
}

function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-14">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-3">About Anaja Metellus</h1>
          <p className="text-white/90 leading-relaxed">
            Anaja Metellus is a husband, father of 2 boys, software engineer, and lifelong seeker who writes at the intersection of science, scripture, and spiritual experience. Raised within Evangelical Christianity, he began re‑examining his inherited worldview after a season of profound loss in 2018. A late‑night search led him to the growing body of near‑death experience (NDE) testimonies—accounts that didn’t pull him away from faith but invited him to engage it more deeply and honestly.
          </p>
          <p className="text-white/90 leading-relaxed mt-4">
            Professionally, Anaja builds backend systems and APIs. Personally, he brings the same curiosity and rigor to questions of meaning. <span className="italic">Insights from Beyond</span> is the result of years spent reading research, interviewing experiencers, and weighing NDE insights alongside the Bible. The book aims to bridge science and spirituality with humility: not to replace doctrine, but to kindle love, courage, and a truer picture of God’s heart.
          </p>
          <p className="text-white/90 leading-relaxed mt-4">
            Anaja lives in Orlando, Florida with his family. He enjoys quality time with family, listening to great music, having conversations about theology and consciousness, and an occasional glass of red wine. He also enjoys the simple practices that keep a soul healthy: modeling Jesus, prayer, good company, and staying active.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#/preorder" className="px-5 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold">Pre‑order the book</a>
            <a href="#/contact" className="px-5 py-3 rounded-xl border border-white/15">Media inquiries</a>
          </div>
        </div>
        <div>
          <RotatingGallery />
          <p className="text-xs text-white/60 mt-2">About Anaja Metellus, Insights from Beyond author</p>
        </div>
      </div>
    </main>
  );
}

function RotatingGallery() {
  const slides = [
    { src: "/images/anaja-metellus.webp", alt: "Anaja Metellus, author of Insights from Beyond" },
    { src: "/images/anaja-metellus-2.webp", alt: "Anaja Metellus, author of Insights from Beyond" },
    { src: "/images/anaja-metellus-looking-beyond.webp", alt: "Anaja Metellus, author of Insights from Beyond" },
    { src: "/images/anaja-metellus-looking-at-book.webp", alt: "Anaja Metellus, author of Insights from Beyond" },
    { src: "/images/insights-from-beyond-book-and-anaja-metellus.webp", alt: "Insights from Beyond book with Anaja Metellus" },
    { src: "/images/insights-from-beyond-dedication-page.webp", alt: "Insights from Beyond dedication page" },
    { src: "/images/insights-from-beyond-on-table.webp", alt: "Insights from Beyond book on table" }
  ];
  const [i, setI] = React.useState(0);

  // Rotate every 7s
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, []);

  // Preload next image for smoothness
  React.useEffect(() => {
    const img = new Image();
    img.src = slides[(i + 1) % slides.length].src;
  }, [i]);

  return (
    <div className="relative w-full aspect-square rounded-3xl ring-2 ring-white/10 overflow-hidden bg-gradient-to-br from-[#00111f] to-[#0A2A5E]">
      {slides.map((s, idx) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-3 right-3 flex gap-1" aria-hidden>
        {slides.map((_, idx) => (
          <span key={idx} className={`h-1.5 w-6 rounded-full ${idx === i ? 'bg-white/80' : 'bg-white/30'}`}></span>
        ))}
      </div>
      <button
        type="button"
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/10"
        onClick={() => setI((i - 1 + slides.length) % slides.length)}
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/10"
        onClick={() => setI((i + 1) % slides.length)}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}

function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-3 text-white/90">For media, speaking, or general inquiries, reach out anytime.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white/[.03] border border-white/10">
          <div className="space-y-3 text-white/90">
            <div><span className="text-white/60 text-sm">Email</span><div><a className="underline decoration-dotted" href="mailto:metellusa@gmail.com">metellusa@gmail.com</a></div></div>
            <div><span className="text-white/60 text-sm">Phone</span><div><a className="underline decoration-dotted" href="tel:+18133629287">(813) 362‑9287</a></div></div>
          </div>
          <div className="mt-6 text-sm text-white/60">Prefer social? DM via Facebook or LinkedIn works too.</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/[.03] border border-white/10">
          <div className="font-semibold">Send a message</div>
          <form className="mt-4 grid gap-3" onSubmit={(e)=>{e.preventDefault(); alert('Thanks! Your message has been captured locally. Hook this form to your email/CRM before launch.');}}>
            <input required placeholder="Name" className="px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#00B3FF]"/>
            <input required type="email" placeholder="Email" className="px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#00B3FF]"/>
            <textarea required placeholder="How can I help?" className="px-4 py-3 rounded-xl bg-black/30 border border-white/15 min-h-32 focus:outline-none focus:ring-2 focus:ring-[#00B3FF]"/>
            <div className="flex gap-3">
              <button className="px-5 py-3 rounded-xl bg-[#00B3FF] text-[#0B1B2B] font-semibold">Send</button>
              <a href="mailto:metellusa@gmail.com" className="px-5 py-3 rounded-xl border border-white/15">Email instead</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-semibold mb-2">Insights from Beyond</div>
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} Anaja Metellus. All rights reserved.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Explore</div>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About</a></li>
            <li><a href="#/preorder">Pre‑order</a></li>
            <li><a href="#/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Launch</div>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Release: Sept 26</li>
            <li>Formats: Hardcover · Paperback · eBook</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Stay in the loop</div>
          <NotifyForm />
        </div>
      </div>
    </footer>
  );
}
