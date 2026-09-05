"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FadeIn } from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProjectBySlug, getNextProject } from "@/data/projects";
import type { MediaItem } from "@/data/projects";
import { profile } from "@/data/profile";

function MediaGallery({
  media,
  layout = "grid",
}: {
  media: MediaItem[];
  layout?: "grid" | "video" | "featured-left" | "panels";
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const validMedia = media.filter((_, i) => !imgErrors[i]);

  if (validMedia.length === 0) return null;

  // A single clickable media tile (image or video) used by the layouts below.
  const renderTile = (
    index: number,
    {
      aspect,
      fit = "cover",
      autoPlay = false,
    }: { aspect: string; fit?: "cover" | "contain"; autoPlay?: boolean },
  ) => {
    const item = media[index];
    if (!item || imgErrors[index]) return null;
    const fitClass = fit === "contain" ? "object-contain" : "object-cover";

    return (
      <motion.div
        className="group relative h-full cursor-pointer overflow-hidden rounded-lg bg-card ring-1 ring-border"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onClick={() => setLightbox(index)}
      >
        {item.type === "image" ? (
          <div className={`relative ${aspect}`}>
            <Image
              src={item.src}
              alt={item.alt ?? "Project image"}
              fill
              className={`${fitClass} transition-transform duration-500 group-hover:scale-105`}
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() =>
                setImgErrors((prev) => ({ ...prev, [index]: true }))
              }
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </div>
        ) : (
          <div className={`relative ${aspect}`}>
            <video
              src={item.src}
              poster={item.poster}
              className={`h-full w-full ${fitClass}`}
              muted
              playsInline
              loop
              autoPlay={autoPlay}
              preload="metadata"
              onMouseEnter={
                autoPlay
                  ? undefined
                  : (e) => (e.currentTarget as HTMLVideoElement).play()
              }
              onMouseLeave={
                autoPlay
                  ? undefined
                  : (e) => (e.currentTarget as HTMLVideoElement).pause()
              }
            />
            {!autoPlay && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                <svg
                  className="h-12 w-12 text-white/80 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  let gallery: React.ReactNode;

  if (layout === "video") {
    // Single, centered demo video that autoplays (muted) inline.
    gallery = (
      <div className="mx-auto max-w-3xl">
        {renderTile(0, { aspect: "aspect-video", autoPlay: true })}
      </div>
    );
  } else if (layout === "featured-left" && media.length >= 3) {
    // Left tile spans both rows — same total size as the two right pics stacked.
    gallery = (
      <div className="grid gap-5 md:grid-cols-2 md:grid-rows-2">
        <div className="h-full min-h-0 md:row-span-2">
          {renderTile(0, { aspect: "aspect-[3/4] md:aspect-auto md:h-full" })}
        </div>
        {renderTile(1, { aspect: "aspect-[16/9]" })}
        {renderTile(2, { aspect: "aspect-[16/9]" })}
      </div>
    );
  } else if (layout === "panels") {
    // Small portrait screenshots shown side by side at their natural aspect.
    gallery = (
      <div className="mx-auto flex max-w-lg items-stretch justify-center gap-4 sm:gap-6">
        {media.map((item, i) =>
          imgErrors[i] ? null : (
            <motion.div
              key={i}
              className="group w-1/2 overflow-hidden rounded-xl bg-card ring-1 ring-border"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[3/5]">
                <Image
                  src={item.src}
                  alt={
                    (item as { alt?: string }).alt ?? "Project screenshot"
                  }
                  fill
                  className="object-contain p-1"
                  sizes="240px"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [i]: true }))
                  }
                />
              </div>
            </motion.div>
          ),
        )}
      </div>
    );
  } else {
    const gridClass =
      media.length === 1
        ? "grid-cols-1"
        : media.length === 2
          ? "grid-cols-1 md:grid-cols-2"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    gallery = (
      <div className={`grid gap-4 ${gridClass}`}>
        {media.map((_, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            {renderTile(index, { aspect: "aspect-[4/3]" })}
          </FadeIn>
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.15em] text-muted">
              Gallery
            </p>
          </FadeIn>
          {layout === "grid" ? gallery : <FadeIn delay={0.05}>{gallery}</FadeIn>}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {media[lightbox].type === "image" ? (
                <Image
                  src={media[lightbox].src}
                  alt={
                    (media[lightbox] as { alt?: string }).alt ??
                    "Project image"
                  }
                  width={1200}
                  height={800}
                  className="h-auto max-h-[85vh] w-auto object-contain"
                />
              ) : (
                <video
                  src={media[lightbox].src}
                  poster={
                    (media[lightbox] as { poster?: string }).poster
                  }
                  controls
                  autoPlay
                  className="max-h-[85vh] w-auto"
                />
              )}

              {/* Prev / Next */}
              {media.length > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox(
                        (lightbox - 1 + media.length) % media.length,
                      );
                    }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((lightbox + 1) % media.length);
                    }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Close */}
              <button
                className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                onClick={() => setLightbox(null)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);
  const nextProject = getNextProject(slug);

  if (!project) {
    return (
      <main className="relative min-h-screen">
        <Navigation />
        <section className="flex min-h-screen items-center justify-center px-6 md:px-12">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-syne)] text-4xl font-semibold">
              Project not found
            </h1>
            <Link
              href="/projects"
              className="mt-6 inline-block text-muted transition-colors hover:text-foreground"
            >
              ← Back to projects
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
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
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to projects
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 flex flex-wrap items-baseline gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                {project.category}
              </span>
              <span className="text-muted">·</span>
              <span className="text-xs tabular-nums text-muted">
                {project.year}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="mt-4 font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {project.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-2xl text-xl text-muted">
              {project.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <MediaGallery media={project.media} layout={project.galleryLayout} />
      )}

      {/* Project Info */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-3">
            <FadeIn className="md:col-span-1">
              <div className="space-y-8">
                {project.role && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                      Role
                    </p>
                    <p className="font-[family-name:var(--font-syne)] font-medium">
                      {project.role}
                    </p>
                  </div>
                )}
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                    Year
                  </p>
                  <p className="font-[family-name:var(--font-syne)] font-medium">
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {project.links &&
                  (project.links.live || project.links.github) && (
                    <div>
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted">
                        Links
                      </p>
                      <div className="flex flex-col gap-2">
                        {project.links.live && (
                          <motion.a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
                            whileHover={{ x: 4 }}
                          >
                            Live Site
                            <svg
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 17L17 7M17 7H7M17 7v10"
                              />
                            </svg>
                          </motion.a>
                        )}
                        {project.links.github && (
                          <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
                            whileHover={{ x: 4 }}
                          >
                            GitHub
                            <svg
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 17L17 7M17 7H7M17 7v10"
                              />
                            </svg>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-2">
              <div className="max-w-2xl space-y-8">
                {project.content?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg leading-[1.8] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Next Project */}
      {nextProject && (
        <section className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl border-t border-border pt-24">
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Next Project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group mt-4 block"
              >
                <motion.h2
                  className="font-[family-name:var(--font-syne)] text-4xl font-semibold tracking-tight transition-colors group-hover:text-muted md:text-6xl"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  {nextProject.title}
                  <span className="ml-4 inline-block transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </motion.h2>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

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
