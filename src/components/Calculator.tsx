"use client";

import * as React from "react";

/* ---------------- Pricing tiers (per mailbox) ---------------- */

const unitPriceTiers = [
  { min: 1, max: 199, unit: 1.0, label: "1–199" },
  { min: 200, max: 999, unit: 0.85, label: "200–999" },
  { min: 1000, max: 4999, unit: 0.7, label: "1,000–4,999" },
  { min: 5000, max: Infinity, unit: 0.55, label: "5,000+" },
];

function getUnitTier(qty: number) {
  for (const t of unitPriceTiers) {
    if (qty >= t.min && qty <= t.max) return t;
  }
  return unitPriceTiers[unitPriceTiers.length - 1];
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const money0 = (v: number) => Math.round(v).toLocaleString();
const money2 = (v: number) =>
  v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatInt = (n: number) => Math.round(n).toLocaleString();

function parseNumberLike(input: string | number | null | undefined): number {
  if (input == null) return NaN;
  const s = String(input).replace(/,/g, "").trim();
  if (s === "") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// < 1000 => 50 step
// >= 1000 => 1000 step
function stepForEmails(emailsPerDay: number) {
  return emailsPerDay < 1000 ? 50 : 1000;
}

function snapEmails(emailsPerDay: number) {
  const s = stepForEmails(emailsPerDay);
  return Math.round(emailsPerDay / s) * s;
}

/* ---------------- Width observer ---------------- */

function useElementWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = React.useState(1000);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setWidth(el.getBoundingClientRect().width || 0);
    update();

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } else {
      window.addEventListener("resize", update);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", update);
    };
  }, [ref]);

  return width;
}

/* ---------------- Icon ---------------- */

