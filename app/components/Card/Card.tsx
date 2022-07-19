import { useRouter } from "next/router";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import { apiEndPoint, IUser, VideoProps } from "../../../utils";
import styles from "./style.module.css";
import axios from "axios";

interface IProps {
  video: VideoProps;
}

const Card: React.FC<IProps> = ({ video }) => {
  const router = useRouter();
  const [info, setInfo] = useState<IUser>();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        `${apiEndPoint}/user/find/${video.userId}`
      );
      setInfo(data?.user);
    };

    getUserInfo();
  }, [video.userId]);

  return (
    <>
      <div
        className={styles.container}
        onClick={() => router.push("/watch/he")}
      >
        <img src={video.imgUrl} alt={video.title} />
        <div className={styles.details}>
          <img src={info?.avatar} alt={info?.name} />
          <div className={styles.texts}>
            <h1>{video.title}</h1>
            <h2>{info?.name}</h2>
            <div className={styles.info}>
              {video.views} views . {format(video.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
