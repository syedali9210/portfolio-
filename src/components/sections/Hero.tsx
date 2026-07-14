import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import LiveClock from "@/components/LiveClock";
import SectionDivider from "@/components/SectionDivider";

const INFO_ITEMS = [
  { icon: "/images/profile-icon-role.svg", label: "Design Engineer", href: undefined, full: true },
  { icon: "/images/profile-icon-location.svg", label: "Bengaluru, India", href: undefined },
  { icon: "/images/profile-icon-phone.svg", label: "+91 7765863700", href: "tel:+917765863700" },
  {
    icon: "/images/profile-icon-email.svg",
    label: "syedwali9286@gmail.com",
    href: "mailto:syedwali9286@gmail.com",
  },
];

const DOCK_COLUMN_A = {
  icons: ["/images/dock-icon-16.png", "/images/dock-icon-22.png", "/images/dock-icon-23.png", "/images/dock-icon-24.png"],
  shot: "/images/dock-shot-79.png",
};

const DOCK_COLUMN_C = {
  icons: [
    "/images/dock-icon-17.png",
    "/images/dock-icon-21.png",
    "/images/icon-github.svg",
    "/images/dock-icon-27.png",
    "/images/dock-icon-28.png",
    "/images/icon-supabase.svg",
  ],
  shots: ["/images/dock-shot-76.png", "/images/dock-shot-77.png", "/images/dock-shot-78.png"],
};

