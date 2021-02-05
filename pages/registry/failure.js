import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function App() {
  const router = useRouter();
  const postVariants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    enter: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
    },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Head>
        <title>BLK MLK COVID-safety</title>
      </Head>
      {/* Banner */}
      <div className="bg-black h-auto flex items-center px-12 py-2 ">
        <div className="flex ">
          <a href="https://www.facebook.com/blk.mlk.specialty.coffee">
            <img className="h-16 pr-8" src="/facebook.svg" />
          </a>
          <a href="https://www.instagram.com/blk.mlk_specialty_coffee/?hl=en">
            <img className="h-16" src="/instagram.svg" />
          </a>
        </div>
        <img
          onClick={() => router.push("/")}
          className="h-24 ml-auto cursor-pointer"
          src="/blkLogo.svg"
        />
      </div>

      {/* Success Box */}
      <div className="flex-1 items-center justify-center bg-blkCoffee">
        <motion.div
          className="flex items-center justify-center"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.5 } } }}
        >
          <motion.div className="max-w-2xl w-full p-2" variants={postVariants}>
            <div className="flex-col  max-w-2xl  w-full bg-white border border-black p-4 shadow-2xl">
              <h1 className="text-2xl font-medium mb-8 text-center">
                Something went wrong - please try again
              </h1>
              <div className="flex justify-center">
                <img className="h-40 w-44 my-20" src="/Error.svg" />
              </div>
              <div className="flex justify-center">
                <button
                  className=" h-14 w-60 rounded-md text-white bg-black font-medium shadow-lg
              hover:bg-gray-900 active:bg-gray-700 cursor-pointer"
                  type="button"
                  onClick={() => router.push("/")}
                >
                  Go Back
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
