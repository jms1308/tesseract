import React, { useState, useRef, useEffect, useCallback } from "react";

const MIN_RANGE = 20; // smaller min range for shorter words
const ROTATION_DEG = -1.5; // subtle tilt to match the gradient/vibe or flat
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function TextSlider({ text = "o'stiramiz", className = "" }) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(160);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) {
        setTextWidth(measureRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [text]);

  return (
    <span className="relative inline-flex items-center select-none align-middle justify-center px-1">
      {/* Hidden measure copy */}
      <span
        ref={measureRef}
        className={`absolute -left-[9999px] whitespace-nowrap pointer-events-none ${className}`}
      >
        {text}
      </span>
      <OpenSourceSlider text={text} width={textWidth} textClassName={className} />
    </span>
  );
}

interface OpenSourceSliderProps {
  text: string;
  width: number;
  height?: number;
  handleSize?: number;
  textClassName?: string;
}

function OpenSourceSlider({ text, width: initialWidth, handleSize = 20, textClassName = "" }: OpenSourceSliderProps) {
  const width = initialWidth > 0 ? initialWidth + 56 : 0;
  
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(width);
  const [draggingHandle, setDraggingHandle] = useState<string | null>(null);
  const [dynamicRotation, setDynamicRotation] = useState(ROTATION_DEG);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const dragRef = useRef<any>(null);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
  }, [left, right]);
  
  useEffect(() => {
    if (width > 0) {
      const handleMidpoint = (left + right) / 2;
      const sliderCenter = width / 2;
      const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
      const maxAdditionalTilt = 2; 
      const newRotation = ROTATION_DEG + (deviationFactor * maxAdditionalTilt);
      setDynamicRotation(newRotation);
    }
  }, [left, right, width]);

  useEffect(() => setRight(width), [width]);

  const startDrag = (handle: string, e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: leftRef.current,
      initialRight: rightRef.current,
    };
    setDraggingHandle(handle);
  };

  const moveDrag = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
      const dX = e.clientX - startX;
      const dY = e.clientY - startY;
      const projected = dX * COS_THETA + dY * SIN_THETA;
      if (handle === "left") {
        const newLeft = clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE);
        setLeft(newLeft);
      } else {
        const newRight = clamp(initialRight + projected, leftRef.current + MIN_RANGE, width);
        setRight(newRight);
      }
    },
    [width]
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingHandle(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  const nudgeHandle = (handle: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowLeft" ? -5 : 5;
    if (handle === "left") {
      setLeft((prev) => clamp(prev + delta, 0, rightRef.current - MIN_RANGE));
    } else {
      setRight((prev) => clamp(prev + delta, leftRef.current + MIN_RANGE, width));
    }
  };

  return (
    <div
      className="relative select-none flex items-center justify-center transition-transform duration-300 ease-out py-1 px-3 h-[1.25em]"
      style={{ width: width || 'auto', transform: `rotate(${dynamicRotation}deg)` }}
    >
      <div className="absolute inset-y-1 inset-x-2 rounded-xl border border-orange-500/40 pointer-events-none" />
      {width > 0 && (["left", "right"] as const).map((handle) => {
        const x = handle === "left" ? left : right - handleSize;
        const scaleClass = draggingHandle === handle ? "scale-125" : "hover:scale-110";

        return (
          <button
            key={handle}
            type="button"
            aria-label={handle === "left" ? "Adjust start" : "Adjust end"}
            onPointerDown={(e) => startDrag(handle, e)}
            onKeyDown={nudgeHandle(handle)}
            className={`z-20 absolute top-1 bottom-1 sm:top-2 sm:bottom-2 w-4 sm:w-5 rounded-full bg-neutral-900 border border-orange-400/80 flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-1 focus:ring-orange-400 transition-transform duration-150 ease-in-out opacity-100 ${scaleClass}`}
            style={{ left: x + 8, touchAction: "none" }}
          >
            <span className="w-0.5 h-3 sm:h-4 rounded-full bg-orange-400" />
          </button>
        );
      })}
      <div
        className={`flex z-10 items-center justify-center w-full h-full px-7 overflow-hidden pointer-events-none ${textClassName}`}
        style={{ clipPath: `inset(0 ${width - right}px 0 ${left}px round 0.5rem)` }}
      >
        {text}
      </div>
    </div>
  );
}

export default TextSlider;
