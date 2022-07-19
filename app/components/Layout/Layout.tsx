import React, { ReactNode } from "react";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";
import styles from "../../../styles/Home.module.css";

interface IProps {
  children: ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <Menu />
        {/* Hole Content Wrap Here */}
        <div className={styles.main}>
          <Navbar />
          <div className={styles.wrapper}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
