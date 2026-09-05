"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/#work", label: "Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-6 py-3 shadow-lg shadow-black/[0.03] backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-base font-bold tracking-tight transition-opacity hover:opacity-60"
        >
          charlotte⁙lin
        </Link>

        <ul className="flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 transition-all ${
                  pathname === link.href 
                    ? "bg-foreground/10 text-foreground" 
                    : "text-muted hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              className="rounded-full px-4 py-2 text-muted transition-all hover:bg-foreground/5 hover:text-foreground"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
