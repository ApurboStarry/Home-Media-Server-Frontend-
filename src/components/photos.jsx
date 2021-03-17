import React, { Component } from 'react';
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import getShortNameOfPath from "../util/getShortNameOfPath";

const apiEndpoint = "http://192.168.31.173:8000/photos";
class Photos extends Component {
  state = {
    photos: [],
    currentPath: "?filePath=",
    showModal: false,
    modalText: "",
  };

  handleCloseButtonOfModal = () => {
    this.setState({ showModal: false, modalText: "" });
  };

  getModal = () => {
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.handleCloseButtonOfModal()}
        >
          <Modal.Header closeButton style={{ color: "red" }}>
            ERROR
          </Modal.Header>
          <Modal.Body>{this.state.modalText}</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleCloseButtonOfModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  async componentDidUpdate() {
    if (this.state.currentPath !== this.props.location.search) {
      try {
        const { data: photos } = await axios.get(
          apiEndpoint + this.props.location.search
        );

        this.setState({ photos });
      } catch (e) {
        if (e.message.includes("Network Error")) {
          this.setState({
            showModal: true,
            modalText: "Server may be out of order",
          });
          // console.log("ERROR: Server may be out of order", this.state);
        } else {
          this.setState({
            showModal: true,
            modalText: "Some unexpected error occured",
          });
          // console.log("Something went wrong");
        }

        // console.log("ERROR: ", e.message);
      }
      this.setState({ currentPath: this.props.location.search });
    }
  }

  async componentDidMount() {
    try {
      const { data: photos } = await axios.get(
        apiEndpoint + this.props.location.search
      );

      this.setState({ photos, currentPath: this.props.location.search });
    } catch (e) {
      if (e.message.includes("Network Error")) {
        this.setState({
          showModal: true,
          modalText: "Server may be out of order",
        });
        // console.log("ERROR: Server may be out of order", this.state);
      } else {
        this.setState({
          showModal: true,
          modalText: "Some unexpected error occured",
        });
        // console.log("Something went wrong");
      }
      // console.log("ERROR: ", e.message);
    }
  }

  async handleClick(photo) {
    if (photo.type === "directory") {
      this.props.history.push("/photos?filePath=" + photo.path);
    } else {
      if (
        photo.path.endsWith(".jpg") ||
        photo.path.endsWith(".jpeg") ||
        photo.path.endsWith(".png") ||
        photo.path.endsWith(".svg")
      ) {
        // console.log("Photo viewer should be rendered", photo);
        this.props.history.push("/photo-viewer?filePath=" + photo.path);
      } else if(photo.path.endsWith(".mp4") || photo.path.endsWith(".mkv")) {
        console.log("video player should be rendered");
        this.props.history.push("/x-video?filePath=" + photo.path);
      } else {
        this.setState({
          showModal: true,
          modalText: "File format not supported for displaying photo",
        });
        // console.log("File format not supported for displaying photo");
      }
    }
  }

  getIcon = (photoType) => {
    if (photoType === "file") {
      return <i className="fa fa-picture-o" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-folder" aria-hidden="true"></i>;
    }
  };

  handleSlideshowButtonClick = () => {
    this.props.history.push("/slideshow" + this.state.currentPath);
  }

  getSlideshowButton = () => {
    const imageFiles = [];
    const { photos } = this.state;
    for(let i = 0; i < photos.length; i++) {
      if(photos[i].type === "file") {
        imageFiles.push(photos[i].path);
      }
    }

    if(imageFiles.length > 1) {
      return (
        <div id="slideShowButton">
          <button
            type="button"
            onClick={this.handleSlideshowButtonClick}
            className="btn btn-success float-right"
          >
            Slideshow
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {/* <img
          src="http://localhost:8000/photos?filePath=/home/apurbo/Pictures/99739.jpg"
          alt=""
          className="img-fluid photoStyle"
        /> */}

        {this.getModal()}

        {this.getSlideshowButton()}

        <ul id="photoDirectoryList" className="list-group">
          {this.state.photos.map((photo) => {
            return (
              <li
                key={photo.path}
                id="wrapText"
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleClick(photo)}
              >
                {this.getIcon(photo.type)} {getShortNameOfPath(photo.path)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
 
export default Photos;