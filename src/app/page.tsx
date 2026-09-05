"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FadeIn } from "@/components/FadeIn";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/data/projects";
import { profile, experiences, education } from "@/data/profile";

// Animated Star SVG Component - Using exact star from reference
const AnimatedStar = () => (
  <motion.svg
    viewBox="0 0 299 299"
    className="inline-block w-[0.85em] h-[0.85em] mx-4 align-middle"
    initial={{ rotate: 0, scale: 0 }}
    animate={{ rotate: 360, scale: 1 }}
    transition={{
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
    }}
  >
    <motion.path
      d="M125.0,293.0 L116.4,290.0 L113.8,280.0 L124.0,207.1 L30.0,228.2 L25.9,220.0 L31.0,211.6 L96.4,175.0 L39.0,162.4 L32.6,153.0 L42.0,145.0 L91.9,144.0 L60.7,85.0 L67.0,72.6 L77.0,75.3 L134.4,135.0 L156.8,19.0 L169.0,7.7 L176.5,12.0 L179.3,25.0 L172.4,123.0 L224.0,89.5 L253.0,79.6 L258.0,88.0 L251.4,100.0 L198.3,151.0 L262.0,166.6 L272.9,177.0 L257.0,186.3 L170.0,182.4 L216.3,254.0 L210.0,260.6 L201.0,259.3 L150.0,219.4 L138.4,268.0 L125.0,293.0 Z"
      fill="#F89D6A"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ transformOrigin: "150px 150px" }}
    />
  </motion.svg>
);

// Contact Section with Form
const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Connect with me
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-5xl">
            Reach out
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            I&apos;d love to hear from you. Whether you&apos;re looking to collaborate or discuss anything, just say hello!
          </p>
        </FadeIn>

        {/* Contact Info Row */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="text-sm text-muted mb-1">Prefer email?</p>
              <a 
                href={`mailto:${profile.email}`} 
                className="block font-medium hover:text-accent transition-colors"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex gap-4">
              {profile.social.slice(0, 2).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  {social.name === "LinkedIn" ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ) : social.name === "GitHub" ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            <input type="hidden" name="access_key" value="32bc9e07-2e0d-4860-a0b8-d86d3a9a3c92" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Name*</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="contact@gmail.com"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project inquiry..."
                className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message*</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                required
                rows={4}
                className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={formStatus === "submitting"}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-white transition-all hover:opacity-90 disabled:opacity-60"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === "submitting" ? "Sending..." : "Send message"}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </div>

            {formStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 bg-green-50 rounded-lg py-3 px-4"
              >
                Your message has been sent! I&apos;ll get back to you soon.
              </motion.div>
            )}

            {formStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 bg-red-50 rounded-lg py-3 px-4"
              >
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
};

export default function Home() {
  const projects = getAllProjects();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  // Motion values avoid re-renders on every mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const currentProject = hoveredIndex !== null ? projects[hoveredIndex] : null;
  const showPreview =
    hoveredIndex !== null && !!currentProject?.thumbnail && !imgError[hoveredIndex];

  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />

      {/* Project hover preview — fixed, pointer-events-none so it never blocks clicks */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="pointer-events-none fixed z-50 hidden md:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="relative -translate-x-1/2 -translate-y-[calc(100%+12px)] h-52 w-80 overflow-hidden rounded-xl shadow-2xl ring-1 ring-border">
              <Image
                src={currentProject!.thumbnail!}
                alt={currentProject!.title}
                fill
                className="object-cover"
                sizes="320px"
                onError={() =>
                  hoveredIndex !== null &&
                  setImgError((prev) => ({ ...prev, [hoveredIndex]: true }))
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Location badge */}
          <FadeIn>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              <p className="text-base text-accent-blue">
                Based in {profile.location}
              </p>
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.2}>
            <h1 className="mt-4 font-[family-name:var(--font-syne)] text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              <span className="flex flex-wrap items-center">
                <span>Hi, I&apos;m&nbsp;Charlotte</span>
                <AnimatedStar />
                <span>Lin</span>
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.35}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {profile.hero.tagline}
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-white transition-all hover:opacity-90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                get in touch
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Experience
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-5xl">
                Where I&apos;ve worked
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-1">
            {experiences.map((exp, index) => (
              <FadeIn key={exp.company} delay={index * 0.1}>
                <motion.div
                  className="grid grid-cols-12 gap-6 border-b border-border py-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-accent">{exp.company}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-muted leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="col-span-12 text-sm tabular-nums text-muted md:col-span-2 md:text-right">
                    {exp.period}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Education
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-5xl">
                Where I&apos;ve studied
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-1">
            {education.map((edu, index) => (
              <FadeIn key={edu.school} delay={index * 0.1}>
                <motion.div
                  className="grid grid-cols-12 gap-6 border-b border-border py-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold">
                      {edu.school}
                    </h3>
                    <p className="mt-1 text-accent">{edu.degree}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-muted leading-relaxed">{edu.detail}</p>
                  </div>
                  <div className="col-span-12 text-sm tabular-nums text-muted md:col-span-2 md:text-right">
                    {edu.period}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Selected Work
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-5xl">
                Projects
              </h2>
            </div>
          </FadeIn>

          <div
            className="space-y-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {projects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <motion.article
                    className="border-b border-border py-10 transition-colors hover:bg-card"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-6">
                        <div className="flex items-start justify-between">
                          <h3 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight md:text-3xl">
                            {project.title}
                          </h3>
                          <span className="text-sm tabular-nums text-muted md:hidden">
                            {project.year}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted">{project.category}</p>
                      </div>

                      <div className="col-span-12 md:col-span-5">
                        <p className="text-muted">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border px-3 py-1 text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-1 hidden items-start justify-end md:flex">
                        <span className="text-sm tabular-nums text-muted">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                      <span className="transition-colors group-hover:text-muted">
                        View project
                      </span>
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </motion.article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="px-6 py-12 md:px-12 lg:px-20 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex gap-6">
              {profile.social.slice(0, 3).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Built with */}
            <p className="text-sm text-muted">
              Built with{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-foreground">Next.js</a>,{" "}
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-foreground">Tailwind</a>,{" "}
              <a href="https://www.framer.com/motion" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-foreground">Framer Motion</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
