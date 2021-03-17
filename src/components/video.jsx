import React, { Component } from "react";
import getShortNameOfPath from "../util/getShortNameOfPath";

const apiEndpoint = "http://192.168.31.173:8000/x-video";
class Video extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.location.search.split("=")[1]);
    return (
      <React.Fragment>
        <p id="wrapText" style={{ marginTop: 10 }}>{getShortNameOfPath(this.props.location.search.split("=")[1])}</p>
        <video id="videoPlayer" width="1920" controls muted="muted" autoPlay>
          <source
            src={apiEndpoint + this.props.location.search}
            type="video/mp4"
          />
        </video>
      </React.Fragment>
    );
  }
}

export default Video;
