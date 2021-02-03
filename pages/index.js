import Head from "next/head";
import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function App() {
  const router = useRouter();
  const INITIAL_VALUES = [
    { regID: 1, First_Name: "", Last_Name: "", Ph_Number: "" },
  ];

  const phoneRegExp = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

  const registerSchema = Yup.object().shape({
    regInputs: Yup.array().of(
      Yup.object().shape({
        First_Name: Yup.string()
          .test(
            "alphabets",
            "First name must only contain letters",
            (value) => {
              return /^[A-Za-z ]+$/.test(value);
            }
          )
          .required("Required field"),
        Last_Name: Yup.string()
          .matches(/^[A-Za-z ]+$/, "Last name must only contain letters")
          .required("Required field"),
        Ph_Number: Yup.string()
          .trim()
          .matches(phoneRegExp, "Phone number is not valid")
          .min(10, "Phone number is too short")
          .max(12, "Phone number is too long")

          .required("Required field"),
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
        },
        (error) => {
          returnSignal = error;
        }
      );
    if (returnSignal === 200) {
      actions.resetForm();
      router.push("/registry/success");
      actions.setSubmitting(false);
    } else {
      actions.resetForm();
      router.push("registry/failure");
      actions.setSubmitting(false);
    }
  }
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
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  };
  //ISSUES:
  // TODO:
  // Fix CSS styling
  // Add UI feedback with modal

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
        <img className="h-24 ml-auto" src="/blkLogo.svg" />
      </div>

      {/* Form */}

      <div className="flex-1 md:h-full flex items-center justify-center bg-blkCoffee">
        <motion.div
          className="flex items-center justify-center"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.5 } } }}
        >
          <div className=" max-w-2xl w-screen bg-blkCoffee p-2">
            <motion.div
              className="max-w-2xl  w-full bg-white border border-black p-4 shadow-2xl"
              variants={postVariants}
            >
              <h1 className="text-2xl font-medium mb-8">
                Please enter your details
              </h1>
              <Formik
                initialValues={{ regInputs: INITIAL_VALUES }}
                onSubmit={(data, actions) => {
                  sendData(data, actions);
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
                      validateOnBlur={false}
                      render={(arrayHelpers) => (
                        <div className="flex flex-col text-left ">
                          <div className="flex flex-col  max-h-full md:overflow-y-scroll">
                            {values.regInputs.map((regInput, index) => (
                              <motion.div key={index} variants={postVariants}>
                                <RegistrationForm
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
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex pb-4">
                            <button
                              type="button"
                              className="flex leading-7 mr-2 bg-black text-white w-14 h-8 rounded-md justify-center text-center hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                arrayHelpers.push({
                                  regID: values.regInputs.length + 1,
                                  First_Name: "",
                                  Last_Name: "",
                                  Ph_Number: "",
                                });
                              }}
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              className="flex leading-7 bg-black text-white w-20 h-8 rounded-md justify-center align-middle hover:bg-gray-900 active:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                if (values.regInputs.length > 1) {
                                  arrayHelpers.remove(
                                    values.regInputs.length - 1
                                  );
                                }
                              }}
                            >
                              Remove
                            </button>
                          </div>

                          <input
                            className="rounded-sm h-14 text-white bg-black font-medium shadow-lg hover:bg-gray-900 active:bg-gray-700 cursor-pointer"
                            type="submit"
                            disabled={isSubmitting}
                          />
                        </div>
                      )}
                    />
                  </form>
                )}
              </Formik>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
