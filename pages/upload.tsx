import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { uploadFiles } from "react-firebase-lib";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Button from "../app/components/Button/Button";
import Input from "../app/components/Input/Input";
import Label from "../app/components/Label/Label";
import Meta from "../app/components/Meta/Meta";
import { RootState } from "../app/store";
import { storage } from "../firebase";
import styles from "../styles/upload.module.css";
import { apiEndPoint } from "../utils";

export type InputChange = ChangeEvent<HTMLInputElement>;

const Upload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImaUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState("")
  const [imageLoader, setImageLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleThumnail = async (e: InputChange) => {
    if (!e.target.files) return;
    setImageLoader(true);
    const res = await uploadFiles(storage, "thumbnail", [
      ...e.target.files,
    ] as File[]);
    setImageLoader(false);
    setImaUrl(res[0]);
  };

  const handleVideo = async (e: InputChange) => {
    if (!e.target.files) return;
    setVideoLoader(true);
    const res = await uploadFiles(storage, "yt_video", [
      ...e.target.files,
    ] as File[]);
    setVideoLoader(false);
    setVideoUrl(res[0]);
  };

  const handleVideoPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || title?.length < 5 || title?.length > 25)
      return toast.error(
        "Title at least 5 character and less then 25 character"
      );
    if (!description || description?.length < 30 || description?.length > 400)
      return toast.error(
        "Description at least 30 character and less then 400 character"
      );
      if(!tags) return toast.error("Tag is require")
      if(!imgUrl) return toast.error("Image is require")
      if(!videoUrl) return toast.error("Video is require");
      setLoading(true)
    try {
      const { data } = await axios.post(`${apiEndPoint}/video/create`, {
        title,
        description,
        videoUrl,
        imgUrl,
        tags:tags.split(",")
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      console.log(data);
      router.push("/")
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    if(!token) router.push("/login")
  }, [token])

  return (
    <>
    <Meta title="Youtube - Upload video" />
      <section className={styles.upload}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1>Upload Videos</h1>
            <form onSubmit={handleVideoPost}>
              <div className={styles.formControl}>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  placeholder="Video title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="form_control_input minInput"
                />
              </div>
              <div className={styles.formControl}>
                <Label htmlFor="thumbnail">Upload Thumbnail</Label>
                <Input
                  type="file"
                  onChange={handleThumnail}
                  id="thumbnail"
                  accept="image/*"
                  className="form_control_input minInput"
                />
              </div>
              {imageLoader && imageLoader ? (
                <p
                  style={{
                    marginTop: "1em",
                    marginBottom: "1em",
                    color: "#999",
                  }}
                >
                  Image File Uploading....
                </p>
              ) : null}
              <div className={styles.formControl}>
                <Label htmlFor="description">Description</Label>
                <textarea
                  placeholder="Video description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols={30}
                  rows={10}
                  id="description"
                  className="form_control_input minInput"
                />
              </div>
              <div className={styles.formControl}>
                <Label htmlFor="description">Upload Video</Label>
                <Input
                  type="file"
                  onChange={handleVideo}
                  id="thumbnail"
                  accept="video/*"
                  className="form_control_input minInput"
                />
              </div>
              {videoLoader && videoLoader ? (
                <p
                  style={{
                    marginTop: "1em",
                    marginBottom: "1em",
                    color: "#999",
                  }}
                >
                  Video File Uploading....
                </p>
              ) : null}
               <div className={styles.formControl}>
                <Label htmlFor="tag">Sperate Tags With Comma</Label>
                <Input
                 type="text"
                 placeholder="Tag example: js,ps"
                 value={tags}
                 onChange={(e) => setTags(e.target.value)}
                 id="tag"
                 className="form_control_input minInput"
                />
              </div>
              <Button
                type="submit"
                className="app_btn"
                style={{
                  width: "100%",
                  marginTop: "1em",
                }}
              >
                Post Video
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.cookies?.token) {
    return {
      redirect: {
        destination: "/login",
      },
      props: { isLogin: false },
    }
  }
  return {
    props: { isLogin: true },
  }
}

export default Upload;
