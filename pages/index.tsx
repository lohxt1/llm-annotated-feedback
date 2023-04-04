import { NextPage } from "next";
import Leftbar from "@/containers/leftbar";
import Rightbar from "@/containers/rightbar";
import { cn } from "@/utils/tailwind";

const Home: NextPage = () => {
  return (
    <div className={cn("flex h-[100%] w-screen flex-row")}>
      <Leftbar />
      <Rightbar />
    </div>
  );
};

export default Home;
