import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const apiEndpoint = "http://192.168.31.173:8000/photos";

class SlideShow extends Component {
  state = {
    photos: [],
    imagesForSlideshow: [],
    showModal: false,
    modalText: "",
  };

  getModal = () => {
    console.log("Inside MODAL", this.state);
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

  async componentDidMount() {
    console.log("Inside componentDidMount of SlideShow");
    try {
      const { data: photos } = await axios.get(
        apiEndpoint + this.props.location.search
      );

      const imagesForSlideshow = this.getImagesForSlideshow(photos);
      
      this.setState({
        photos,
        imagesForSlideshow,
        currentPath: this.props.location.search,
      });
      console.log("imagesForSlideshow", imagesForSlideshow);
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

  getImagesForSlideshow = (photos) => {
    const imagesForSlideshow = [];

    for (let i = 0; i < photos.length; i++) {
      const tokens = photos[i].path.split(".");
      const extensionName = tokens[tokens.length - 1];
      const supportedExtensions = ["jpg", "jpeg", "png", "svg"];
      if (photos[i].type === "file" && supportedExtensions.indexOf(extensionName) > -1) {
        const urlOfPhoto = apiEndpoint + "?filePath=" + photos[i].path;
        imagesForSlideshow.push({
          original: urlOfPhoto,
          thumbnail: urlOfPhoto,
        });
      }
    }

    return imagesForSlideshow;
  };

  render() {
    return (
      <div style={{ paddingTop: 20 }}>
        <ImageGallery items={this.state.imagesForSlideshow} />
      </div>
    );
  }
}

export default SlideShow;
