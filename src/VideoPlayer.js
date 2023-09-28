import React from "react";
import ReactPlayer from "react-player";


function VideoPlayer({ rtspUrl }) {
  return (
    <div>
      <ReactPlayer url={rtspUrl} controls={true} width="100%" height="auto" />
    </div>
  );
}

export default VideoPlayer;
