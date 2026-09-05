"use client";

import { useState, useTransition } from "react";
import {
  Layers,
  Sparkles,
  Users,
  Columns2,
  CalendarCheck,
  Mail,
  Coins,
  Sun,
  Moon,
} from "lucide-react";
import type { NotchItemData } from "./adaptive-notch-navigation-bar";
import { NotchNav } from "./adaptive-notch-navigation-bar";

export const YENESCHOOL_NAV_ITEMS: NotchItemData[] = [
  { id: "modules", label: "Modules", icon: Layers },
  { id: "pricing", label: "Pricing", icon: Coins },
  { id: "about", label: "About", icon: Users },
  { id: "compare", label: "Compare", icon: Columns2 },
  { id: "book", label: "Book Demo", icon: CalendarCheck, badge: "Free" },
  { id: "contact", label: "Contact", icon: Mail },
];

export interface YeneSchoolNavbarProps {
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
  children?: React.ReactNode;
}

export function YeneSchoolNotchNavbar({
  activeId = "modules",
  defaultActiveId = "modules",
  onActiveChange,
  children,
}: YeneSchoolNavbarProps) {
  const [currentId, setCurrentId] = useState<string>(activeId || defaultActiveId);
  const [isDark, setIsDark] = useState<boolean>(true);

  const handleActiveChange = (id: string) => {
    setCurrentId(id);
    onActiveChange?.(id);

    // Route navigation matching YeneSchool paths
    const routeMap: Record<string, string> = {
      modules: "/modules",
      pricing: "/#pricing",
      about: "/about",
      compare: "/vs-others",
      book: "/demo",
      contact: "/contact",
    };

    const target = routeMap[id];
    if (target && typeof window !== "undefined") {
      window.location.href = target;
    }
  };

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", nextDark);
      document.documentElement.classList.toggle("light", !nextDark);
      document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    }
  };

  const LogoSlot = (
    <a
      href="/"
      className="flex items-center gap-2 h-8.5 text-zinc-50 dark:text-zinc-950 select-none group"
      aria-label="YeneSchool Home"
    >
      <img
        src="/assets/logo.svg"
        alt="YeneSchool"
        className="size-6 object-contain filter drop-shadow group-hover:scale-105 transition-transform"
      />
      <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent dark:text-zinc-950">
        YeneSchool
      </span>
    </a>
  );

  const RightContentSlot = (
    <div className="flex items-center gap-2 h-8.5">
      {/* Theme Switcher */}
      <button
        type="button"
        onClick={handleToggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center justify-center size-7 rounded-full bg-zinc-800 text-zinc-300 hover:text-white dark:bg-zinc-300 dark:text-zinc-800 transition-colors"
      >
        {isDark ? <Sun className="size-3.5 text-amber-300" /> : <Moon className="size-3.5 text-blue-400" />}
      </button>

      {/* Book Demo Button */}
      <a
        href="/demo"
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-xs transition-transform active:scale-95"
      >
        <Sparkles className="size-3" />
        <span className="hidden sm:inline">Book Demo</span>
      </a>
    </div>
  );

  return (
    <NotchNav
      items={YENESCHOOL_NAV_ITEMS}
      activeId={currentId}
      position="top"
      logo={LogoSlot}
      rightContent={RightContentSlot}
      showLogo={true}
      showRightContent={true}
      onActiveChange={handleActiveChange}
    >
      {children}
    </NotchNav>
  );
}

export default YeneSchoolNotchNavbar;
