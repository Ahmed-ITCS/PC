"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Detect hoverable elements
    const checkHoverTargets = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, [data-cursor], input, textarea, select, [role="button"]'
      );
      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          const text = el.getAttribute("data-cursor");
          if (text) setCursorText(text);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    };

    checkHoverTargets();
    const observer = new MutationObserver(checkHoverTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      style={{ x, y }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isPressed ? 0.8 : isHovering ? 1.5 : 1,
      }}
      transition={{ scale: { duration: 0.2, ease: "easeOut" } }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* Outer ring */}
        <motion.div
          className="w-10 h-10 rounded-full border border-white/80"
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
        />
        {/* Inner dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
        {/* Hover text */}
        {cursorText && (
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-6 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white font-medium"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {cursorText}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
