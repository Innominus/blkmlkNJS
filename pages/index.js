import Head from "next/head";
import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function App() {
  const INITIAL_VALUES = [
    { regID: 1, First_Name: "", Last_Name: "", Ph_Number: "" },
  ];

  const registerSchema = Yup.object().shape({
    regInputs: Yup.array().of(
      Yup.object().shape({
        First_Name: Yup.string().required("Required field"),
        Last_Name: Yup.string().required("Required field"),
        Ph_Number: Yup.string().required("Required field"),
      })
    ),
  });

  async function sendData(data, actions) {
    let returnSignal = "";
    await axios
      .post("/api/payload", {
        data,
      })
      .then(
        (response) => {
          returnSignal = response.status;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    if (returnSignal === 200) {
      console.log("Request OK");
    } else {
      console.log("Bad request");
    }
    actions.setSubmitting(false);
  }
  //ISSUES:
  // TODO:

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
            onSubmit={(data, actions) => {
              sendData(data, actions);
              actions.resetForm();
            }}
            validationSchema={registerSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              isSubmitting,
            }) => (
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
                            fvalue={regInput.First_Name}
                            lvalue={regInput.Last_Name}
                            phvalue={regInput.Ph_Number}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            fname={`regInputs[${index}].First_Name`}
                            lname={`regInputs[${index}].Last_Name`}
                            phNum={`regInputs[${index}].Ph_Number`}
                          />
                        ))}
                        <div
                          className="flex leading-7 bg-black text-white w-8 h-8 rounded-full justify-center text-center hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                          onClick={() => {
                            arrayHelpers.push({
                              regID: values.regInputs.length + 1,
                              First_Name: "",
                              Last_Name: "",
                              Ph_Number: "",
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
                        disabled={isSubmitting}
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
