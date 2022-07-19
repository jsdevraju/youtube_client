import { useRouter } from "next/router";
import React from "react";
import styles from "./style.module.css";

const RecommendCard = () => {
  const router = useRouter();

  return (
    <>
      <div className={styles.container} onClick={() => router.push("/watch/he")}>
        <img
          src="https://cdn.pixabay.com/photo/2022/06/20/07/32/dirt-road-7273240_960_720.jpg"
          alt="Razu Islam"
        />
        <div className={styles.details}>
          <div className={styles.texts}>
            <h1>Test video</h1>
            <h2>Razu islam</h2>
          </div>
          <div className={styles.info}>120 views . 10 hours ago</div>
        </div>
      </div>
    </>
  );
};

export default RecommendCard;
