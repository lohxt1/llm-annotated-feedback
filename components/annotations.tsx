import { useSelectionStore } from "stores/selection";

const Annotations = () => {
  const { annotations } = useSelectionStore();
  return (
    <div className="align-start flex flex-wrap content-start items-start justify-start border-t border-gray-100 px-4 dark:border-gray-900">
      {annotations.map((a) => {
        const blocks = a.text
          .replace(/[\n\t\r]/g, " ")
          .split(" ")
          .filter((_) => _.length > 0);
        return (
          <div className="align-center relative mt-4 flex w-full flex-row justify-between">
            <div className="absolute top-[-5px] left-0 text-xs text-slate-500">
              {a?.tag?.label}
            </div>
            <div
              className="my-2 flex w-[100%] flex-row flex-wrap underline decoration-8 "
              style={{
                textDecorationColor: a?.tag?.color,
                overflowWrap: "anywhere",
              }}
            >
              {a?.indices?.map((_) => (
                <>{blocks[_]}&nbsp;</>
              ))}
            </div>
            <div className="my-2 ml-2 w-[100px] text-xs">Delete</div>
          </div>
        );
      })}
    </div>
  );
};
export default Annotations;
