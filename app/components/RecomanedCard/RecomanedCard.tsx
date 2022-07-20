import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiEndPoint, VideoProps } from "../../../utils";
import SmallCard from "./SmallCard";

interface IProps {
  tags?: string[];
}

const RecommendCard: React.FC<IProps> = ({ tags }) => {
  const [videos, setVideos] = useState<VideoProps[]>();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${apiEndPoint}/video/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <>
      {videos &&
        videos?.map((video) => <SmallCard key={video._id} video={video} />)}
    </>
  );
};

export default RecommendCard;
