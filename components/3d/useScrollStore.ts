import { create } from "zustand";

interface ScrollStore {
  scrollY: number;
  scrollProgress: number;
  activeSection: string;
  setScrollY: (y: number) => void;
  setActiveSection: (section: string) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollY: 0,
  scrollProgress: 0,
  activeSection: "hero",
  setScrollY: (y: number) => {
    if (typeof document === "undefined") return;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    set({
      scrollY: y,
      scrollProgress: maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0,
    });
  },
  setActiveSection: (section: string) => set({ activeSection: section }),
}));
