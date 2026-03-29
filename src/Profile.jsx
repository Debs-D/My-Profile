import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Projects", "Contact"];

const SKILLS = [
  "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
  "Tailwind CSS", "Zustand", "REST APIs", "GraphQL",
  "Git & GitHub", "Jest", "Figma", "Node.js", "Docker", "CI/CD",
];

const EXPERIENCE = [
  {
    company: "Baige Wallet",
    role: "Frontend Developer",
    period: "Oct 2025 – Present",
    points: [
      "Built agency banking dashboards, merchant POS interfaces & agent portals — React, Next.js, TypeScript",
      "Integrated multiple payment gateways with PCI-compliant data handling",
      "Cut average API response times by 40% through RESTful API architecture improvements",
    ],
  },
  {
    company: "Carlofty",
    role: "Frontend Developer",
    period: "Aug 2025 – Jan 2026",
    points: [
      "Built full user & admin platforms for an automotive e-commerce marketplace (carlofty.com)",
      "Engineered multi-step KYC onboarding with inline validation, reducing drop-off",
      "Automated invoice system cutting manual processing time by 70%",
    ],
  },
  {
    company: "Ufone",
    role: "Frontend Developer",
    period: "Nov 2024 – Jul 2025",
    points: [
      "Built 15+ reusable components used across the Ufone Store platform",
      "Delivered pixel-perfect Figma implementations — React, Next.js, TypeScript, Tailwind",
      "Streamlined checkout flow, contributing to improved storefront conversion rates",
    ],
  },
  {
    company: "BITS LIMITED",
    role: "Frontend Developer",
    period: "Feb 2025 – Apr 2025",
    points: [
      "Led frontend modernization of Luminevnt v2 SaaS — Next.js, Zustand",
      "Built a reusable component library that standardized UI across the product",
      "Reduced JS bundle size through code-splitting and component restructuring",
    ],
  },
];

const PROJECTS = [
  {
    title: "Ufuon STEM Store",
    desc: "E-commerce storefront for Ufuon — a STEM platform empowering African students with electronics & IoT. Full store: auth, cart, Paystack payments, and product listings.",
    stack: ["React", "Tailwind CSS", "Paystack"],
    live: "https://store-front-bice.vercel.app",
    github: "https://github.com/Debs-D/store-front",
    label: "Professional",
  },
  {
    title: "HNG Ticket Dashboard",
    desc: "Support ticket management app — login/signup, ticket creation, filtering, state management. Clean and fully responsive for desktop and mobile.",
    stack: ["React", "Tailwind CSS", "Zustand"],
    live: "https://hngtticket-app.netlify.app/",
    github: "https://github.com/Debs-D/Ticket-App",
    label: "Personal",
  },
  {
    title: "Dev Blog",
    desc: "Full CRUD blog platform — create posts with title, image and content, light/dark mode, form validation with Zod and react-hook-form.",
    stack: ["Next.js", "TypeScript", "Zod", "Tailwind CSS"],
    live: "https://my-blog-indol-alpha.vercel.app",
    github: "https://github.com/Debs-D/MyBlog",
    label: "Personal",
  },
  {
    title: "Movie Box",
    desc: "Film discovery app powered by the TMDB API. API caching cut load time from 3s to under 800ms. Features search, filters and watchlists.",
    stack: ["React", "TMDB API", "CSS"],
    live: "https://moviebox-blue.vercel.app/",
    github: "https://github.com/Debs-D/moviebox",
    label: "Upgrading to Next.js",
  },
];

