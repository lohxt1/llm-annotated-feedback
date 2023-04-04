import React, { ReactNode } from "react";
import { cn } from "@/utils/tailwind";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <div
      className={cn(
        "min-h-screen",
        "bg-white text-black dark:bg-[#0007] dark:text-white",
      )}
    >
      <Header />
      {props.children}
      {/* <Footer /> */}
    </div>
  </div>
);

export default Layout;
