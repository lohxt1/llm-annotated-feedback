import { useEffect, useRef, useState } from "react";
import useKeypress from "@/hooks/useKeypress";
import useMouseStatus from "@/hooks/useMouseStatus";
import { useFeedbackStore } from "stores/feedback";
import { useSelectionStore } from "stores/selection";
import { cn } from "@/utils/tailwind";

const Block = ({ block, idx }: { block: string; idx: number }) => {
  const ref = useRef();

  const { isMouseDown: isWindowMouseDown } = useMouseStatus({ ref: window });
  const { isMouseOver, isMouseDown } = useMouseStatus({ ref });
  const isShiftKeyPressed = useKeypress("Shift");

  const {
    setBlockStartIdx,
    blockStartIdx,
    setBlockMovingIdx,
    blockMovingIdx,
    indices,
  } = useSelectionStore();

  const { tag } = useFeedbackStore();

  useEffect(() => {
    if (isWindowMouseDown && isMouseDown && blockStartIdx < 0) {
      setBlockStartIdx(idx);
    }
    if (isWindowMouseDown && isMouseOver && blockStartIdx >= 0) {
      setBlockMovingIdx(idx + 1);
    }
  }, [
    isMouseOver,
    isMouseDown,
    isWindowMouseDown,
    blockStartIdx,
    blockMovingIdx,
  ]);

  const selected = indices.find((_) => _ == idx);

  const highlight = idx > blockStartIdx && idx < blockMovingIdx;

  return (
    <div
      className={cn(
        "relative",
        "pr-1",
        // "rounded-sm border border-dashed border-[#0003] dark:border-[#fff3]",
        // selected || highlight
        //   ? "bg-black text-white dark:bg-white dark:text-black"
        //   : "",
        // highlight ? "underline decoration-dashed" : "",
      )}
      style={{ background: selected || highlight ? tag?.color : "transparent" }}
    >
      <div className="absolute top-0 left-0 h-full w-full" ref={ref}></div>
      {block === " " ? "\u00A0" : block}
    </div>
  );
};

export default Block;
