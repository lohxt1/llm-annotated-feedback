import { useFeedbackStore } from "stores/feedback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./primitives/select";

const FeedbackType = () => {
  const { type, setType } = useFeedbackStore();

  return (
    <div>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={type}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BOOLEAN">Boolean</SelectItem>
          <SelectItem value="LABELED">Labeled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FeedbackType;
