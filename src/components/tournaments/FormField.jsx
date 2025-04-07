import React from "react";
import { Field, ErrorMessage } from "formik";

export const FormField = ({ label, name, type = "text", placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-600 font-medium mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};
