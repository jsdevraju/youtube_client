import axios from "axios";
import { Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Button from "../app/components/Button/Button";
import Input from "../app/components/InputWithFormik/FormikInput";
import Label from "../app/components/Label/Label";
import { setAuth } from "../app/redux/auth";
import { loginValidate } from "../app/validation/interface";
import styles from "../styles/form.module.css";
import { apiEndPoint } from "../utils";
import cookie from 'js-cookie'
import { FcGoogle } from 'react-icons/fc'
import { googleApi } from "../app/firebase";
import { auth, providerGoogle } from "../firebase";
import { useRouter } from "next/router";
import Loader from "../app/components/Loader/Loader";
import Meta from "../app/components/Meta/Meta";



const Login = () => {
  const [loading,  setLoading] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter()

  const handleLogin = async (name:string, password:string) =>{
    setLoading(true)
    try {
      const { data } = await axios.post(`${apiEndPoint}/auth/login`, {
        name,
        password
      });
      setLoading(false)
     dispatch(setAuth(data))
     localStorage.setItem("user", JSON.stringify(data))
     toast.success(data?.message)
     cookie.set("token", data?.token);
     router.push("/")
    } catch (error: any) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const handleGoogle = async (e: FormEvent) =>{
    e.preventDefault();
    setLoading(true)
    try {
        const res = await googleApi(auth, providerGoogle);
        const { data } = await axios.post(`${apiEndPoint}/auth/google`, {
          name:res?.displayName,
          email:res?.email,
          avatar:res?.photoURL
        })
        setLoading(false)
        dispatch(setAuth(data))
        localStorage.setItem("user", JSON.stringify(data))
        toast.success(data?.message)
        cookie.set("token", data?.token)
        router.push("/")
    } catch (error: any) {
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <>
    <Meta title="Youtube - Login" />
      {loading ? <Loader /> : (
        <section className={styles.login}>
        <div className={styles.container}>
          <Formik
                initialValues={{
                  name: "",
                  password: "",
                }}
                validationSchema={loginValidate}
                onSubmit={({ name, password}: any) => {
                  handleLogin(name, password)
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
                      Welcome to login page
                    </h1>
                    <Form>
                      <Label className="label" htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        className="form_control_input"
                        id="name"
                      />
                      <Label className="label" htmlFor="password">Password</Label>
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
                            width:"100%",
                            marginTop:"1em"
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        type="submit"
                        className="app_btn"
                        style={{
                            width:"100%",
                            marginTop:"1em",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            gap:"10px"
                        }}
                        onClick={handleGoogle}
                      >
                       <FcGoogle size={30} /> Sign With Google
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
              {/* Footer */}
              <div className={styles.footer}>
              <p className={styles.logintext}>
                if you don't have an account please
                <Link href="/register"> Register</Link>
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
    }
  }
  return {
    props: { isLogin: false },
  }
}

export default Login;
