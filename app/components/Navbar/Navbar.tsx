import React, { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./style.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { BiVideoPlus } from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [q, setQ] = useState("");

  const handleRedirect = () =>{
    if(!q) return;
    router.push(`/search?q=${q}`)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <BsSearch
              color="#fff"
              onClick={handleRedirect}
            />
          </div>
          {!token ? (
            <Button
              className="app_btn"
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => router.push("/login")}
            >
              <MdOutlineAccountCircle /> Sign In
            </Button>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                }}
              >
                <BiVideoPlus onClick={() => router.push("/upload")} size={25} style={{ cursor: "pointer" }} />
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <h5>{user?.name}</h5>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
