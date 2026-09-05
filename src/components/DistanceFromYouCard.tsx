"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type DistanceData = {
  userCity: string | null;
  userCountry: string | null;
  distanceKm: number | null;
  distanceMiles: number | null;
  userLat: number | null;
  userLon: number | null;
  myCity: string;
  myCountry: string;
};

export function DistanceFromYouCard() {
  const [data, setData] = useState<DistanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/where-am-i")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const milesText =
    data?.distanceMiles != null
      ? data.distanceMiles.toLocaleString()
      : "some";

  const locationText =
    data?.userCity && data?.userCountry
      ? `${data.userCity}, ${data.userCountry}`
      : "somewhere on Earth 🌍";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-2xl border border-border bg-foreground text-background"
    >
      {/* Map visualization area */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-foreground to-[#1a1411]">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Connection visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* My location (left) */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-12 w-12 rounded-full border-4 border-accent bg-accent/20 flex items-center justify-center">
              <span className="text-lg">👩‍💻</span>
            </div>
            <span className="mt-2 text-xs text-background/60">Me</span>
          </motion.div>

          {/* Dashed line connection */}
          <motion.div 
            className="mx-8 flex items-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="h-px w-24 border-t-2 border-dashed border-accent/60 md:w-32" />
            {data?.distanceMiles && (
              <motion.span 
                className="absolute left-1/2 -translate-x-1/2 -translate-y-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                {milesText} mi
              </motion.span>
            )}
          </motion.div>

          {/* User location (right) */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-12 w-12 rounded-full border-4 border-background/40 bg-background/20 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <span className="mt-2 text-xs text-background/60">You</span>
          </motion.div>
        </div>
      </div>

      {/* Text content */}
      <div className="p-6 text-center">
        {loading ? (
          <p className="text-background/60 text-sm">
            Calculating how far we are…
          </p>
        ) : (
          <>
            <p className="text-base leading-relaxed md:text-lg">
              I&apos;m based in{" "}
              <span className="font-semibold">
                {data?.myCity}, {data?.myCountry}
              </span>
              , roughly{" "}
              <span className="font-semibold text-accent">
                {milesText} miles
              </span>{" "}
              away from you in{" "}
              <span className="font-semibold">{locationText}</span>.
            </p>
            <p className="mt-3 text-xs text-background/40">
              Based on your IP address. No personal data is stored.
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}


