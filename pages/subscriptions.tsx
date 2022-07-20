import styles from "../styles/index.module.css";
import Card from "../app/components/Card/Card";
import axios from "axios";
import { apiEndPoint, VideoProps } from "../utils";
import toast from "react-hot-toast";
import { GetServerSideProps } from "next";
import Meta from "../app/components/Meta/Meta";

interface IProps {
  data: VideoProps[];
}

const Sub: React.FC<IProps> = ({ data }) => {
  return (
    <>
    <Meta title="Youtube - Subscriptions Video" />
      <div className={styles.flexWrapper}>
        {data && data?.map((video) => <Card key={video._id} video={video} />)}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.cookies?.token) {
    const token = req.cookies?.token;
    try {
      const { data } = await axios.get(`${apiEndPoint}/video/sub`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        props: { data: data?.list },
      };
    } catch (error: any) {
      toast.error(error?.message);
    }
  }
  return {
    props: { isLogin: false },
  };
};

export default Sub;
