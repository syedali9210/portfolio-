"use client";

import { useTheme } from "next-themes";
import { MailIcon, PhoneIcon } from "lucide-react";
import ParticleImage from "@/components/ParticleImage";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import GithubIcon from "@/components/icons/GithubIcon";

const EMAIL = "syedwali9286@gmail.com";

const SOCIALS = [
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/syedali138/",
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/syedali9210",
  },
];

export default function Contact() {
  const { resolvedTheme } = useTheme();
  const particleColor = resolvedTheme === "light" ? "#9a9a9a" : "#6b6b6b";

  return (
    <section id="contact" className="relative flex flex-col items-center px-6 py-12 sm:py-20">
      {/* Headline overlays the particle mark but doesn't block pointer events,
          so cursor repulsion works across the whole shape */}
      <div className="relative h-[480px] w-full max-w-[840px]">
        <ParticleImage
          imageConfig={{ image: "/images/syed-logo-mark.svg", mode: "fit", scale: 8 }}
          particleCount={50}
          particleSize={5}
          particleColor="single"
          singleColor={particleColor}
          hoverEnabled={false}
          style={{ width: "100%", height: "100%" }}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-2xl font-medium text-foreground">Let&apos;s have a conversation now</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          <MailIcon className="size-4" />
          {EMAIL}
        </a>
        <a
          href="tel:+917765863700"
          className="inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          <PhoneIcon className="size-4" />
          +91 7765863700
        </a>
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <social.icon className="size-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
