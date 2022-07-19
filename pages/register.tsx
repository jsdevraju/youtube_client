import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import Button from "../app/components/Button/Button";
import Input from "../app/components/InputWithFormik/FormikInput";
import Label from "../app/components/Label/Label";
import { registerValidate } from "../app/validation/interface";
import styles from "../styles/form.module.css";

const Register = () => {
  return (
    <>
      <section className={styles.login}>
        <div className={styles.container}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
            }}
            validationSchema={registerValidate}
            onSubmit={(values: any) => {
              console.log(values);
            }}
          >
            {(formik) => (
              <>
                <h1
                  style={{
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Welcome to register page
                </h1>
                <Form>
                  <Label className="label" htmlFor="name">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="form_control_input"
                    id="name"
                  />
                  <Label className="label" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="form_control_input"
                    id="email"
                  />
                  <Label className="label" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form_control_input"
                    id="password"
                  />
                  <Button
                    type="submit"
                    className="app_btn"
                    style={{
                      width: "100%",
                      marginTop: "1em",
                    }}
                  >
                    Register
                  </Button>
                </Form>
              </>
            )}
          </Formik>
          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.logintext}>
              if you already have an account please
              <Link href="/login">login</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
