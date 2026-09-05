"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
  index: number;
}

export function ProjectCard({
  title,
  category,
  image,
  href,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-border">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:brightness-90"
            />
          </motion.div>
        </div>
        <div className="mt-6 flex items-start justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted">{category}</p>
          </div>
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
            whileHover={{ scale: 1.1, borderColor: "var(--foreground)" }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

