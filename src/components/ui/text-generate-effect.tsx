"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type TextGenerateEffectProps = Omit<React.ComponentProps<"div">, "children"> & {
  words: string;
  lead?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
};

function TextGenerateEffect({
  ref,
  words,
  lead,
  className,
  filter = true,
  duration = 0.35,
  staggerDelay = 0.028,
  ...props
}: TextGenerateEffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref as any, () => localRef.current as HTMLDivElement);

  const [scope, animate] = useAnimate();
  const fullText = React.useMemo(() => (lead ? `${lead} ${words}` : words), [lead, words]);
  const wordsArray = React.useMemo(() => fullText.split(" ").filter(Boolean), [fullText]);
  const leadWordsCount = React.useMemo(() => (lead ? lead.split(" ").filter(Boolean).length : 0), [lead]);

  React.useEffect(() => {
    if (scope.current) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration,
          delay: stagger(staggerDelay),
        },
      );
    }
  }, [animate, duration, filter, fullText, scope, staggerDelay]);

  return (
    <div
      className={cn("text-generate-effect", className)}
      data-slot="text-generate-effect"
      ref={localRef}
      {...(props as any)}
    >
      <motion.div ref={scope} className="text-generate-effect-content">
        {wordsArray.map((word, idx) => {
          const isLead = idx < leadWordsCount;
          return (
            <React.Fragment key={`${word}-${idx}`}>
              <motion.span
                className={cn(
                  "opacity-0 will-change-transform will-change-opacity will-change-filter inline-block",
                  isLead ? "subtitle-lead font-bold text-foreground" : "subtitle-body font-normal text-muted"
                )}
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {word}
              </motion.span>
              {" "}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}

export { TextGenerateEffect, type TextGenerateEffectProps };
export default TextGenerateEffect;
