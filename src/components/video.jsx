import React, { Component } from "react";
import getShortNameOfPath from "../util/getShortNameOfPath";

const apiEndpoint = "http://192.168.31.173:8000/x-video";
class Video extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.location.search.split("=")[1]);
    return (
      <React.Fragment>
        <h3 id="wrapText">{getShortNameOfPath(this.props.location.search.split("=")[1])}</h3>
        <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
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
