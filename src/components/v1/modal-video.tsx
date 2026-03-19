"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function ModalVideo() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Secondary illustration glow behind */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -z-10 -ml-28 -translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      >
        <svg
          width="1165"
          height="1012"
          viewBox="0 0 1165 1012"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-none opacity-30"
        >
          <ellipse
            cx="582"
            cy="506"
            rx="500"
            ry="400"
            fill="url(#secondaryGlow)"
          />
          <defs>
            <radialGradient
              id="secondaryGlow"
              cx="0.5"
              cy="0.5"
              r="0.5"
              gradientUnits="objectBoundingBox"
            >
              <stop stopColor="#4A73D5" stopOpacity="0.3" />
              <stop offset="1" stopColor="#4A73D5" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Video thumbnail */}
      <div className="mx-auto max-w-5xl">
        <button
          className="group relative flex w-full items-center justify-center rounded-2xl focus:outline-none focus-visible:ring-3 focus-visible:ring-[#4A73D5]/50"
          onClick={() => setModalOpen(true)}
          aria-label="Watch the video"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <figure className="relative w-full aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0a0a0a] border border-[#374151]">
            {/* Gradient overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A73D5]/5 via-transparent to-[#4A73D5]/10" />
            {/* Grid pattern for visual interest */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#4A73D5 1px, transparent 1px), linear-gradient(90deg, #4A73D5 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Subtle blue glow in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-[#4A73D5]/15 blur-3xl" />
            </div>
            {/* Dashboard mockup visual */}
            <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
              <div className="w-full max-w-2xl rounded-xl border border-[#374151]/50 bg-[#0f172a]/80 p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <div className="ml-4 h-3 w-48 rounded bg-[#374151]/40" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="rounded-lg bg-[#1e293b]/60 p-3">
                    <div className="h-2 w-12 rounded bg-[#4A73D5]/30 mb-2" />
                    <div className="h-4 w-16 rounded bg-[#4A73D5]/50" />
                  </div>
                  <div className="rounded-lg bg-[#1e293b]/60 p-3">
                    <div className="h-2 w-12 rounded bg-[#4A73D5]/30 mb-2" />
                    <div className="h-4 w-20 rounded bg-[#4A73D5]/40" />
                  </div>
                  <div className="rounded-lg bg-[#1e293b]/60 p-3">
                    <div className="h-2 w-12 rounded bg-[#4A73D5]/30 mb-2" />
                    <div className="h-4 w-14 rounded bg-green-500/40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="h-3 w-full rounded bg-[#374151]/30" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 w-3/4 rounded bg-[#374151]/25" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 w-5/6 rounded bg-[#374151]/20" />
                  </div>
                </div>
              </div>
            </div>
          </figure>
          {/* Play icon */}
          <span className="pointer-events-none absolute p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-gray-950 before:duration-300 group-hover:before:scale-110">
            <span className="relative flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
              >
                <path
                  fill="url(#playBtnGrad)"
                  fillRule="evenodd"
                  d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                  clipRule="evenodd"
                />
                <defs>
                  <linearGradient
                    id="playBtnGrad"
                    x1={10}
                    x2={10}
                    y1={0}
                    y2={20}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4A73D5" />
                    <stop offset={1} stopColor="#4A73D5" stopOpacity={0.72} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-medium leading-tight text-gray-300">
                Watch Demo
                <span className="text-gray-600"> - </span>
                1:00
              </span>
            </span>
          </span>
        </button>
      </div>
      {/* End: Video thumbnail */}

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 z-[99999] bg-black/70 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-[99999] flex px-4 py-6 sm:px-6">
          <div className="mx-auto flex h-full max-w-6xl items-center">
            <DialogPanel
              transition
              className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <iframe
                className="h-full w-full"
                src={modalOpen ? "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" : ""}
                title="ColdRelay Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
