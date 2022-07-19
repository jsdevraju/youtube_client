import styles from "../styles/index.module.css";
import Card from "../app/components/Card/Card";
import axios from "axios";
import { apiEndPoint, VideoProps } from "../utils";

interface IProps {
  data:VideoProps[]
}

const Home:React.FC<IProps> = ({data}) => {
  console.log(data)
  return (
    <>
      <div className={styles.flexWrapper}>
          { data && data?.map((video) => (
            <Card key={video._id} video={video}  />
          ))}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${apiEndPoint}/video/random`);
  return {
    props: { data: data?.videos }
  }
}


export default Home;
