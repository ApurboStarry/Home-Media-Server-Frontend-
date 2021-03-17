import React, { Component } from "react";

const apiEndpoint = "http://192.168.31.173:8000/photos";

class PhotoViewer extends Component {
  state = {};
  render() {
    return (
      <div>
        <img
          src={apiEndpoint + this.props.location.search}
          alt=""
          className="img-fluid photoStyle"
        />
      </div>
    );
  }
}

export default PhotoViewer;
