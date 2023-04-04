import { useFeedbackStore } from "stores/feedback";

const SelectedTagHint = () => {
  const { tag } = useFeedbackStore();

  return (
    <div className="ml-4 mt-2 flex flex-row text-xs">
      <label className="mr-1 text-slate-300 dark:text-slate-700">
        Selected tag label:{" "}
      </label>
      <label
        className="underline"
        style={{ color: tag.color, textDecorationColor: tag.color }}
      >
        {tag?.label}
      </label>
    </div>
  );
};

export default SelectedTagHint;
