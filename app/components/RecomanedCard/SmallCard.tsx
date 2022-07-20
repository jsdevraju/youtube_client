import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { apiEndPoint, IUser, SingleVideoProps } from "../../../utils";
import styles from "./style.module.css";

interface IProps {
  video: SingleVideoProps | any;
}

const SmallCard: React.FC<IProps> = ({ video }) => {
  const [chaneel, setChannel] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const channelRes = await axios.get(
        `${apiEndPoint}/user/find/${video?.userId}`
      );
      setChannel(channelRes?.data?.user);
    };
    fetchUser();
  }, [video.userId]);

  return <div>
    <div
        className={styles.container}
        onClick={() => router.push("/watch/he")}
      >
        <img
          src={video.imgUrl}
          alt="Razu Islam"
        />
        <div className={styles.details}>
            <h1>{video.title}</h1>
            <h2>{chaneel?.name}</h2>
            <div className={styles.info}>{video.views} View {format(video.createdAt)}</div>
        </div>
      </div>
  </div>;
};

export default SmallCard;
