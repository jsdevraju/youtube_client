import axios from "axios";
import { Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "../app/components/Button/Button";
import Input from "../app/components/InputWithFormik/FormikInput";
import Label from "../app/components/Label/Label";
import { loginValidate } from "../app/validation/interface";
import styles from "../styles/form.module.css";
import { apiEndPoint } from "../utils";
import { useRouter } from "next/router";
import Loader from "../app/components/Loader/Loader";
import Meta from "../app/components/Meta/Meta";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (
    email: string,
    name: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiEndPoint}/auth/register`, {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success(data?.message);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
    <Meta title="Youtube - Register" />
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.login}>
          <div className={styles.container}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={loginValidate}
              onSubmit={({ email, name, password }: any) => {
                handleRegister(email, name, password);
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
                      Name
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
                      placeholder="Enter email"
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
                if you don't have an account please
                <Link href="/login"> login</Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.cookies?.token) {
    return {
      redirect: {
        destination: "/",
      },
      props: { isLogin: true },
    };
  }
  return {
    props: { isLogin: false },
  };
};

export default Register;
