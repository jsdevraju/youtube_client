import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./style.module.css";
import { useRouter } from "next/router";

const Navbar = () => {

  const router = useRouter()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <Input type="text" placeholder="Search..." />
            <BsSearch color="#fff" />
          </div>
          <Button className="app_btn" type="button" style={{
            display:"flex",
            alignItems:"center",
            gap:"10px"
          }} onClick={() => router.push("/login")}>
           <MdOutlineAccountCircle /> Sign In
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
