import Layout from "../components/Layout";
import VideosList from "../components/VideosList";

const HomePage = () => {
  return (
    <Layout>
      <div
        id="embedBox"
        style={{ width: 1280, maxWidth: "100%", height: "auto" }}
      ></div>

      <VideosList />
    </Layout>
  );
};

export default HomePage;
