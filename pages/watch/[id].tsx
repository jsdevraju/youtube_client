import React, { useEffect, useState } from "react";
import Button from "../../app/components/Button/Button";
import styles from "./style.module.css";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { RiShareForwardFill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import Comment from "../../app/components/Comment/Comment";
import RecommendCard from "../../app/components/RecomanedCard/RecomanedCard";
import { useRouter } from "next/router";
import axios from "axios";
import { apiEndPoint, IUser } from "../../utils";
import { dislike, like, setVideo } from "../../app/redux/video";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { format } from "timeago.js";
import { subscription } from "../../app/redux/auth";
import { FaThumbsUp } from "react-icons/fa";
import { MdThumbDownAlt } from "react-icons/md";
import Loader from "../../app/components/Loader/Loader";
import Meta from "../../app/components/Meta/Meta";

const VideoDetails = () => {
  const {
    query: { id },
  } = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { video } = useSelector((state: RootState) => state.video);
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [channel, setChannel] = useState<IUser>();

  const handleLike = async () => {
    if (!video || !user) return;
    try {
      setLoading(true);
      await axios({
        method:"put",
        url:`${apiEndPoint}/user/like/${video._id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      setLoading(false);
      dispatch(like(user._id));
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
   
  };

  const handleDislike = async () => {
    if (!video || !user) return;
    setLoading(true);
    await axios({
      method:"put",
      url:`${apiEndPoint}/user/dislike/${video._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    setLoading(false);
    dispatch(dislike(user._id));
  };

  const handleSub = async () => {
    if (!channel || !user) return;
    setLoading(true);
    user.subscribedUsers.includes(channel._id)
      ? await axios({
        method:"put",
        url:`${apiEndPoint}/user/unsub/${channel._id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      : await axios({
        method:"put",
        url:`${apiEndPoint}/user/sub/${channel._id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    setLoading(false);
    dispatch(subscription(channel._id));
  };

  useEffect(() => {
    if (id) {
      const fetchVideo = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`${apiEndPoint}/video/find/${id}`);
          const channelRes = await axios.get(
            `${apiEndPoint}/user/find/${data?.video?.userId}`
          );
          setChannel(channelRes?.data?.user);
          dispatch(setVideo(data));
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

      fetchVideo();
    }
  }, [id]);

  return (
    <>
    <Meta title={`Watch Video ${loading ? "loading..." : video?.title}`} />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.videoWrapper}>
              <video controls src={video?.videoUrl} />
            </div>
            <h1 className={styles.title}>{video?.title}</h1>
            <div className={styles.details}>
              <div className={styles.info}>
                {video?.views} views . {video && format(video.createdAt)}
              </div>
              <div className={styles.buttons}>
                <Button type="button" onClick={handleLike}>
                  {video?.likes?.length}
                  {video && user && video.likes?.includes(user?._id) ? (
                    <FaThumbsUp />
                  ) : (
                    <FiThumbsUp />
                  )}
                  Like
                </Button>
                <Button type="button" onClick={handleDislike}>
                  {video?.dislikes?.length}
                  {video && user && video.likes?.includes(user?._id) ? (
                    <MdThumbDownAlt />
                  ) : (
                    <FiThumbsDown />
                  )}
                  Dislike
                </Button>
                <Button type="button">
                  <RiShareForwardFill /> Share
                </Button>
                <Button type="button">
                  <BiListPlus /> Save
                </Button>
              </div>
            </div>
            <div className={styles.hr} />
            {/* CHannel Info */}
            <div className={styles.channel}>
              <div className={styles.channelInfo}>
                <img src={channel && channel.avatar} alt="Razu islam" />
                <div className={styles.channelDetails}>
                  <span className={styles.channelName}>
                    {channel && channel.name}
                  </span>
                  <span className={styles.channelCounter}>
                    {channel && channel.subscribers} subscribers
                  </span>
                  <p className={styles.description}>{video?.description}</p>
                </div>
              </div>
              <Button type="button" className={styles.sub} onClick={handleSub}>
                {user && channel && user.subscribedUsers?.includes(channel._id)
                  ? (<> <BsFillBellFill /> Subscribed</>)
                  : `Subscribe`
                }
              </Button>
            </div>
            <div className={styles.hr} />
            {video && channel && <Comment video={video} channel={channel} />}
          </div>
          <div className={styles.recommendation}>
            <h1 style={{
              color:"#fff",
              fontSize:"1em",
              marginBottom:"1em"
            }}>Recommendation Video For You</h1>
            {video && <RecommendCard tags={video?.tags} />}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetails;
