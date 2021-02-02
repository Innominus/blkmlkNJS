import React from "react";
import { getIn } from "formik";

export default function RegistrationForm({
  errors,
  fname,
  lname,
  phNum,
  fvalue,
  lvalue,
  phvalue,
  handleBlur,
  handleChange,
}) {
  const fError = getIn(errors, fname);
  const lError = getIn(errors, lname);
  const phError = getIn(errors, phNum);
  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-xl" htmlFor="fname">
            First Name:
          </label>
          <input
            placeholder="First name..."
            className="border-black border border-opacity-20 h-12 px-4 py-2"
            type="text"
            name={fname}
            value={fvalue}
            onBlur={handleBlur}
            onChange={handleChange}
          ></input>
          {fError && <div className="text-red-500">{fError}</div>}
        </div>

        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-xl" htmlFor="lname">
            Last Name:
          </label>
          <input
            placeholder="Last name..."
            className="border-black border border-opacity-20 h-12 px-4 py-2"
            type="text"
            name={lname}
            value={lvalue}
            onBlur={handleBlur}
            onChange={handleChange}
          ></input>
          {lError && <div className="text-red-500">{lError}</div>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="lname">
          Phone Number:
        </label>
        <input
          placeholder="Phone number..."
          className="border-black border border-opacity-20 h-12 px-4 py-2"
          type="tel"
          name={phNum}
          value={phvalue}
          onBlur={handleBlur}
          onChange={handleChange}
        ></input>
        {phError && <div className="text-red-500">{phError}</div>}
      </div>
      <div className="flex-1 h-1 opacity-80  border-black bg-black"></div>
    </div>
  );
}
