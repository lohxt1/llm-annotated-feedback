import { useFeedbackStore } from "stores/feedback";
import { useSelectionStore } from "stores/selection";
import Block from "./block";

// Component that divides the input text in a set of seperate react component blocks.
// The text is broken down into blocks based on a regex that matches for spaces and special characters.
const Blocks = () => {
  // Regex expression for splitting text matching word boundaries and whitespaces.
  //   const blocks = text.split(/(\b|\s)/).filter((_) => _.length > 0);

  const { text } = useSelectionStore();

  // Split blocks by spaces
  const blocks = text
    .replace(/[\n\t\r]/g, " ")
    .split(" ")
    .filter((_) => _.length > 0);

  return (
    <>
      <div className="ml-4 mt-4 flex flex-row text-xs">
        <label className="mr-1 text-slate-300 underline decoration-dashed dark:text-slate-500">
          Select the text to start tagging
        </label>
        <label className="underline"></label>
      </div>
      <div className="align-start mb-4 flex flex-wrap content-start items-start justify-start px-4 leading-8">
        {blocks.map((block, idx) => (
          <Block block={block} idx={idx} />
        ))}
      </div>
    </>
  );
};

export default Blocks;
