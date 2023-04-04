import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import * as Fathom from "fathom-client";
import { ThemeProvider } from "next-themes";
import { isMobile } from "react-device-detect";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [isMounted, toggleMounted] = useState(false);

  useEffect(() => {
    toggleMounted(true);

    // Fathom.load("ID", {
    //   includedDomains: ["carousel.lohxt.space"],
    // });

    // function onRouteChangeComplete() {
    //   Fathom.trackPageview();
    // }
    // // Record a pageview when route changes
    // router.events.on("routeChangeComplete", onRouteChangeComplete);

    // // Unassign event listener
    // return () => {
    //   router.events.off("routeChangeComplete", onRouteChangeComplete);
    // };
  }, []);

  return (
    <>
      <ThemeProvider attribute="class">
        <Layout>
          {isMounted && (
            <>
              {isMobile ? (
                <div className="flex h-screen w-screen items-center justify-center">
                  NOPE, desktop only.
                </div>
              ) : (
                <Component {...pageProps} />
              )}
            </>
          )}
        </Layout>
      </ThemeProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default App;