function CheckIcon({ color = "#4A73D5" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} opacity="0.18" />
      <path
        d="M9.2 12.6l1.7 1.8 3.9-4.2"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Main Component ---------------- */

interface CalculatorProps {
  minEmailsPerDay?: number;
  maxEmailsPerDay?: number;
  defaultEmailsPerDay?: number;
  leftTitle?: string;
  leftSubtitle?: string;
  helperLine?: string;
  socialProofLine?: string;
  gainTitle?: string;
  gainSubtitle?: string;
  gain1?: string;
  gain2?: string;
  rightEyebrow?: string;
  rightHeadlinePrefix?: string;
  rightHeadlineSuffix?: string;
  monthlyVolumePrefix?: string;
  monthlyVolumeSuffix?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  feature4?: string;
  feature5?: string;
  bulkDiscountLabel?: string;
  standardRateLabel?: string;
  yourRateLabel?: string;
  saveLabel?: string;
  ctaPrefix?: string;
  ctaSuffix?: string;
  ctaUrl?: string;
  stop1Label?: string;
  stop2Label?: string;
  stop3Label?: string;
  stop4Label?: string;
  stop1Value?: number;
  stop2Value?: number;
  stop3Value?: number;
  stop4Value?: number;
  bg?: string;
  leftPanel?: string;
  border?: string;
  text?: string;
  muted?: string;
  dim?: string;
  blue?: string;
  blue2?: string;
  track?: string;
  stackBreakpoint?: number;
}

export default function ColdRelayEmailCalculator(props: CalculatorProps) {
  const {
    // Range
    minEmailsPerDay = 100,
    maxEmailsPerDay = 20000,
    defaultEmailsPerDay = 100,

    // Copy
    leftTitle = "How many emails per day do you want to send?",
    leftSubtitle = "We'll calculate how many mailboxes + domains you need.",
    helperLine = "Each mailbox can send up to 4 emails/day. Each domain holds 100–150 mailboxes. We'll calculate the mailbox + domain requirements for you.",
    socialProofLine = "Most teams start between 1,000–3,000 emails/day.",

    gainTitle = "What you'll get",
    gainSubtitle = "Here's what teams typically unlock with ColdRelay:",
    gain1 = "Faster scale with predictable costs",
    gain2 = "Lower unit price at higher volume",

    rightEyebrow = "Growth plan",
    rightHeadlinePrefix = "Start sending",
    rightHeadlineSuffix = "cold emails/day",
    monthlyVolumePrefix = "≈",
    monthlyVolumeSuffix = "emails/month",

    feature1 = "Unlimited team seats",
    feature2 = "Mailbox + domain requirements calculated",
    feature3 = "Tier-based pricing as you scale",
    feature4 = "Deliverability-friendly sending model",
    feature5 = "Priority onboarding & support",

    bulkDiscountLabel = "Bulk discount applied ✅",
    standardRateLabel = "Standard",
    yourRateLabel = "Your rate",
    saveLabel = "Save",

    ctaPrefix = "Start Sending",
    ctaSuffix = "Emails/Day 🚀",
    ctaUrl = "https://app.coldrelay.com/auth/register",

    // Slider stop labels
    stop1Label = "Starter",
    stop2Label = "Growth",
    stop3Label = "Scale",
    stop4Label = "Agency",

    stop1Value = 100,
    stop2Value = 1000,
    stop3Value = 3000,
    stop4Value = 10000,

    // Theme
    bg = "#0a0a0a",
    leftPanel = "#111827",
    border = "rgba(255,255,255,0.06)",
    text = "#F4F4F5",
    muted = "rgba(244,244,245,0.68)",
    dim = "rgba(244,244,245,0.45)",
    blue = "#4A73D5",
    blue2 = "#6B8FE6",
    track = "rgba(255,255,255,0.10)",

    // Responsive
    stackBreakpoint = 820,
  } = props;

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const width = useElementWidth(wrapperRef);
  const stacked = width < stackBreakpoint;

  // Main value
  const init = clamp(
    snapEmails(defaultEmailsPerDay),
    minEmailsPerDay,
    maxEmailsPerDay
  );
  const [emailsPerDay, setEmailsPerDay] = React.useState(init);

  // Input state
  const [inputValue, setInputValue] = React.useState(formatInt(init));
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!isEditing) setInputValue(formatInt(emailsPerDay));
  }, [emailsPerDay, isEditing]);

  // Derived outputs
  const mailboxesNeeded = Math.ceil(emailsPerDay / 4);
  const minDomains = Math.ceil(mailboxesNeeded / 150);
  const maxDomains = Math.ceil(mailboxesNeeded / 100);

  const tier = getUnitTier(mailboxesNeeded);
  const total = mailboxesNeeded * tier.unit;

  const standardRate = 1.0;
  const standardPrice = mailboxesNeeded * standardRate;
  const savings = Math.max(0, standardPrice - total);
  const monthlyEmails = emailsPerDay * 30;

  // Animated price
  const [animatedTotal, setAnimatedTotal] = React.useState(total);
  const prevTotalRef = React.useRef(total);
  React.useEffect(() => {
    let raf: number;
    const start = prevTotalRef.current;
    const end = total;
    const duration = 280;
    const startTime = performance.now();

    function animate(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setAnimatedTotal(start + (end - start) * ease);
      if (t < 1) raf = requestAnimationFrame(animate);
      else prevTotalRef.current = end;
    }

    if (start !== end) raf = requestAnimationFrame(animate);
    else setAnimatedTotal(end);

    return () => cancelAnimationFrame(raf);
  }, [total]);

  /* -------- slider logic -------- */

  const sliderRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  function getEmailsFromClientX(clientX: number) {
    const rect = sliderRef.current!.getBoundingClientRect();
    let p = (clientX - rect.left) / rect.width;
    p = clamp(p, 0, 1);
    const raw = minEmailsPerDay + p * (maxEmailsPerDay - minEmailsPerDay);
    const snapped = snapEmails(raw);
    return clamp(snapped, minEmailsPerDay, maxEmailsPerDay);
  }

  function down(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    setShowTooltip(true);
    const x =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setIsEditing(false);
    setEmailsPerDay(getEmailsFromClientX(x));
  }

  function move(e: React.MouseEvent | React.TouchEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    const x =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setEmailsPerDay(getEmailsFromClientX(x));
  }

  function up() {
    dragging.current = false;
    setShowTooltip(false);
  }

  function onKeyDownSlider(e: React.KeyboardEvent) {
    setShowTooltip(true);
    const s = stepForEmails(emailsPerDay);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setEmailsPerDay((v) => clamp(v - s, minEmailsPerDay, maxEmailsPerDay));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setEmailsPerDay((v) => clamp(v + s, minEmailsPerDay, maxEmailsPerDay));
    }
  }

  const percent =
    ((emailsPerDay - minEmailsPerDay) / (maxEmailsPerDay - minEmailsPerDay)) *
    100;

  /* -------- input handlers -------- */

  function commitInput(nextRaw: string) {
    const n = parseNumberLike(nextRaw);
    if (!Number.isFinite(n)) {
      setInputValue(formatInt(emailsPerDay));
      return;
    }
    const clamped = clamp(n, minEmailsPerDay, maxEmailsPerDay);
    const snapped = clamp(
      snapEmails(clamped),
      minEmailsPerDay,
      maxEmailsPerDay
    );
    setEmailsPerDay(snapped);
    setInputValue(formatInt(snapped));
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsEditing(true);
    setInputValue(e.target.value);
  }

  function onInputBlur() {
    setIsEditing(false);
    commitInput(inputValue);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputValue(formatInt(emailsPerDay));
      e.currentTarget.blur();
    }
  }

  /* -------- CTA hover polish -------- */

  const [ctaHover, setCtaHover] = React.useState(false);
  const [ctaDown, setCtaDown] = React.useState(false);

  /* ---------------- styles ---------------- */

  const SECTION_GAP = 24;
  const BULLET_GAP = 12;

  const containerStyle: React.CSSProperties = {
    width: "100%",
    padding: 22,
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    boxSizing: "border-box",
  };

  const outerWrapStyle: React.CSSProperties = {
    position: "relative",
    maxWidth: 1040,
    margin: "auto",
  };

  const outerGlowStyle: React.CSSProperties = {
    position: "absolute",
    inset: -140,
    background: `radial-gradient(60% 50% at 25% 30%, rgba(74,115,213,0.14) 0%, rgba(107,143,230,0.08) 32%, rgba(0,0,0,0) 70%)`,
    filter: "blur(22px)",
    pointerEvents: "none",
    zIndex: 0,
  };

  const outerStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    background: bg,
    borderRadius: 28,
    border: `1px solid ${border}`,
    display: "grid",
    gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
    gap: 18,
    padding: 18,
    boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
    overflow: "visible",
  };

  const leftCardStyle: React.CSSProperties = {
    position: "relative",
    background: leftPanel,
    borderRadius: 20,
    padding: 26,
    border: `1px solid ${border}`,
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.35)",
    overflow: "visible",
    zIndex: 2,
  };

  const leftSheenStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.00) 55%)",
    pointerEvents: "none",
    borderRadius: 20,
  };

  const rightCardStyle: React.CSSProperties = {
    padding: 26,
    display: "flex",
    flexDirection: "column",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    zIndex: 1,
  };

  const h1Style: React.CSSProperties = {
    color: text,
    fontSize: 34,
    margin: 0,
    letterSpacing: "-0.03em",
    lineHeight: "1.05em",
    fontWeight: 800,
  };

  const pStyle: React.CSSProperties = {
    color: muted,
    margin: 0,
    fontSize: 16,
    lineHeight: "1.45em",
    letterSpacing: "-0.01em",
  };

  const helperStyle: React.CSSProperties = {
    color: dim,
    margin: 0,
    fontSize: 13,
    lineHeight: "1.4em",
    letterSpacing: "-0.01em",
  };

  const socialProofStyle: React.CSSProperties = {
    color: blue,
    margin: 0,
    fontSize: 13,
    lineHeight: "1.35em",
    fontWeight: 800,
    letterSpacing: "-0.01em",
  };

  const inputRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: SECTION_GAP,
  };

  const inputLabelStyle: React.CSSProperties = {
    color: dim,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    minWidth: 110,
  };

  const inputBoxStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${border}`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: text,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "-0.03em",
  };

  const inputSuffixStyle: React.CSSProperties = {
    color: dim,
    fontSize: 14,
    fontWeight: 800,
    whiteSpace: "nowrap",
  };

  const sliderBlockStyle: React.CSSProperties = {
    marginTop: 16,
    position: "relative",
    paddingBottom: 96,
    overflow: "visible",
  };

  const sliderTrackStyle: React.CSSProperties = {
    height: 10,
    background: track,
    borderRadius: 999,
    position: "relative",
    cursor: "pointer",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
    touchAction: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
  };

  const sliderActiveStyle: React.CSSProperties = {
    position: "absolute",
    height: 10,
    borderRadius: 999,
    width: `${percent}%`,
    background: `linear-gradient(90deg,${blue} 0%,${blue2} 100%)`,
    boxShadow: "0 0 18px rgba(74,115,213,0.45)",
  };

  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    left: `calc(${percent}% - 9px)`,
    top: "50%",
    transform: "translateY(-50%)",
    width: 18,
    height: 36,
    borderRadius: 12,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
    border: "1px solid rgba(255,255,255,0.20)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.55)",
    pointerEvents: "none",
  };

  const minMaxStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    color: dim,
    fontSize: 14,
    marginTop: 8,
  };

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    left: `calc(${percent}% )`,
    top: 50,
    transform: "translateX(-50%)",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    border: `1px solid ${border}`,
    color: text,
    fontWeight: 900,
    fontSize: 20,
    letterSpacing: "-0.03em",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    zIndex: 10,
    opacity: showTooltip ? 1 : 0,
    visibility: showTooltip ? "visible" : "hidden",
    transition: "opacity 160ms ease, visibility 160ms ease",
  };

  const unitLineStyle: React.CSSProperties = {
    color: dim,
    fontSize: 13,
    marginTop: 78,
    letterSpacing: "-0.01em",
    lineHeight: "1.35em",
  };

  const stopRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
    marginTop: 14,
    color: dim,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "-0.01em",
  };

  const stopItemStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "center",
    textAlign: "center",
  };

  const stopDotStyle: React.CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "rgba(255,255,255,0.22)",
  };

  const resultGridStyle: React.CSSProperties = {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: stacked ? "1fr" : "1fr 1fr",
    gap: 12,
  };

  const resultPillStyle: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(0,0,0,0.18)",
    border: "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  };

  const resultLabelStyle: React.CSSProperties = {
    color: dim,
    fontSize: 13,
    fontWeight: 800,
  };
  const resultValueStyle: React.CSSProperties = {
    color: text,
    fontSize: 18,
    fontWeight: 900,
  };

  const dividerStyle: React.CSSProperties = {
    height: 1,
    background: "rgba(255,255,255,0.06)",
    marginTop: SECTION_GAP,
    marginBottom: SECTION_GAP,
  };

  const gainTitleStyle: React.CSSProperties = {
    color: text,
    fontSize: 22,
    margin: 0,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  };

  const listStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: BULLET_GAP,
    marginTop: 12,
  };

  const listItemStyle: React.CSSProperties = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    color: muted,
    fontSize: 16,
    letterSpacing: "-0.01em",
  };

  const eyebrowStyle: React.CSSProperties = {
    color: dim,
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    margin: 0,
  };

  const rightHeadlineStyle: React.CSSProperties = {
    color: text,
    fontSize: 30,
    margin: 0,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: "1.1em",
  };

  const priceRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginTop: SECTION_GAP,
  };

  const priceBigStyle: React.CSSProperties = {
    fontSize: 74,
    fontWeight: 900,
    color: text,
    letterSpacing: "-0.05em",
    lineHeight: "0.95em",
  };

  const perMoStyle: React.CSSProperties = {
    fontSize: 24,
    color: dim,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  };

  const monthlyVolumeStyleObj: React.CSSProperties = {
    color: blue,
    fontSize: 15,
    fontWeight: 800,
    marginTop: 10,
    letterSpacing: "-0.01em",
  };

  const summaryPillStyle: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    marginTop: 18,
    color: muted,
    background: "rgba(0,0,0,0.18)",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    letterSpacing: "-0.01em",
  };

  const discountBoxStyle: React.CSSProperties = {
    marginTop: SECTION_GAP,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(74, 115, 213, 0.08)",
    border: "1px solid rgba(74, 115, 213, 0.18)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const discountTitleStyle: React.CSSProperties = {
    color: "#6B8FE6",
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: "-0.01em",
    margin: 0,
  };

  const discountRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    color: muted,
    fontSize: 14,
  };

  const ctaStyle: React.CSSProperties = {
    marginTop: SECTION_GAP,
    background: `linear-gradient(180deg, #4A73D5 0%, #3A5DB5 100%)`,
    padding: "18px 16px",
    borderRadius: 999,
    color: "#fff",
    fontWeight: 900,
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid rgba(255,255,255,0.14)",
    transform: ctaDown
      ? "translateY(1px) scale(0.99)"
      : ctaHover
        ? "translateY(-2px)"
        : "translateY(0)",
    boxShadow: ctaHover
      ? "0 25px 60px rgba(0,0,0,0.40), 0 0 26px rgba(74,115,213,0.22), inset 0 1px 0 rgba(255,255,255,0.25)"
      : "0 18px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.20)",
    transition:
      "transform 160ms ease, box-shadow 220ms ease, filter 160ms ease",
    filter: ctaHover ? "brightness(1.04)" : "brightness(1)",
  };

  const arrowStyle: React.CSSProperties = {
    opacity: 0.9,
    fontWeight: 900,
    marginLeft: 6,
  };

  function renderStop(label: string, value: number) {
    return (
      <div key={label} style={stopItemStyle}>
        <div style={stopDotStyle} />
        <div>{label}</div>
        <div style={{ color: muted }}>{formatInt(value)}/day</div>
      </div>
    );
  }

  return (
    <div style={containerStyle} ref={wrapperRef}>
      <div style={outerWrapStyle}>
        <div style={outerGlowStyle} />

        <div style={outerStyle}>
          {/* LEFT */}
          <div style={leftCardStyle}>
            <div style={leftSheenStyle} />

            <h2 style={h1Style}>{leftTitle}</h2>
            <p style={{ ...pStyle, marginTop: 12 }}>{leftSubtitle}</p>
            <p style={{ ...helperStyle, marginTop: 12 }}>{helperLine}</p>
            <p style={{ ...socialProofStyle, marginTop: 12 }}>
              {socialProofLine}
            </p>

            <div style={inputRowStyle}>
              <div style={inputLabelStyle}>Emails / day</div>
              <div style={inputBoxStyle}>
                <input
                  value={inputValue}
                  onChange={onInputChange}
                  onFocus={() => setIsEditing(true)}
                  onBlur={onInputBlur}
                  onKeyDown={onInputKeyDown}
                  inputMode="numeric"
                  style={inputStyle}
                  aria-label="Emails per day"
                />
                <div style={inputSuffixStyle}>emails/day</div>
              </div>
            </div>

            <div style={sliderBlockStyle}>
              <div
                ref={sliderRef}
                style={sliderTrackStyle}
                onMouseDown={down}
                onMouseMove={move}
                onMouseUp={up}
                onMouseLeave={up}
                onMouseEnter={() => setShowTooltip(true)}
                onTouchStart={down}
                onTouchMove={move}
                onTouchEnd={up}
                role="slider"
                tabIndex={0}
                aria-valuemin={minEmailsPerDay}
                aria-valuemax={maxEmailsPerDay}
                aria-valuenow={emailsPerDay}
                aria-label="Emails per day slider"
                onKeyDown={onKeyDownSlider}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              >
                <div style={sliderActiveStyle} />
                <div style={thumbStyle} />
              </div>

              <div style={minMaxStyle}>
                <span>{formatInt(minEmailsPerDay)}</span>
                <span>{formatInt(maxEmailsPerDay)}</span>
              </div>

              <div style={tooltipStyle}>
                {formatInt(emailsPerDay)} emails/day
              </div>

              <div style={stopRowStyle}>
                {renderStop(stop1Label, stop1Value)}
                {renderStop(stop2Label, stop2Value)}
                {renderStop(stop3Label, stop3Value)}
                {renderStop(stop4Label, stop4Value)}
              </div>

              <div style={unitLineStyle}>
                You&apos;ll need{" "}
                <b style={{ color: text }}>
                  {mailboxesNeeded.toLocaleString()}
                </b>{" "}
                mailboxes (up to 4 emails/day each) and{" "}
                <b style={{ color: text }}>
                  {minDomains.toLocaleString()}–{maxDomains.toLocaleString()}
                </b>{" "}
                domains (100–150 mailboxes/domain).
              </div>

              <div style={resultGridStyle}>
                <div style={resultPillStyle}>
                  <div style={resultLabelStyle}>Mailboxes needed</div>
                  <div style={resultValueStyle}>
                    {mailboxesNeeded.toLocaleString()}
                  </div>
                </div>

                <div style={resultPillStyle}>
                  <div style={resultLabelStyle}>Domains needed</div>
                  <div style={resultValueStyle}>
                    {minDomains.toLocaleString()}–{maxDomains.toLocaleString()}
                  </div>
                </div>

                <div style={resultPillStyle}>
                  <div style={resultLabelStyle}>Pricing tier</div>
                  <div style={resultValueStyle}>{tier.label}</div>
                </div>

                <div style={resultPillStyle}>
                  <div style={resultLabelStyle}>Price per mailbox</div>
                  <div style={resultValueStyle}>${money2(tier.unit)}</div>
                </div>
              </div>
            </div>

            <div style={dividerStyle} />

            <div>
              <h3 style={gainTitleStyle}>{gainTitle}</h3>
              <p style={{ ...pStyle, marginTop: 8 }}>{gainSubtitle}</p>

              <div style={listStyle}>
                <div style={listItemStyle}>
                  <CheckIcon />
                  <span>{gain1}</span>
                </div>
                <div style={listItemStyle}>
                  <CheckIcon />
                  <span>{gain2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={rightCardStyle}>
            <p style={eyebrowStyle}>{rightEyebrow}</p>

            <h3 style={{ ...rightHeadlineStyle, marginTop: 8 }}>
              {rightHeadlinePrefix} {formatInt(emailsPerDay)}{" "}
              {rightHeadlineSuffix}
            </h3>

            <div style={priceRowStyle}>
              <div style={priceBigStyle}>${money0(animatedTotal)}</div>
              <div style={perMoStyle}>/mo</div>
            </div>

            <div style={monthlyVolumeStyleObj}>
              {monthlyVolumePrefix}
              {formatInt(monthlyEmails)} {monthlyVolumeSuffix}
            </div>

            <div style={summaryPillStyle}>
              <span style={{ color: text, fontWeight: 900 }}>
                {formatInt(emailsPerDay)} emails/day
              </span>
              <span style={{ opacity: 0.55 }}>•</span>
              <span style={{ color: text, fontWeight: 900 }}>
                {mailboxesNeeded.toLocaleString()} mailboxes
              </span>
              <span style={{ opacity: 0.55 }}>•</span>
              <span>
                {minDomains.toLocaleString()}–{maxDomains.toLocaleString()}{" "}
                domains
              </span>
            </div>

            <div style={discountBoxStyle}>
              <p style={discountTitleStyle}>{bulkDiscountLabel}</p>

              <div style={discountRowStyle}>
                <span>
                  {standardRateLabel}:{" "}
                  <b style={{ color: text }}>${money2(standardRate)}</b>
                  /mailbox
                </span>
                <span style={{ opacity: 0.45 }}>•</span>
                <span>
                  {yourRateLabel}:{" "}
                  <b style={{ color: text }}>${money2(tier.unit)}</b>
                  /mailbox
                </span>
              </div>

              <div style={discountRowStyle}>
                <span>
                  {saveLabel}:{" "}
                  <b style={{ color: "#6B8FE6" }}>${money0(savings)}/mo</b>
                </span>
              </div>
            </div>

            <div style={{ ...listStyle, marginTop: SECTION_GAP }}>
              {[feature1, feature2, feature3, feature4, feature5]
                .filter(Boolean)
                .map((f, i) => (
                  <div key={i} style={listItemStyle}>
                    <CheckIcon />
                    <span>{f}</span>
                  </div>
                ))}
            </div>

            <div style={{ marginTop: "auto" }}>
              <div
                style={ctaStyle}
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => {
                  setCtaHover(false);
                  setCtaDown(false);
                }}
                onMouseDown={() => setCtaDown(true)}
                onMouseUp={() => setCtaDown(false)}
                onTouchStart={() => setCtaDown(true)}
                onTouchEnd={() => setCtaDown(false)}
                onClick={() => {
                  window.location.href = ctaUrl!;
                }}
              >
                {ctaPrefix} {formatInt(emailsPerDay)} {ctaSuffix}
                <span style={arrowStyle}>↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