function DockIconRow({ icons }: { icons: string[] }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border-[0.5px] border-border bg-[#080808] px-3 py-3">
      {icons.map((src, i) => (
        <div
          key={i}
          className="relative flex size-13 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black shadow-[inset_0_0_20px_0_rgba(48,48,48,0.25)]"
        >
          <Image src={src} alt="" width={32} height={32} className="object-contain" />
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative w-full">
      <div className="relative mx-auto hidden h-[280px] w-full max-w-[1040px] border-x-[0.5px] border-border sm:block sm:h-[340px] lg:h-[434px]">
        <Image
          src="/images/hero-banner-graphic.svg"
          alt=""
          fill
          className="pointer-events-none select-none object-cover"
          priority
        />
      </div>

      {/* Profile bar */}
      <FadeIn>
        <div className="screen-line-bottom mx-auto flex w-full max-w-[1040px] flex-col border-x-[0.5px] border-border md:flex-row md:items-start md:justify-between">
          <div className="flex w-full flex-col">
            <div className="screen-line-bottom flex items-center gap-2 px-4 py-3">
              <div className="relative size-[47px] shrink-0 overflow-hidden rounded-full border-[0.5px] border-border bg-[#161618] shadow-[inset_0_0_10px_0_#232323]">
                <Image src="/images/profile-avatar.jpg" alt="Syed Ali" fill className="object-cover" />
              </div>
              <div className="border-r-[0.5px] border-border pr-4">
                <p className="text-xl font-medium text-[#979797]">Syed Ali</p>
                <p className="bg-gradient-to-b from-[#d97757] to-[#733f2e] bg-clip-text text-xs text-transparent">
                  Design Engineer
                </p>
              </div>
            </div>

            <div className="screen-line-bottom grid grid-cols-1 gap-x-4 gap-y-3 p-4 sm:grid-cols-2">
              {INFO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 ${item.full ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-md border-[0.5px] border-white/10 bg-[#27272a]">
                    <Image src={item.icon} alt="" width={16} height={16} />
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-[#fafafa] hover:underline">
                      {item.label}
                    </a>
                  ) : (
                    <p className="text-sm text-[#fafafa]">{item.label}</p>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-4">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border-[0.5px] border-white/10 bg-[#27272a]">
                  <Image src="/images/profile-icon-clock.svg" alt="" width={16} height={16} />
                </div>
                <LiveClock />
              </div>
            </div>

            <div className="px-4 py-4">
              <p className="text-lg text-[#7a7a7a] sm:text-xl">
                The guy who designs things and brings them to life, cuz why not. Engineering taught
                me to do things the unconventional way.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center gap-4 border-t-[0.5px] border-border p-4 md:justify-start md:border-t-0 md:border-b-[0.5px]">
            <div className="relative flex size-12 items-center justify-center rounded-full bg-black shadow-[inset_0_0_20px_0_rgba(48,48,48,0.25)]">
              <Image src="/images/dock-icon-16.png" alt="" width={20} height={20} className="rounded" />
            </div>
            <button
              type="button"
              aria-label="Theme toggle (coming soon)"
              disabled
              className="flex size-[42px] items-center justify-center rounded-full border-[0.5px] border-[#39393d] bg-[#262628] shadow-[inset_0_0_10px_0_#232323] disabled:cursor-not-allowed"
            >
              <Image src="/images/mode-night-icon-2.svg" alt="" width={18} height={18} />
            </button>
          </div>
        </div>
      </FadeIn>

      <SectionDivider />

      {/* Dock + Yapping */}
      <div className="screen-line-top screen-line-bottom mx-auto w-full max-w-[1040px] border-x-[0.5px] border-border">
        <div className="grid grid-cols-1 gap-6 px-4 py-10 sm:px-8 md:grid-cols-3">
          <FadeIn delay={0.05} className="flex flex-col gap-3">
            <DockIconRow icons={DOCK_COLUMN_A.icons} />
            <div className="overflow-hidden rounded-xl border-[0.5px] border-border bg-[#080808] p-3">
              <div className="relative aspect-[274/151] w-full overflow-hidden rounded-[14px] shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]">
                <Image src={DOCK_COLUMN_A.shot} alt="Framer workspace screenshot" fill className="object-cover" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 rounded-xl border-[0.5px] border-border bg-[#080808] p-3">
              <Image src="/images/window-controls-active.svg" alt="" width={46} height={10} />
              <div className="flex gap-3">
                <div className="relative aspect-[200/230] w-full overflow-hidden rounded-xl shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]">
                  <Image src="/images/dock-shot-80.png" alt="FigJam board screenshot" fill className="object-cover" />
                </div>
                <div className="flex w-24 shrink-0 flex-col gap-3">
                  <div className="flex flex-1 items-center justify-center rounded-md bg-black shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]">
                    <Image src="/images/dock-icon-16.png" alt="" width={28} height={28} />
                  </div>
                  <div className="flex-1 rounded-md bg-black shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]" />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-3">
            <DockIconRow icons={DOCK_COLUMN_C.icons} />
            <div className="flex gap-2 overflow-hidden rounded-xl border-[0.5px] border-border bg-[#080808] p-3">
              <div className="relative aspect-[240/155] w-2/3 overflow-hidden rounded-lg shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]">
                <Image src={DOCK_COLUMN_C.shots[0]} alt="Antigravity IDE screenshot" fill className="object-cover" />
              </div>
              <div className="flex w-1/3 flex-col gap-1.5">
                <div className="relative flex-1 overflow-hidden rounded shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]">
                  <Image src={DOCK_COLUMN_C.shots[1]} alt="" fill className="object-cover" />
                </div>
                <div className="relative flex-1 overflow-hidden rounded shadow-[inset_0_0_33px_0_rgba(48,48,48,0.25)]">
                  <Image src={DOCK_COLUMN_C.shots[2]} alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Yapping — runs edge-to-edge within the dock box, matching Figma (no horizontal inset) */}
        <div className="flex flex-col">
          <div className="screen-line-top screen-line-bottom flex items-center justify-between px-3 py-1 sm:px-4">
            <p className="text-base text-[#7a7a7a]">*Yapping each aspect</p>
            <span className="rotate-90 text-[#7a7a7a]">{">"}</span>
          </div>

          {[
            {
              n: "01",
              text: "I never open Figma first. I start with the problem, sit with it, understand what the user is actually struggling with before a single screen exists. Design without that is just decoration.",
            },
            {
              n: "02",
              text: "once the problem is clear, I build flows and interfaces around one thing, clarity. Every screen gets stripped down until only what earns its place stays. If it does not help the user move forward, it gets cut, no matter how nice it looks.",
            },
          ].map((item) => (
            <div
              key={item.n}
              className="screen-line-bottom flex gap-6 px-3 py-4 sm:gap-10 sm:px-4"
            >
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm text-white">[{item.n}]</span>
                <Image src="/images/numbered-item-arrow.svg" alt="" width={21} height={12} />
              </div>
              <p className="text-lg text-[#7a7a7a] sm:text-xl">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
