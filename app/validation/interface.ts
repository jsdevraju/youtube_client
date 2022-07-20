import * as Yup from "yup";

export const loginValidate = Yup.object({
    name: Yup.string().min(3, "Name at least 8 characters").max(15, "Name less then 15 characters").required("Name is require"),
    password: Yup.string()
      .min(8, "Password at least 8 characters")
      .max(32, "Password less then 32 characters")
      .required("Password is require"),
  });


  export const registerValidate = Yup.object({
    name: Yup.string()
      .min(3, "Username at least 3 characters")
      .max(15, "Username less then 15 characters")
      .required("Username is require"),
    email: Yup.string().email("Email is invalid").required("Email is require"),
    password: Yup.string()
      .min(8, "Password at least 8 characters")
      .max(32, "Password less then 32 characters")
      .required("Password is require"),
    cf_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password d't match")
      .required("Confirm Password is require"),
  });