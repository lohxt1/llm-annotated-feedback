import { NextPage } from "next";
import AddAnnotation from "@/components/addAnnotation";
import Annotations from "@/components/annotations";
import Blocks from "@/components/blocks";
import Feedback from "@/components/feedback";
import Prompt from "@/components/prompt";
import Tags from "@/components/tags";
import { cn } from "@/utils/tailwind";

const Home: NextPage = () => {
  return (
    <div className={cn("flex h-[100%] w-screen flex-row justify-center")}>
      <div className="align-start flex w-[100%] max-w-[800px] flex-col content-start justify-start border-x border-gray-100 dark:border-gray-900">
        <Prompt />
        <Blocks />
        <AddAnnotation />
        <Tags />
        <Annotations />
        <Feedback />
      </div>
    </div>
  );
};

export default Home;
