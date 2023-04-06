import { useEffect, useRef, useState } from "react";

const Feedback = ({ output = [] }) => {
  const ref = useRef<HTMLTextAreaElement>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref?.current?.scrollHeight) {
      setHeight(ref.current.scrollHeight);
    }
  }, [output]);

  if (output.length <= 0) return null;

  return (
    <div className="mt-2 flex w-full flex-col border-t border-gray-100 p-4 dark:border-gray-900">
      {Array.isArray(output) && output.length > 0 ? (
        <>
          <div className="flex flex-row text-xs">
            <label className="mr-1 text-slate-300 underline decoration-dashed dark:text-slate-500">
              Feedback Prompt
            </label>
          </div>
          <textarea
            ref={ref}
            style={{
              height: height ? `${height}px` : "auto",
            }}
            className="mt-4 h-auto w-full border border-gray-500 bg-transparent p-2"
            value={JSON.stringify(output, null, 4)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Feedback;
