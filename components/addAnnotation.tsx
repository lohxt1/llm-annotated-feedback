import { useFeedbackStore } from "stores/feedback";
import { useSelectionStore } from "stores/selection";

const AddAnnotation = () => {
  const { tag } = useFeedbackStore();
  const { text, indices, resetSelection } = useSelectionStore();
  const { addAnnotation } = useFeedbackStore();
  const _handleClick = (e) => {
    addAnnotation({
      text,
      tag,
      indices,
    });
    resetSelection();
  };

  return (
    <div className="flex flex-row">
      <button
        className="mx-4 my-4 mr-2 w-fit rounded-sm border border-slate-500 px-2 py-1 disabled:opacity-50"
        onClick={() => resetSelection()}
        disabled={indices.length <= 0}
      >
        Reset
      </button>
      <button
        className="mx-4 my-4 w-fit rounded-sm border border-slate-500 px-2 py-1 disabled:opacity-50"
        onClick={_handleClick}
        disabled={indices.length <= 0}
      >
        Add
      </button>
    </div>
  );
};

export default AddAnnotation;
