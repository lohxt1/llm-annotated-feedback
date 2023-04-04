import { text } from "stores/content";
import AddAnnotation from "@/components/addAnnotation";
import AnnotationHint from "@/components/annotationHint";
import Annotations from "@/components/annotations";
import Blocks from "@/components/blocks";
import Feedback from "@/components/feedback";
import Prompt from "@/components/prompt";
import SelectedTagHint from "@/components/selectedTagHint";

const Leftbar = () => {
  return (
    <div className="align-start flex w-[100%] flex-col content-start justify-start">
      <Prompt />
      <AnnotationHint />
      <Blocks text={text} />
      <SelectedTagHint />
      <AddAnnotation />
      <Annotations />
      <Feedback />
    </div>
  );
};

export default Leftbar;
