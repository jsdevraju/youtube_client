import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../app/components/Card/Card";
import { apiEndPoint, VideoProps } from "../utils";

const Search = () => {
  const [videos, setVideos] = useState<VideoProps[]>();
  const query = useRouter().asPath;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${apiEndPoint}/video/${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <>
      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        flexWrap:"wrap"
      }}>
      {videos && videos.map((video) => <Card key={video._id} video={video} />)}
      </div>
    </>
  );
};

export default Search;
