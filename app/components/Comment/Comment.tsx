import React from "react";
import Input from "../Input/Input";
import UserComment from "../UserComment/UserComment";
import styles from "./style.module.css";

const Comment = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.newComment}>
          <img
            src="https://randomuser.me/api/portraits/men/30.jpg"
            alt="Razu islam"
          />
          <Input placeholder="Add a comment..." type="text" />
        </div>
        {/* All User Comment Render here */}
        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
      </div>
    </>
  );
};

export default Comment;
