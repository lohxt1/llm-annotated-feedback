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
    if (isWindowMouseDown && isMouseDown) {
      console.log(block, idx);
      setBlockStartIdx(idx);
      setBlockMovingIdx(idx);
    }
  }, [isMouseDown, isWindowMouseDown, isMouseOver]);

  useEffect(() => {
    if (isWindowMouseDown && isMouseOver && blockStartIdx >= 0) {
      setBlockMovingIdx(idx + 1);
    }
  }, [isMouseOver, isWindowMouseDown, blockStartIdx]);

  const selected = indices.includes(idx);

  console.log(indices, idx, selected);

  const highlight = idx > blockStartIdx && idx < blockMovingIdx;

  return (
    <span
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
      <span className="absolute top-0 left-0 h-full w-full" ref={ref}></span>
      <span></span>
      {block === " " ? "\u00A0" : block}
    </span>
  );
};

export default Block;
