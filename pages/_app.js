import "@/styles/globals.css";
import { Catamaran } from "next/font/google";

const catamaran = Catamaran({
  subsets: ["latin"],
  weight: "400",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={catamaran.className}>
      <Component {...pageProps} />
    </main>
  );
}