// ─── EmailJS config — replace with your real keys ────────────────────────────
// 1. Go to https://www.emailjs.com and sign up (free)
// 2. Add a Gmail service → copy the Service ID
// 3. Create a template using variables: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" to aishat.odekunley@gmail.com in the template settings
// 4. Go to Account → copy your Public Key
const EJS_SERVICE  = "YOUR_SERVICE_ID";   // e.g. "service_ab12cd"
const EJS_TEMPLATE = "YOUR_TEMPLATE_ID";  // e.g. "template_xy34ef"
const EJS_KEY      = "YOUR_PUBLIC_KEY";   // e.g. "pK9xABCDEFGH"

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.08 }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay, style: extra }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...extra,
    }}>
      {children}
    </div>
  );
}
Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  style: PropTypes.object,
};
Reveal.defaultProps = { delay: 0, style: {} };

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Profile() {
  const [dark, setDark]           = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm]           = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const [typed, setTyped]         = useState("");

  const phrases = useRef(["Frontend Developer", "React & Next.js Engineer", "Fintech UI Specialist", "Banking-Informed Builder"]);
  const pIdx = useRef(0), cIdx = useRef(0), del = useRef(false);

  const tick = useCallback(() => {
    const word = phrases.current[pIdx.current];
    if (!del.current) {
      setTyped(word.slice(0, cIdx.current + 1));
      cIdx.current++;
      if (cIdx.current === word.length) { del.current = true; setTimeout(tick, 2000); return; }
    } else {
      setTyped(word.slice(0, cIdx.current - 1));
      cIdx.current--;
      if (cIdx.current === 0) { del.current = false; pIdx.current = (pIdx.current + 1) % phrases.current.length; }
    }
    setTimeout(tick, del.current ? 42 : 78);
  }, []);

  useEffect(() => { const t = setTimeout(tick, 500); return () => clearTimeout(t); }, [tick]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const goTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMobileOpen(false);
  };

  const sendMessage = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setFormState("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  EJS_SERVICE,
          template_id: EJS_TEMPLATE,
          user_id:     EJS_KEY,
          template_params: {
            from_name:  form.name,
            from_email: form.email,
            message:    form.message,
          },
        }),
      });
      if (res.ok) {
        setFormState("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 6000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 5000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  // ── Theme tokens ─────────────────────────────────────────────────────────────
  const C = {
    bg:       dark ? "#0d0d14" : "#f6f7fb",
    bg2:      dark ? "#111119" : "#eef0f8",
    card:     dark ? "#15151f" : "#ffffff",
    border:   dark ? "#1e1e30" : "#dde1f0",
    text:     dark ? "#e8eaf0" : "#18182e",
    muted:    dark ? "#6b7280" : "#64748b",
    subtle:   dark ? "#94a3b8" : "#4b5563",
    accent:   "#7c3aed",
    aLt:      "#a78bfa",
    aBg:      dark ? "rgba(124,58,237,0.13)" : "rgba(124,58,237,0.08)",
    aBdr:     dark ? "rgba(124,58,237,0.32)" : "rgba(124,58,237,0.22)",
  };

  // Shared inner-width container — full background, constrained content
  const inner = { width: "100%", maxWidth: 1100, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" };

  const navBg = scrolled
    ? dark ? "rgba(13,13,20,0.96)" : "rgba(246,247,251,0.96)"
    : "transparent";

  const inputBase = {
    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
    padding: "11px 14px", color: C.text, fontSize: 14, outline: "none",
    width: "100%", boxSizing: "border-box", transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: C.bg, color: C.text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: navBg, backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ ...inner, display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <span onClick={() => goTo("Home")} style={{ fontWeight: 800, fontSize: 20, color: C.accent, cursor: "pointer", letterSpacing: "-0.5px", flexShrink: 0 }}>
            ayishat.
          </span>

          {/* desktop links */}
          <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }} className="desk-nav">
            {NAV_LINKS.map(n => (
              <li key={n} onClick={() => goTo(n)} style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, color: activeNav === n ? C.aLt : C.muted, borderBottom: activeNav === n ? `2px solid ${C.accent}` : "2px solid transparent", paddingBottom: 2, transition: "color 0.2s", whiteSpace: "nowrap" }}>{n}</li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setDark(d => !d)} style={{ background: C.aBg, border: `1px solid ${C.aBdr}`, borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 15, color: C.aLt, lineHeight: 1 }}>
              {dark ? "☀️" : "🌙"}
            </button>
            <a href="/Ayishat_Odekunle_CV.pdf" download style={{ background: C.accent, color: "#fff", padding: "7px 14px", borderRadius: 7, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
              Resume ↓
            </a>
            <button onClick={() => setMobileOpen(o => !o)} className="ham" style={{ background: "none", border: "none", color: C.text, fontSize: 22, cursor: "pointer", padding: "4px 6px", display: "none", lineHeight: 1 }}>
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 199, background: dark ? "rgba(13,13,20,0.99)" : "rgba(246,247,251,0.99)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
          {NAV_LINKS.map(n => (
            <span key={n} onClick={() => goTo(n)} style={{ fontSize: 28, fontWeight: 700, color: activeNav === n ? C.aLt : C.text, cursor: "pointer" }}>{n}</span>
          ))}
          <a href="/Ayishat_Odekunle_CV.pdf" download onClick={() => setMobileOpen(false)} style={{ marginTop: 8, background: C.accent, color: "#fff", padding: "11px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
            Download CV
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ background: C.bg, paddingTop: 60 }}>
        <div style={{ ...inner, minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 60, paddingBottom: 60 }}>
          <Reveal delay={0.05}>
            <p style={{ color: C.aLt, fontWeight: 600, fontSize: 14, marginBottom: 16, letterSpacing: "0.5px" }}>
              👋 Hi there, I&apos;m
            </p>
            <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: 18, color: C.text, letterSpacing: "-1px" }}>
              Ayishat Odekunle
            </h1>
            <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 700, color: C.accent, marginBottom: 24, minHeight: 34, display: "flex", alignItems: "center", gap: 3 }}>
              <span>{typed}</span>
              <span style={{ width: 2, height: "1.1em", background: C.accent, display: "inline-block", animation: "blink 1s steps(1) infinite", verticalAlign: "middle" }} />
            </div>
            <p style={{ fontSize: 15, color: C.subtle, lineHeight: 1.85, marginBottom: 32, maxWidth: 560 }}>
              Frontend developer based in Lagos, Nigeria. specializing in React, Next.js, and TypeScript.
              I came into tech from banking. I understand financial systems
              deeply, so the fintech products I build make sense to real users
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
              <button onClick={() => goTo("Projects")} style={{ background: C.accent, color: "#fff", padding: "11px 26px", borderRadius: 8, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.86"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
                See my work →
              </button>
              <button onClick={() => goTo("Contact")} style={{ background: "transparent", color: C.aLt, padding: "10px 26px", borderRadius: 8, fontWeight: 700, fontSize: 14, border: `1.5px solid ${C.accent}`, cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.aBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Get in touch
              </button>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap", paddingTop: 28, borderTop: `1px solid ${C.border}` }}>
              {[["3+", "Years building"], ["4", "Companies"], ["10+", "Projects shipped"], ["40%", "Avg. perf gains"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: C.aLt }}>{n}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: C.bg2 }}>
        <div style={{ ...inner, paddingTop: 80, paddingBottom: 80 }}>
          <Reveal>
            <p style={{ color: C.aLt, fontWeight: 600, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>A bit about me</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: C.text, marginBottom: 32 }}>More than just code</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28, marginBottom: 52 }}>
            {[
              "Frontend developer based in Lagos, Nigeria. I work mainly in React and Next.js, and I take the craft seriously; clean code, solid performance, and interfaces that feel right to use.",
              "I spent three years in banking before moving into tech, first at Access Bank, then UBA. Working at the counter and on the systems gave me a real understanding of what frustrates users in financial products, and what builds their trust.",
              "Right now I'm at Baige Wallet, building fintech products: agency banking dashboards, merchant POS systems, and admin platforms. I like work that has real stakes.",
              "I'm open to full-time, contract, or freelance opportunities. If you're building something meaningful in fintech or e-commerce. I'd genuinely love to hear about it.",
            ].map((txt, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p style={{ fontSize: 15, color: C.subtle, lineHeight: 1.85 }}>{txt}</p>
              </Reveal>
            ))}
          </div>

          {/* skills */}
          <Reveal delay={0.1}>
            <p style={{ color: C.aLt, fontWeight: 600, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Skills & tools</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {SKILLS.map(sk => (
                <span key={sk} style={{ background: C.aBg, color: C.aLt, border: `1px solid ${C.aBdr}`, borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 500, transition: "background 0.2s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(124,58,237,0.26)" : "rgba(124,58,237,0.16)"}
                  onMouseLeave={e => e.currentTarget.style.background = C.aBg}>
                  {sk}
                </span>
              ))}
            </div>
          </Reveal>

          {/* experience */}
          <div style={{ marginTop: 68 }}>
            <Reveal>
              <p style={{ color: C.aLt, fontWeight: 600, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Experience</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: C.text, marginBottom: 40 }}>Where I&apos;ve worked</h2>
            </Reveal>
            <div style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 28 }}>
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 0.08}>
                  <div style={{ position: "relative", marginBottom: 40 }}>
                    <div style={{ position: "absolute", left: -35, top: 5, width: 10, height: 10, borderRadius: "50%", background: C.accent, boxShadow: `0 0 0 3px ${C.bg2}, 0 0 0 5px ${C.accent}44` }} />
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 16, color: C.text }}>{exp.company}</span>
                        <span style={{ color: C.aLt, fontSize: 13, marginLeft: 10, fontWeight: 500 }}>{exp.role}</span>
                      </div>
                      <span style={{ fontSize: 12, color: C.muted, fontStyle: "italic" }}>{exp.period}</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {exp.points.map(pt => (
                        <li key={pt} style={{ display: "flex", gap: 10, fontSize: 14, color: C.subtle, lineHeight: 1.75, marginBottom: 7 }}>
                          <span style={{ color: C.accent, flexShrink: 0, marginTop: 1 }}>–</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ background: C.bg }}>
        <div style={{ ...inner, paddingTop: 80, paddingBottom: 80 }}>
          <Reveal>
            <p style={{ color: C.aLt, fontWeight: 600, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>What I&apos;ve built</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: C.text, marginBottom: 8 }}>Featured Projects</h2>
            <p style={{ fontSize: 15, color: C.muted, marginBottom: 48 }}>Real work. Real users.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${C.accent}28`; e.currentTarget.style.borderColor = `${C.accent}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.aLt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.aLt, background: C.aBg, border: `1px solid ${C.aBdr}`, borderRadius: 99, padding: "2px 10px" }}>{p.label}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: C.subtle, lineHeight: 1.75, flex: 1, marginBottom: 18 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {p.stack.map(t => (
                      <span key={t} style={{ fontSize: 12, color: C.muted, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 9px" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={p.live} target="_blank" rel="noreferrer"
                      style={{ flex: 1, textAlign: "center", background: C.accent, color: "#fff", padding: "9px 0", borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: "none", transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                      Live ↗
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer"
                      style={{ flex: 1, textAlign: "center", background: "transparent", color: C.aLt, padding: "8px 0", borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: "none", border: `1.5px solid ${C.accent}`, transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = C.aBg}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      GitHub
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: C.bg2 }}>
        <div style={{ ...inner, paddingTop: 80, paddingBottom: 80 }}>
          <Reveal>
            <p style={{ color: C.aLt, fontWeight: 600, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Let&apos;s talk</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: C.text, marginBottom: 8 }}>Get In Touch</h2>
            <p style={{ fontSize: 15, color: C.muted, marginBottom: 48, maxWidth: 440 }}>Whether you have a project, a role, or just want to say hello — my inbox is open.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 48 }}>
            {/* contact info */}
            <Reveal delay={0.08}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "✉", label: "Email",    val: "aishat.odekunley@gmail.com",    href: "mailto:aishat.odekunley@gmail.com" },
                  { icon: "in", label: "LinkedIn", val: "Ayishat Odekunle",              href: "https://www.linkedin.com/in/ayishat-odekunle-a7146527a/" },
                  { icon: "</>", label: "GitHub",  val: "github.com/Debs-D",             href: "https://github.com/Debs-D" },
                ].map(({ icon, label, val, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 14, alignItems: "center", textDecoration: "none" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: C.aBg, border: `1px solid ${C.aBdr}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: C.aLt, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                      <div style={{ fontSize: 14, color: C.text, fontWeight: 500, marginTop: 2 }}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* form */}
            <Reveal delay={0.14}>
              {formState === "sent" ? (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 40, textAlign: "center" }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>🎉</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 6 }}>Thanks for reaching out!</div>
                  <div style={{ fontSize: 14, color: C.muted }}>I&apos;ll get back to you soon.</div>
                </div>
              ) : (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                  {formState === "error" && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626" }}>
                      Could not send — please email me directly at aishat.odekunley@gmail.com
                    </div>
                  )}
                  <input type="text" placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputBase}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputBase}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                  <textarea placeholder="What are you working on?" value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputBase, minHeight: 110, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                  <button onClick={sendMessage} disabled={formState === "sending"}
                    style={{ background: formState === "sending" ? C.muted : C.accent, color: "#fff", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, border: "none", cursor: formState === "sending" ? "not-allowed" : "pointer", transition: "opacity 0.2s", fontFamily: "inherit" }}
                    onMouseEnter={e => { if (formState !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    {formState === "sending" ? "Sending…" : "Send message →"}
                  </button>
                  <p style={{ fontSize: 12, color: C.muted, textAlign: "center", margin: 0 }}>
                    Or email directly: <a href="mailto:aishat.odekunley@gmail.com" style={{ color: C.aLt, textDecoration: "none" }}>aishat.odekunley@gmail.com</a>
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ ...inner, padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.accent }}>ayishat.</span>
          <span style={{ fontSize: 13, color: C.muted }}>© 2025 Ayishat Odekunle · Built with React</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[["LinkedIn", "https://www.linkedin.com/in/ayishat-odekunle-a7146527a/"], ["GitHub", "https://github.com/Debs-D"]].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: C.muted, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.aLt}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: #4b5563; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2d2d44; border-radius: 3px; }
        @media (max-width: 767px) {
          .desk-nav { display: none !important; }
          .ham { display: block !important; }
        }
      `}</style>
    </div>
  );
}