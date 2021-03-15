import React, { Component } from "react";

const apiEndpoint = "http://192.168.31.173:8000/x-video";
class Video extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.location.search.split("=")[1]);
    return (
      <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
        <source
          src={apiEndpoint + this.props.location.search}
          type="video/mp4"
        />
      </video>
    );
  }
}

export default Video;
