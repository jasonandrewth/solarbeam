import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        paddingLeft: "100px",
      }}
    >
      {/* <Image
        src="/assets/2stones.png"
        alt="Two stones"
        width={666 * 2}
        height={375 * 2}
      /> */}
    </main>
  );
}
