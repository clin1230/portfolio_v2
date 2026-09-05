"use client";

import { useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FadeIn } from "@/components/FadeIn";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function ProjectsPage() {
  const projects = getAllProjects();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const listRef = useRef<HTMLDivElement>(null);

  // Motion values avoid re-renders on every mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const currentProject =
    hoveredIndex !== null ? projects[hoveredIndex] : null;
  const showPreview =
    hoveredIndex !== null &&
    !!currentProject?.thumbnail &&
    !imgError[hoveredIndex];

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hover preview — fixed, pointer-events-none so it never blocks clicks */}
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
            {/* offset: center horizontally, sit just above cursor */}
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

      <section className="px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-20">
              <span className="index-number text-xs font-medium text-muted">
                [I.]
              </span>
              <h1 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-6xl">
                Selected Work
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                A collection of projects showcasing my approach to full-stack
                development—thoughtful, user-focused, and refined in execution.
              </p>
            </div>
          </FadeIn>

          {/* Project List */}
          <div
            ref={listRef}
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
                          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight md:text-3xl">
                            {project.title}
                          </h2>
                          <span className="text-sm tabular-nums text-muted md:hidden">
                            {project.year}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          {project.category}
                        </p>
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

      {/* Footer */}
      <footer className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs uppercase tracking-[0.1em] text-muted">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p className="text-xs uppercase tracking-[0.1em] text-muted">
              {profile.location}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
