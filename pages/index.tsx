import { NextPage } from "next";
import { useState } from "react";
import Annotator from "@/modules/annotator";
import Feedback from "@/components/feedback";
import Prompt from "@/components/prompt";
import { cn } from "@/utils/tailwind";

const _input = `On the advanced alien planet, travel was a dizzying affair, unlike anything the human explorers had ever experienced. The locals had developed a network of portals that could transport beings from one location to another instantaneously. The portals were powered by exotic energy sources that hummed with a strange, almost musical energy. Stepping through a portal was like diving headfirst into a kaleidoscope of colors and sensations, as space-time twisted and contorted around the traveler. The humans could only marvel at the advanced technology that allowed the aliens to traverse their world with such ease, and wondered what other secrets the planet held.`;

const Home: NextPage = () => {
  const [input, setInput] = useState(_input);
  const [output, setOutput] = useState([]);
  return (
    <div className={cn("flex h-[100%] w-screen flex-row justify-center")}>
      <div className="align-start flex w-[100%] max-w-[800px] flex-col content-start justify-start border-x border-gray-100 dark:border-gray-900">
        <Prompt />
        <Annotator input={input} setOutput={setOutput} />
        <Feedback output={output} />
      </div>
    </div>
  );
};

export default Home;
