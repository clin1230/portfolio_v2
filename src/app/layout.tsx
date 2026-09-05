import type { Metadata } from "next";
import { Gabarito, DM_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const gabarito = Gabarito({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Charlotte Lin — Full-Stack Developer",
  description: "Full-stack developer based in New York. Building seamless, thoughtful web experiences with React, C#, JavaScript, and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gabarito.variable} ${dmSans.variable} antialiased grain`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
