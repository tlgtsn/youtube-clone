import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;
export const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const videoRes = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(videoRes.data);
    };
    fetchVideo();
  }, [tags]);

  return (<Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
  </Container>);
};
