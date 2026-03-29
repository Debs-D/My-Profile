import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { name: "React", level: 90, color: "#61DAFB" },
  { name: "Next.js", level: 85, color: "#6366f1" },
  { name: "TypeScript", level: 80, color: "#3178C6" },
  { name: "JavaScript", level: 92, color: "#F7DF1E" },
  { name: "Tailwind CSS", level: 90, color: "#38BDF8" },
  { name: "REST APIs", level: 88, color: "#10B981" },
  { name: "Git & GitHub", level: 85, color: "#F05032" },
  { name: "Zustand", level: 78, color: "#764ABC" },
];

const EXPERIENCE = [
  {
    company: "Baige Wallet",
    role: "Frontend Developer",
    period: "Oct 2025 – Present",
    type: "Remote",
    color: "#6366f1",
    points: [
      "Built agency banking dashboards, merchant POS interfaces, and agent portals using React, Next.js & TypeScript",
      "Integrated multiple payment gateways with PCI-compliant data handling",
      "Reduced API response times by 40% through RESTful API architecture improvements",
    ],
  },
  {
    company: "Carlofty",
    role: "Frontend Developer",
    period: "Aug 2025 – Jan 2026",
    type: "Remote",
    color: "#f59e0b",
    points: [
      "Built full user & admin platforms for an automotive e-commerce marketplace",
      "Automated invoice generation system cutting processing time by 70%",
      "Engineered multi-step KYC onboarding flow with inline validation",
    ],
  },
  {
    company: "Ufone",
    role: "Frontend Developer",
    period: "Nov 2024 – Jul 2025",
    type: "Remote",
    color: "#10b981",
    points: [
      "Built 15+ reusable components across the Ufone Store e-commerce platform",
      "Delivered pixel-perfect Figma implementations with React, Next.js & Tailwind",
      "Streamlined checkout flow contributing to improved conversion rates",
    ],
  },
  {
    company: "BITS LIMITED",
    role: "Frontend Developer",
    period: "Feb 2025 – Apr 2025",
    type: "Remote",
    color: "#ec4899",
    points: [
      "Led frontend modernization of Luminevnt v2 SaaS with Next.js & Zustand",
      "Architected reusable component library standardizing UI across the app",
      "Reduced JS bundle size via code-splitting and component restructuring",
    ],
  },
];

const PROJECTS = [
  {
    title: "Ufuon STEM Store",
    desc: "Full e-commerce platform for a STEM education company empowering African students with electronics & IoT. Features auth flows, Paystack payment integration, cart, and product management.",
    stack: ["React", "Tailwind", "Paystack"],
    live: "https://store-front-bice.vercel.app",
    github: "https://github.com/Debs-D/store-front",
    type: "Professional",
    color: "#6366f1",
    badge: null,
  },
  {
    title: "HNG Ticket Dashboard",
    desc: "Responsive support ticket management app with full authentication, ticket creation, filtering, and state management. Clean UI optimized for desktop and mobile.",
    stack: ["React", "Tailwind", "Zustand"],
    live: "https://hngtticket-app.netlify.app/",
    github: "https://github.com/Debs-D/Ticket-App",
    type: "Personal",
    color: "#f59e0b",
    badge: null,
  },
  {
    title: "Dev Blog Platform",
    desc: "Full CRUD blog platform with Next.js, TypeScript, and Zod validation. Features light/dark mode, react-hook-form, and dynamic post rendering.",
    stack: ["Next.js", "TypeScript", "Zod", "Tailwind"],
    live: "https://my-blog-indol-alpha.vercel.app",
    github: "https://github.com/Debs-D/MyBlog",
    type: "Personal",
    color: "#10b981",
    badge: null,
  },
  {
    title: "Movie Box",
    desc: "Film discovery platform powered by the TMDB API. Features search, filtering, watchlists, and API caching that cut load time from 3s to 800ms — a 73% improvement.",
    stack: ["React", "TMDB API", "CSS"],
    live: "https://moviebox-blue.vercel.app/",
    github: "https://github.com/Debs-D/moviebox",
    type: "Personal",
    color: "#ec4899",
    badge: "Next.js upgrade in progress",
  },
];

