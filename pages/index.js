import Head from "next/head";
import React, { useState, useCallback } from "react";
import RegistrationForm from "../components/RegistrationForm";
import { connectToDatabase } from "../my-mongodb-api/mongodb";
//need to fix top banner images
//also need to fix the top banner so it doesn't make the scroll unnecessarily scrollable
//make site better for resizing
//fix background image to scale properly
export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
export default function App({ isConnected }) {
  const [regNum, setRegNum] = useState(1);

  const handleOnSubmit = (e) => {
    console.log(e);
  };

  let regRows = [];
  for (let i = 0; i < regNum; i++) {
    regRows.push(<RegistrationForm key={i} index={i} />);
  }
  //ISSUES:
  //  FIX BUILDING BUNDLER
  //  CENTRE + AND - INSIDE OF CIRCLE
  // TODO: Check that lines is >= 1
  // Lines = 1
  // TODO: Clear the object from the array when decrementing the 'lines' index
  // Data = [
  //   {
  //    'fname': '',
  //    'lname': '',
  //    'phNum': '',
  //    'fname-1': '',
  //    'lname-1': '',
  //    'phNum-1': '',
  //   }
  // ]

  return (
    <div className="bg-blkCoffee bg-cover bg-center flex flex-col h-screen w-screen">
      <Head>
        <title>BLK MLK COVID-safety</title>
      </Head>
      {/* Banner */}
      <div className="bg-black h-auto flex items-center px-12 py-4">
        <div className="flex gap-8">
          <img className="h-16" src="/facebook.svg" />
          <img className="h-16" src="/instagram.svg" />
        </div>
        <img className="h-24 ml-auto" src="/blkLogo.svg" />
      </div>

      {/* Form */}
      <div className="h-full flex items-center justify-center">
        {/* foreach lines */}
        <div className="max-w-2xl w-full bg-white shadow-lg p-8">
          <h1 className="text-4xl font-medium mb-8">
            Please enter your details
          </h1>

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-8 text-left"
          >
            {/* {regRows} */}
            {regRows}
            {/* {isConnected ? (
              <h2 className="subtitle">You are connected to MongoDB</h2>
            ) : (
              <h2 className="subtitle">
                You are NOT connected to MongoDB. Check the{" "}
                <code>README.md</code> for instructions.
              </h2>
            )} */}
            <div className="flex gap-8">
              <div
                className="flex leading-7 bg-black text-white w-8 h-8 rounded-full justify-center text-center hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                onClick={() => setRegNum(regNum + 1)}
              >
                +
              </div>
              <div
                className="flex leading-7 bg-black text-white w-8 h-8 rounded-full justify-center align-middle hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                onClick={() => {
                  if (regNum > 1) {
                    setRegNum(regNum - 1);
                  }
                }}
              >
                -
              </div>
            </div>
            <input
              className="mt-10 h-14 text-white bg-black font-medium shadow-lg hover:bg-gray-900 active:bg-gray-700 cursor-pointer"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
