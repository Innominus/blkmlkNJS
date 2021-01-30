import Head from "next/head";
import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

export default function App() {
  const INITIAL_VALUES = [{ id: 0, fname: "", lname: "", phNum: "" }];

  const registerSchema = Yup.object().shape({
    regInputs: Yup.array().of(
      Yup.object().shape({
        fname: Yup.string().required("Required field"),
        lname: Yup.string().required("Required field"),
        phNum: Yup.string().required("Required field"),
      })
    ),
  });
  //ISSUES:
  // TODO: Clear the object from the array when decrementing the 'lines' index
  // Data = [
  //   {
  //    'fname': '',0
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
          <Formik
            initialValues={{ regInputs: INITIAL_VALUES }}
            onSubmit={(data) => {
              alert(JSON.stringify(data, null, 2));
            }}
            validationSchema={registerSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                <FieldArray
                  name="regInputs"
                  validateOnChange={false}
                  render={(arrayHelpers) => (
                    <div className="flex flex-col gap-8 text-left">
                      <div className="flex flex-col gap-8">
                        {values.regInputs.map((regInput, index) => (
                          <RegistrationForm
                            key={index}
                            index={index}
                            errors={errors}
                            fvalue={regInput.fname}
                            lvalue={regInput.lname}
                            phvalue={regInput.phNum}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            fname={`regInputs[${index}].fname`}
                            lname={`regInputs[${index}].lname`}
                            phNum={`regInputs[${index}].phNum`}
                          />
                        ))}
                        <div
                          className="flex leading-7 bg-black text-white w-8 h-8 rounded-full justify-center text-center hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            arrayHelpers.push({
                              id: values.regInputs.length,
                              fname: "",
                              lname: "",
                              phNum: "",
                            });
                          }}
                        >
                          +
                        </div>
                        <div
                          className="flex leading-7 bg-black text-white w-8 h-8 rounded-full justify-center align-middle hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            if (values.regInputs.length > 0) {
                              arrayHelpers.remove(values.regInputs.length - 1);
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
                    </div>
                  )}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
