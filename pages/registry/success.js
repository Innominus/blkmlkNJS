import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  return (
    <div className=" bg-cover bg-center flex flex-col h-screen w-screen">
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
      <div className="h-full flex items-center justify-center bg-blkCoffee">
        <div className="max-w-2xl w-full  bg-blkCoffee p-2">
          <div className="max-w-2xl  w-full bg-white border border-black p-4 shadow-2xl">
            <h1 className="text-2xl font-medium mb-8 text-center">
              Thank you for checking in with BLK MLK
            </h1>
            <div className="flex justify-center item">
              <img
                className="h-40 w-44 my-20"
                src="/Kliponious-green-tick.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
