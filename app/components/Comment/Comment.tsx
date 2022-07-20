import axios from "axios";
import React, { KeyboardEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { apiEndPoint, IUser, SingleVideoProps } from "../../../utils";
import { RootState } from "../../store";
import Input from "../Input/Input";
import Loader from "../Loader/Loader";
import UserComment from "../UserComment/UserComment";
import styles from "./style.module.css";

interface IProps {
  video: SingleVideoProps;
  channel: IUser;
}

export interface IComment {
  createdAt: string;
  desc: string;
  updatedAt: string;
  userId: string;
  videoId: string;
  __v: number;
  _id: string;
}

const Comment: React.FC<IProps> = ({ video, channel }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<IComment[]>();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [comment, setComment] = useState("");
  const [runComment, setRunComment] = useState<IComment>()

  const handleChange = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!comment) return toast.error("Comment is require");
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${apiEndPoint}/comment/create`,
          {
            videoId: video._id,
            desc: comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setRunComment(data)
        setComment("")
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (video._id) {
      const fetchVideo = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `${apiEndPoint}/comment/${video._id}`
          );
          setComments(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

      fetchVideo();
    }
  }, [runComment]);

  return (
    <>
      {loading ? <Loader /> : (
        <div className={styles.container}>
        {token ? (
          <div className={styles.newComment}>
          <img src={user?.avatar} alt="Razu islam" />
          <Input
            placeholder="Add a comment..."
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleChange}
          />
        </div>
        ): (
          <h1 style={{
            color:"#fff",
            fontSize:"1.4em"
          }}>Please login to comment</h1>
        )}
        {/* All User Comment Render here */}
        {comments &&
          comments?.map((comment) => (
            <UserComment
              key={comment._id}
              comment={comment}
              channel={channel}
            />
          ))}
      </div>
      )}
    </>
  );
};

export default Comment;
