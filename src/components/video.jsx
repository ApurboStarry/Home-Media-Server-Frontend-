import React, { Component } from "react";

class Video extends Component {
  render() {
    console.log(this.props);
    return (
      <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
        <source
          src={this.props.source}
          type="video/mp4"
        />
      </video>
    );
  }
}

export default Video;
