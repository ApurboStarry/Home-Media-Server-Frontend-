import axios from "axios";
import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import getShortNameOfPath from "../util/getShortNameOfPath";

const apiEndpoint = "http://192.168.31.173:8000/x-video";

class Movies extends Component {
  state = {
    movies: [],
    currentPath: "",
    showModal: false,
    modalText: "",
  };

  handleCloseButtonOfModal = () => {
    this.setState({ showModal: false, modalText: "" });
  };

  getModal = () => {
    // console.log("Inside MODAL");
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={this.handleCloseButtonOfModal}
        >
          <Modal.Header style={{ color: "red" }}>ERROR</Modal.Header>
          <Modal.Body>{this.state.modalText}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseButtonOfModal}>Close Modal</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  async componentDidMount() {
    try {
      const { data: movies } = await axios.get(
        apiEndpoint + this.props.location.search
      );

      this.setState({ movies });
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

  async handleClick(movie) {
    if (movie.type === "directory") {
      try {
        const { data: movies } = await axios.get(
          apiEndpoint + "?filePath=" + movie.path
        );

        this.setState({ movies, currentPath: movie.path });
      } catch (e) {
        if (e.message.includes("Network Error")) {
          this.setState({
            showModal: true,
            modalText: "Server may be out of order",
          });

          // console.log("ERROR: Server may be out of order");
        } else {
          this.setState({
            showModal: true,
            modalText: "Some unexpected error occurred",
          });
          // console.log("Something went wrong");
        }
      }
    } else {
      if (movie.path.endsWith(".mp4") || movie.path.endsWith(".mkv")) {
        // console.log("Video player should be rendered", movie);
        this.props.history.push("/video-player?filePath=" + movie.path);
      } else {
        this.setState({
          showModal: true,
          modalText: "File format not supported for video streaming",
        });
        // console.log("File format not supported for video streaming");
      }
    }
  }

  removeTrailingSlashInPath = (path) => {
    const len = path.length;
    if (path[len - 1] === "/") {
      path = path.slice(0, len - 1);
    }

    return path;
  };

  handleGoBack = async () => {
    let currentPath = this.state.currentPath;
    currentPath = this.removeTrailingSlashInPath(currentPath);
    const index = currentPath.lastIndexOf("/");
    const newPath = currentPath.slice(0, index);
    // console.log("Inside Go back", newPath);

    try {
      const { data: movies } = await axios.get(
        apiEndpoint + "?filePath=" + newPath
      );

      this.setState({ movies, currentPath: newPath });
    } catch (e) {
      if (e.message.includes("403")) {
        this.setState({
          showModal: true,
          modalText: "Access Forbidden. You cannot perform this operation.",
        });
        // console.log("Access Forbidden");
      } else {
        this.setState({
          showModal: true,
          modalText: "Some unexpected error occurred",
        });
      }
    }
  };

  getIcon = (movieType) => {
    if (movieType === "file") {
      return <i className="fa fa-film" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-folder" aria-hidden="true"></i>;
    }
  };

  render() {
    const { movies } = this.state;
    // console.log(movies);
    return (
      <div>
        {/* <h1>Movies will be displayed here</h1>
        <p>{this.props.location.search}</p> */}

        {this.getModal()}

        <button
          onClick={this.handleGoBack}
          className="btn btn-success"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Go back
        </button>

        <ul id="movieDirectoryList" className="list-group">
          {this.state.movies.map((movie) => {
            return (
              <li
                key={movie.path}
                id="wrapText"
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleClick(movie)}
              >
                {this.getIcon(movie.type)} {getShortNameOfPath(movie.path)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Movies;
