import { configureStore } from "@reduxjs/toolkit";
import auth, { setAuth } from "./redux/auth";
import { Provider } from "react-redux";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { apiEndPoint } from "../utils";

interface IProps {
    children:React.ReactNode
}

//Create Our Store
const store = configureStore({
  reducer: {
    auth
  },
  devTools: process.env.NODE_ENV !== 'production',
});
//State Provider To Provide store state in our application
const StoreProvider = ({ children }: IProps) => {
    const router = useRouter();
  //checking if user logged in or not
  useEffect(() => {
    const myFunc = () =>{
        const userData = localStorage.getItem("user");
      if (userData) store.dispatch(setAuth(JSON.parse(userData)));
    }
    myFunc()

  }, []);
  //when any error coming with axios it's showing to console to fix bug
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const res = error.response;
      //Checking token is expire or not if token expire return automatic logout and return login page
      if (res?.data?.message?.includes("invalid token")) {
        return new Promise((response, reject) => {
          axios
            .get(`${apiEndPoint}/logout`)
            .then(({ data }) => {
              store.dispatch(setAuth(data));
              localStorage.clear();
              router.push("/login")
            })
            .catch((err) => {
              console.log(err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;