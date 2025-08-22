/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { Global as GlobalStyles } from "@/styles/Global";

// import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import PageTransitions from "./PageTransitions";

import { useRef } from "react";
import dynamic from "next/dynamic";

import { Meta } from "@/components/Global/Head/Meta";
import { Favicons } from "@/components/Global/Head/Favicons";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Scene from "@/components/Experience/Scene";

// const Scene = dynamic(() => import("@/components/Experience/Scene"), {
//   ssr: false,
// });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  const ref = useRef(null);

  return (
    <>
      <Meta />
      <Favicons />
      <Global styles={GlobalStyles} />
      {/* <MatomoAnalytics /> */}
      <main
        ref={ref}
        className={roboto.className}
        style={{
          position: "relative",
          minHeight: "100vh",
          minWidth: "100vw",
          overflow: "auto",
          touchAction: "auto",
        }}
      >
        <Header />
        <PageTransitions>{children}</PageTransitions>
        <Scene eventSource={ref} eventPrefix="client" />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
