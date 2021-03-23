import React, { Component } from "react";
const { ipAddress } = require("../ipAddress.json");

const apiEndpoint = `${ipAddress}/photos`;
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
