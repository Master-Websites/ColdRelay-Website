"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

function parseValue(val: string): { prefix: string; number: number; suffix: string; decimals: number } {
  // Handle patterns like "95%+", "$0.55", "2-4hr", "5,000+"
  const match = val.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: val, decimals: 0 };
  
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, "");
  const suffix = match[3];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  
  return { prefix, number: parseFloat(numStr), suffix, decimals };
}

export function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");
  const parsed = useRef(parseValue(value));

  useEffect(() => {
    if (!isInView) return;

    const { prefix, number, suffix, decimals } = parsed.current;
    const duration = 2000;
    const startTime = performance.now();
    let raf: number;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = number * eased;
      
      const formatted = decimals > 0
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString();
      
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-3xl sm:text-4xl font-extrabold gradient-text" style={{ animation: "counter-glow 3s ease-in-out infinite" }}>
        {displayValue}
      </div>
      <div className="mt-2 text-sm text-white/40 font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}
