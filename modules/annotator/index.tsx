import { useEffect } from "react";
import Annotations from "./components/annotations";
import Blocks from "./components/blocks";
import Tags from "./components/tags";
import { useFeedbackStore } from "./stores/feedback";

const Annotator = (props) => {
  const { input, setOutput } = props;

  return (
    <div className="flex flex-col">
      <Blocks input={input} />
      <Tags />
      <Annotations />
      <Data setOutput={setOutput} />
    </div>
  );
};

const Data = ({ setOutput }) => {
  const { annotations, tags } = useFeedbackStore();

  useEffect(() => {
    let _output = getFeedback({ annotations, tags });
    console.log(_output, annotations, tags);
    setOutput(_output);
  }, [annotations, tags]);

  return <></>;
};

export default Annotator;

const getFeedback = ({ annotations, tags }) => {
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

  console.log(_annotations);

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

  console.log(grouped, _grouped);

  return _grouped;
};
