import React from "react";

import { useFormik } from "formik";
import { Button } from "@mui/material";

const TestForm = () => {
  // Note that we have to initialize ALL of fields with values. These

  // could come from props, but since we don’t want to prefill this form,

  // we just use an empty string. If we don’t do this, React will yell

  // at us.

  const formik = useFormik({
    initialValues: {
      firstName: "",

      lastName: "",

      email: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>

      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>

      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor="email">Email Address</label>

      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default TestForm;
