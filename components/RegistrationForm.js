import React from "react";

export default function RegistrationForm({
  fname,
  lname,
  phNum,
  value,
  handleBlur,
  handleChange,
}) {
  console.log(value);
  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-2xl" htmlFor="fname">
            First name:
          </label>
          <input
            placeholder="First name..."
            className="border-black border border-opacity-20 h-12 px-4 py-2"
            type="text"
            name={fname}
            value={value.fname}
            onBlur={handleBlur}
            onChange={handleChange}
          ></input>
        </div>

        <div className="flex flex-col gap-2 col-span-1">
          <label className="text-2xl" htmlFor="lname">
            Last name:
          </label>
          <input
            placeholder="Last name..."
            className="border-black border border-opacity-20 h-12 px-4 py-2"
            type="text"
            name={lname}
            value={value.lname}
            onBlur={handleBlur}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl" htmlFor="lname">
          Phone Number:
        </label>
        <input
          placeholder="Phone number..."
          className="border-black border border-opacity-20 h-12 px-4 py-2"
          type="tel"
          name={phNum}
          value={value.phNum}
          onBlur={handleBlur}
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex-1 h-1 opacity-80  border-black bg-black"></div>
    </div>
  );
}
