"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);

  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

export default function BlurText({
  text = "",
  delay = 100,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.05,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = [0.25, 0.1, 0.25, 1],
  onAnimationComplete,
  stepDuration = 0.45,
  as: Component = "p",
  id,
  style,
}) {
  const rawLines = useMemo(() => {
    return text.includes("\n") ? text.split("\n") : [text];
  }, [text]);

  const { lineStructure, totalCount } = useMemo(() => {
    let count = 0;
    const structure = rawLines.map((line) => {
      const parts = animateBy === "words" ? line.split(" ").filter(Boolean) : line.split("");
      return parts.map((part) => ({
        segment: part,
        index: count++,
      }));
    });
    return { lineStructure: structure, totalCount: count };
  }, [rawLines, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin, text]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(14px)", opacity: 0, transform: "translate3d(0,-35px,0)" }
        : { filter: "blur(14px)", opacity: 0, transform: "translate3d(0,35px,0)" },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.65,
        transform: direction === "top" ? "translate3d(0,4px,0)" : "translate3d(0,-4px,0)",
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        transform: "translate3d(0,0,0)",
      },
    ],
    [direction]
  );

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

  const keyframes = useMemo(() => buildKeyframes(from, to), [from, to]);

  return (
    <Component ref={ref} id={id} className={className} style={style}>
      {lineStructure.map((lineWords, lineIdx) => (
        <span
          key={lineIdx}
          className="blur-text-line"
          style={{
            display: rawLines.length > 1 ? "block" : "inline",
            overflow: "visible",
          }}
        >
          {lineWords.map(({ segment, index }, wordIdx) => {
            const isSeparator = segment === "|";
            return (
              <motion.span
                key={`${segment}-${index}`}
                initial={from}
                animate={inView ? keyframes : from}
                transition={{
                  duration: stepDuration * to.length,
                  delay: (index * delay) / 1000,
                  ease: easing,
                }}
                style={{
                  display: "inline-block",
                  willChange: "transform, filter, opacity",
                  paddingBottom: "0.14em",
                  verticalAlign: "bottom",
                  overflow: "visible",
                }}
                className={`blur-word${isSeparator ? " word-separator" : ""}`}
                onAnimationComplete={index === totalCount - 1 ? onAnimationComplete : undefined}
              >
                {segment === " " ? "\u00A0" : segment}
                {animateBy === "words" && wordIdx < lineWords.length - 1 && "\u00A0"}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
