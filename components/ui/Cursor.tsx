"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Disable on touch-primary devices
    if ("ontouchstart" in window) return;
    setMounted(true);
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let ringScale = 1;
    let targetRingScale = 1;
    let rafId = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Snap dot
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;

      // Magnetic pull toward [data-magnetic] elements
      let magnetX = mouseX;
      let magnetY = mouseY;
      const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      magnetics.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        const radius = 80;
        if (dist < radius) {
          const strength = ((radius - dist) / radius) * 20;
          magnetX += ((cx - mouseX) / dist) * strength;
          magnetY += ((cy - mouseY) / dist) * strength;
        }
      });

      mouseX = magnetX;
      mouseY = magnetY;
    };

    const onMouseEnterInteractive = () => {
      isHovering = true;
      targetRingScale = 1.8;
      dot.style.opacity = "0";
    };

    const onMouseLeaveInteractive = () => {
      isHovering = false;
      targetRingScale = 1;
      dot.style.opacity = "1";
    };

    // Delegate interactive detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        onMouseEnterInteractive();
      } else if (isHovering) {
        onMouseLeaveInteractive();
      }
    };

    // RAF loop for ring interpolation
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ringScale += (targetRingScale - ringScale) * 0.12;

      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(${ringScale})`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#0369A1] pointer-events-none z-[9999] transition-opacity duration-150"
        style={{ willChange: "transform" }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full border border-[#0369A1]/50 pointer-events-none z-[9998]"
        style={{ willChange: "transform", transition: "opacity 0.15s" }}
      />
    </>
  );
}
