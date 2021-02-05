import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <div className="grid h-screen w-screen">
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </div>
  );
}

export default MyApp;
