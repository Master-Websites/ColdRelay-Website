"use client";

import { useState, useEffect } from "react";
import ModalVideo from "./modal-video";

const volumes = ["10,000", "50,000", "100,000", "250,000", "500,000"];

function AnimatedVolume() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % volumes.length);
        setIsVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[170px] text-center">
      <span
        className={`inline-block text-[#4A73D5] transition-all duration-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {volumes[index]}
      </span>
    </span>
  );
}

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-20">
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/30 bg-[#4A73D5]/10 px-4 py-1.5"
              data-aos="fade-up"
            >
              <span className="text-sm font-medium text-[#7B9BE0]">
                As low as $0.55/mailbox
              </span>
            </div>

            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              What would <AnimatedVolume /> more cold emails do to your pipeline?
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-xl text-gray-300"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Advanced Azure cold email infrastructure. 150 mailboxes per domain — not 2. Auto DNS. Auto warmup. 99% inbox guaranteed. Ready in hours, not weeks.
              </p>
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn group mb-4 w-full rounded-full bg-linear-to-t from-[#3A5DB5] to-[#4A73D5] bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="https://app.coldrelay.com/auth/register"
                  >
                    <span className="relative inline-flex items-center">
                      From $0.55/mailbox
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div>
                <div data-aos="fade-up" data-aos-delay={600}>
                  <a
                    className="btn relative w-full rounded-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 border border-[#374151] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="#calculator"
                  >
                    See Pricing
                  </a>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div
              className="mt-10 flex flex-col items-center gap-2"
              data-aos="fade-up"
              data-aos-delay={800}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-[#4A73D5]"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-400">Trusted by 200+ outbound teams</p>
            </div>

            {/* Video Modal Section */}
            <div className="mx-auto mt-12" data-aos="fade-up" data-aos-delay={900}>
              <ModalVideo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
