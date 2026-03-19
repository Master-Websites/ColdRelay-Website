"use client";

import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(74, 115, 213, 0.15) 0%, rgba(74, 115, 213, 0.05) 40%, transparent 70%)",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -30%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary gradient orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(107, 143, 230, 0.1) 0%, rgba(53, 88, 176, 0.05) 40%, transparent 70%)",
          top: "30%",
          right: "-10%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary accent orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(74, 115, 213, 0.08) 0%, transparent 60%)",
          bottom: "10%",
          left: "10%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}
