import React from "react";
import Button from "../../app/components/Button/Button";
import styles from "./style.module.css";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { RiShareForwardFill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import Comment from "../../app/components/Comment/Comment";
import RecommendCard from "../../app/components/RecomanedCard/RecomanedCard";

const VideoDetails = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.videoWrapper}>
            <iframe
              width="100%"
              height="720px"
              src="https://www.youtube.com/embed/yIaXoop8gl4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h1 className={styles.title}>Test Video</h1>
          <div className={styles.details}>
            <div className={styles.info}>120 views . Jun 22 2022</div>
            <div className={styles.buttons}>
              <Button type="button">
                <FiThumbsUp /> Like
              </Button>
              <Button type="button">
                <FiThumbsDown /> Dislike
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
              <img
                src="https://randomuser.me/api/portraits/men/30.jpg"
                alt="Razu islam"
              />
              <div className={styles.channelDetails}>
                <span className={styles.channelName}>Lama Dev</span>
                <span className={styles.channelCounter}>100k subscribers</span>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minus commodi sint ducimus veniam molestiae placeat molestias
                  doloribus aut ipsum tenetur quidem quibusdam laudantium
                  corrupti necessitatibus odio optio, pariatur tempora iste.
                </p>
              </div>
            </div>
            <Button type="button" className={styles.sub}>
              <BsFillBellFill /> Subscribe
            </Button>
          </div>
          <div className={styles.hr} />
          <Comment />
        </div>
        <div className={styles.recommendation}>
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
