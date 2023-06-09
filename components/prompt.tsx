import { useSelectionStore } from "@/modules/annotator/stores/selection";

const Prompt = () => {
  const { prompt } = useSelectionStore();
  return (
    <div className="text-md ml-4 mb-4 flex flex-col">
      <label className="text-xs text-gray-300">Prompt:&nbsp;&nbsp;</label>
      <label className="text-gray-500 underline decoration-dashed">
        {prompt}
      </label>
    </div>
  );
};

export default Prompt;
