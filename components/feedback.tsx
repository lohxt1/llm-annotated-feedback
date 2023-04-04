import { useEffect, useRef, useState } from "react";
import { useFeedbackStore } from "stores/feedback";
import { useSelectionStore } from "stores/selection";

const Feedback = () => {
  const { annotations } = useSelectionStore();
  const { tags } = useFeedbackStore();
  const ref = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref?.current?.scrollHeight) {
      setHeight(ref.current.scrollHeight);
    }
  }, [annotations]);

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
    (obj, [key, value]) => Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
    {},
  );

  _grouped = Object.keys(_grouped).map((key) => ({
    label: key,
    instruction: tags.find((tag) => tag.label == key)?.instruction,
    texts: _grouped[key].map((_) => _.text),
  }));

  return (
    <div className="mt-4 flex w-full flex-col p-4">
      {_grouped.length > 0 ? (
        <>
          <label className="text-sm ">Feedback</label>
          <textarea
            ref={ref}
            style={{
              height: height ? `${height}px` : "auto",
            }}
            className="h-auto w-full border border-gray-500 bg-transparent p-2"
            value={JSON.stringify(_grouped, null, 4)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Feedback;
