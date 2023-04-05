import { useEffect, useRef, useState } from "react";
import { useFeedbackStore } from "stores/feedback";

const Feedback = () => {
  const { annotations } = useFeedbackStore();
  const { tags } = useFeedbackStore();
  const ref = useRef<HTMLTextAreaElement>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref?.current?.scrollHeight) {
      setHeight(ref.current.scrollHeight);
    }
  }, [annotations]);

  if (annotations.length <= 0) return null;

  const _annotations = annotations.map((_) => {
    const {
      text,
      indices,
      tag: { label, instruction },
    } = _;
    const blocks = text
      .replace(/[\n\t\r]/g, " ")
      .split(" ")
      .filter((_) => _.length > 0);
    return {
      label,
      instruction,
      text: indices?.map((_) => blocks[_]).join(" "),
    };
  });

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  let grouped = groupBy(_annotations, (a) => a.label);
  let _grouped = Array.from(grouped).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    {},
  );

  _grouped = Object.keys(_grouped).map((key) => ({
    label: key,
    instruction: tags.find((tag) => tag.label == key)?.instruction,
    texts: _grouped[key].map((_) => _.text),
  }));

  return (
    <div className="mt-2 flex w-full flex-col border-t border-gray-100 p-4 dark:border-gray-900">
      {_grouped.length > 0 ? (
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
            value={JSON.stringify(_grouped, null, 4)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Feedback;
