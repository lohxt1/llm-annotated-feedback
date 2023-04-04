import { useFeedbackStore } from "stores/feedback";
import { RadioGroup, RadioGroupItem } from "@/components/primitives/radioGroup";

const Tags = () => {
  const { tags, tag, setTag } = useFeedbackStore();

  const _handleTagChange = (tagLabel) => {
    setTag(tagLabel);
  };

  return (
    <div className="mb-2 flex w-full flex-col border-b border-gray-100 px-2 dark:border-gray-900">
      <RadioGroup
        defaultValue={tag?.label}
        value={tag?.label}
        onValueChange={_handleTagChange}
        className="flex w-full flex-col"
      >
        {tags.map((_tag) => (
          <div className="flex w-[100%] flex-row px-2 py-2">
            <RadioGroupItem
              className="mt-1"
              value={_tag?.label}
              id={_tag?.label}
            />
            <div className="relative ml-1 flex w-full flex-col">
              <label
                htmlFor={_tag?.label}
                className={`underline decoration-8`}
                style={{ textDecorationColor: _tag?.color }}
              >
                {_tag?.label}
              </label>
              {/* <div className="absolute bottom-0 left-0 h-4 w-full"></div> */}
              <label className="relative mt-2 w-full text-xs text-slate-500">
                {_tag?.instruction}
              </label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Tags;