// ── Fix: prop-types + stable threshold ref ──────────────────────────────────
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }   // literal here — no dependency needed
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []); // ✅ empty deps is correct — threshold is a literal, not a variable
  return [ref, inView];
}

// ── Fix: prop-types for AnimSection ─────────────────────────────────────────
function AnimSection({ children, style: extraStyle }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}
AnimSection.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};
AnimSection.defaultProps = { style: {} };

// ── Fix: prop-types for SkillBar ─────────────────────────────────────────────
function SkillBar({ skill, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{skill.name}</span>
        <span style={{ fontSize: 13, color: "#94a3b8" }}>{skill.level}%</span>
      </div>
      <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
          width: inView ? `${skill.level}%` : "0%",
          transition: `width 1.2s ease ${delay}s`,
          boxShadow: `0 0 12px ${skill.color}66`,
        }} />
      </div>
    </div>
  );
}
SkillBar.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  delay: PropTypes.number.isRequired,
};

// ── Main component ────────────────────────────────────────────────────────────
export default function Profile() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Fix: phrases as ref so it never changes identity → no missing dep warning
  const phrases = useRef([
    "Frontend Developer.",
    "React & Next.js Specialist.",
    "Fintech UI Engineer.",
    "Banking Domain Expert.",
  ]);
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  // Fix: wrap tick in useCallback so useEffect dep array is stable
  const tick = useCallback(() => {
    const phrase = phrases.current[phraseIdx.current];
    if (!deleting.current) {
      setTypedText(phrase.slice(0, charIdx.current + 1));
      charIdx.current++;
      if (charIdx.current === phrase.length) {
        deleting.current = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      setTypedText(phrase.slice(0, charIdx.current - 1));
      charIdx.current--;
      if (charIdx.current === 0) {
        deleting.current = false;
        phraseIdx.current = (phraseIdx.current + 1) % phrases.current.length;
      }
    }
    setTimeout(tick, deleting.current ? 45 : 80);
  }, []); // ✅ stable — all dependencies are refs

  useEffect(() => {
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [tick]); // ✅ tick is stable, no warning

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  // Fix: no e.preventDefault() needed since we removed <form>
  const handleContact = () => {
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const s = {
    app: { fontFamily: "'Segoe UI', sans-serif", background: "#0f172a", color: "#e2e8f0", minHeight: "100vh" },
    nav: { position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(15,23,42,0.95)" : "transparent", backdropFilter: "blur(12px)", borderBottom: scrolled ? "1px solid #1e293b" : "none", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, transition: "all 0.3s" },
    logo: { fontSize: 22, fontWeight: 800, background: "linear-gradient(135deg, #818cf8, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    navLinks: { display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 },
    navLink: (a, n) => ({ cursor: "pointer", fontSize: 14, fontWeight: 600, color: a === n ? "#818cf8" : "#94a3b8", borderBottom: a === n ? "2px solid #818cf8" : "2px solid transparent", paddingBottom: 2, transition: "all 0.2s" }),
    hero: { minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 5%", position: "relative", overflow: "hidden" },
    heroTag: { display: "inline-block", background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.3)", color: "#818cf8", borderRadius: 99, padding: "4px 14px", fontSize: 13, fontWeight: 600, marginBottom: 20 },
    heroName: { fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12, color: "#f1f5f9" },
    heroTyped: { fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", color: "#818cf8", fontWeight: 700, marginBottom: 20, minHeight: 36 },
    heroBio: { maxWidth: 580, fontSize: 16, lineHeight: 1.8, color: "#94a3b8", marginBottom: 36 },
    btnPrimary: { display: "inline-block", background: "linear-gradient(135deg, #818cf8, #a78bfa)", color: "#fff", padding: "12px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer", border: "none", marginRight: 14, transition: "transform 0.2s, box-shadow 0.2s" },
    btnOutline: { background: "transparent", color: "#818cf8", padding: "11px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer", border: "2px solid #818cf8", transition: "all 0.2s" },
    section: { padding: "80px 5%" },
    sectionLabel: { fontSize: 13, fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 },
    sectionTitle: { fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 12 },
    sectionSub: { fontSize: 16, color: "#64748b", marginBottom: 48 },
    card: { background: "#1e293b", borderRadius: 16, padding: 28, border: "1px solid #334155", transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s" },
    expDot: (c) => ({ width: 12, height: 12, borderRadius: "50%", background: c, boxShadow: `0 0 10px ${c}`, flexShrink: 0, marginTop: 6 }),
    tag: (c) => ({ background: `${c}18`, color: c, border: `1px solid ${c}44`, borderRadius: 99, padding: "3px 12px", fontSize: 12, fontWeight: 700 }),
    input: { width: "100%", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "12px 16px", color: "#e2e8f0", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 14 },
    orb: (x, y, c) => ({ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${c}18 0%, transparent 70%)`, left: x, top: y, pointerEvents: "none" }),
  };

  return (
    <div style={s.app}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.logo}>AO.</div>
        <ul style={s.navLinks}>
          {NAV_LINKS.map(n => (
            <li key={n} style={s.navLink(active, n)} onClick={() => scrollTo(n)}>{n}</li>
          ))}
        </ul>
        {/* Fix: rel="noreferrer" covers both noopener + noreferrer */}
        <a href="mailto:aishat.odekunley@gmail.com" rel="noreferrer" style={{ ...s.btnPrimary, padding: "8px 18px", fontSize: 13, textDecoration: "none" }}>
          Hire Me
        </a>
      </nav>

      {/* HERO */}
      <section id="about" style={s.hero}>
        <div style={s.orb("-5%", "-10%", "#818cf8")} />
        <div style={s.orb("60%", "40%", "#f472b6")} />
        <AnimSection>
          <div style={s.heroTag}>Available for opportunities</div>
          <h1 style={s.heroName}>Hi, I&apos;m Ayishat<br />Odekunle.</h1>
          <div style={s.heroTyped}>
            {typedText}
            <span style={{ borderRight: "2px solid #818cf8", marginLeft: 1, animation: "blink 1s infinite" }}>|</span>
          </div>
          {/* Fix: apostrophes escaped with &apos; */}
          <p style={s.heroBio}>
            Frontend developer with 3 years of experience building scalable fintech and e-commerce products.
            I bring a rare edge — 3+ years in banking operations that lets me translate complex financial
            workflows into interfaces real users trust.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              style={s.btnPrimary}
              onClick={() => scrollTo("Projects")}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(129,140,248,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              View My Work
            </button>
            <a href="https://www.linkedin.com/in/ayishat-odekunle-a7146527a/" target="_blank" rel="noreferrer" style={{ ...s.btnOutline, textDecoration: "none", padding: "11px 24px" }}>LinkedIn</a>
            <a href="https://github.com/Debs-D" target="_blank" rel="noreferrer" style={{ ...s.btnOutline, textDecoration: "none", padding: "11px 24px" }}>GitHub</a>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 52, flexWrap: "wrap" }}>
            {[["3+", "Years Experience"], ["10+", "Projects Delivered"], ["4", "Companies"], ["40%", "Avg. Perf. Gains"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #818cf8, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ ...s.section, background: "#0f172a" }}>
        <AnimSection>
          <div style={s.sectionLabel}>Expertise</div>
          <h2 style={s.sectionTitle}>Core Technical Skills</h2>
          <p style={s.sectionSub}>Technologies I work with daily in production</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
            <div>{SKILLS.slice(0, 4).map((sk, i) => <SkillBar key={sk.name} skill={sk} delay={i * 0.12} />)}</div>
            <div>{SKILLS.slice(4).map((sk, i) => <SkillBar key={sk.name} skill={sk} delay={i * 0.12} />)}</div>
          </div>
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["HTML5","CSS3","Webpack","Docker","Jest","Cypress","CI/CD","GraphQL","WebSockets","Azure Functions","Figma","Node.js"].map(t => (
              <span key={t} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 99, padding: "5px 14px", fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={s.section}>
        <AnimSection>
          <div style={s.sectionLabel}>Career</div>
          <h2 style={s.sectionTitle}>Work Experience</h2>
          <p style={s.sectionSub}>Companies I&apos;ve built real products for</p>
        </AnimSection>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 5, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #818cf8, #f472b6, transparent)" }} />
          {EXPERIENCE.map((exp) => (
            <AnimSection key={exp.company} style={{ paddingLeft: 36, marginBottom: 36, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, ...s.expDot(exp.color) }} />
              <div
                style={{ ...s.card, borderLeft: `3px solid ${exp.color}` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = `0 4px 24px ${exp.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9" }}>{exp.company}</div>
                    <div style={{ fontSize: 14, color: exp.color, fontWeight: 600, marginTop: 2 }}>{exp.role}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "#64748b", fontStyle: "italic" }}>{exp.period}</div>
                    <span style={{ ...s.tag(exp.color), display: "inline-block", marginTop: 6 }}>{exp.type}</span>
                  </div>
                </div>
                <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
                  {exp.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>
                      <span style={{ color: exp.color, flexShrink: 0, marginTop: 3 }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ ...s.section, background: "#0a1120" }}>
        <AnimSection>
          <div style={s.sectionLabel}>Portfolio</div>
          <h2 style={s.sectionTitle}>Featured Projects</h2>
          <p style={s.sectionSub}>A selection of real, production-grade work</p>
        </AnimSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {PROJECTS.map((p) => (
            <AnimSection key={p.title}>
              <div
                style={{ ...s.card, height: "100%", display: "flex", flexDirection: "column", borderTop: `3px solid ${p.color}` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${p.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ fontSize: 28, color: p.color, fontWeight: 900 }}>{"{ }"}</div>
                  <span style={{ ...s.tag(p.color) }}>{p.type}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{p.title}</h3>
                {p.badge && (
                  <div style={{ background: "rgba(248,187,0,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, marginBottom: 10, display: "inline-block" }}>
                    ⚡ {p.badge}
                  </div>
                )}
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, flex: 1, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.stack.map(t => <span key={t} style={{ ...s.tag(p.color) }}>{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <a href={p.live} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: p.color, color: "#fff", padding: "9px 0", borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Live Demo</a>
                  <a href={p.github} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "transparent", color: p.color, padding: "8px 0", borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: "none", border: `2px solid ${p.color}` }}>GitHub</a>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={s.section}>
        <AnimSection>
          <div style={s.sectionLabel}>Get In Touch</div>
          <h2 style={s.sectionTitle}>Let&apos;s Work Together</h2>
          <p style={s.sectionSub}>Have a project in mind? I&apos;d love to hear about it.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
            <div>
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, marginBottom: 28 }}>
                I&apos;m currently open to frontend roles — full-time, contract, or freelance. Whether you&apos;re
                building a fintech product, e-commerce platform, or SaaS tool, I can help you ship something great.
              </p>
              {[
                ["📧", "Email", "aishat.odekunley@gmail.com", "mailto:aishat.odekunley@gmail.com"],
                ["💼", "LinkedIn", "Ayishat Odekunle", "https://www.linkedin.com/in/ayishat-odekunle-a7146527a/"],
                ["⚡", "GitHub", "Debs-D", "https://github.com/Debs-D"],
              ].map(([icon, label, val, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16, textDecoration: "none" }}>
                  <div style={{ width: 42, height: 42, background: "#1e293b", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 600 }}>{val}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={s.card}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#10b981" }}>Message sent!</div>
                  <div style={{ fontSize: 14, color: "#64748b", marginTop: 6 }}>I&apos;ll get back to you shortly.</div>
                </div>
              ) : (
                <div>
                  <input style={s.input} placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input style={s.input} type="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <textarea style={{ ...s.input, resize: "vertical", minHeight: 110 }} placeholder="Tell me about your project..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button
                    onClick={handleContact}
                    style={{ ...s.btnPrimary, width: "100%", textAlign: "center", border: "none" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
                  >
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </div>
        </AnimSection>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1e293b", padding: "24px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={s.logo}>AO.</div>
        <div style={{ fontSize: 13, color: "#475569" }}>© 2025 Ayishat Odekunle · Built with React</div>
        <div style={{ display: "flex", gap: 16 }}>
          {[["LinkedIn", "https://www.linkedin.com/in/ayishat-odekunle-a7146527a/"], ["GitHub", "https://github.com/Debs-D"]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>
    </div>
  );
}