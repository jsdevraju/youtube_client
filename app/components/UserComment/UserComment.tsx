import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { apiEndPoint, IUser } from "../../../utils";
import { RootState } from "../../store";
import { IComment } from "../Comment/Comment";
import styles from "./style.module.css";

interface IProps {
  channel: IUser;
  comment: IComment;
}

const UserComment: React.FC<IProps> = ({ channel, comment }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);


    const handleDelete = async (id:string) =>{
      try {
        await axios.delete(`${apiEndPoint}/comment/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Comment Delete Successfully")
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className={styles.container}>
      <img src={channel.avatar} className={styles.avatar} alt={channel.name} />
      <div className={styles.details}>
        <span className={styles.name}>
          {channel.name}
          <span className={styles.date}> {format(comment.createdAt)}</span>
        </span>
        <p>{comment.desc}</p>
      </div>
      {comment?.userId == user?._id ? (
        <FaTrash size={20} color="red" cursor="pointer" onClick={() => handleDelete(comment._id)} />
      ): null}
    </div>
  );
};

export default UserComment;
