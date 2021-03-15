import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import getShortNameOfPath from "../util/getShortNameOfPath";

const apiEndpoint = "http://192.168.31.173:8000/x-video";

class Movies extends Component {
  state = {
    movies: [],
    currentPath: "",
  };

  async componentDidMount() {
    const { data: movies } = await axios.get(
      apiEndpoint + this.props.location.search
    );
    // console.log(movies);
    this.setState({ movies });
    console.log(this.props.location.search);
    console.log("this.state", this.state);
  }

  async handleClick(movie) {
    if(movie.type === "directory") {
      const { data: movies } = await axios.get(
        apiEndpoint + "?filePath=" + movie.path
      );
  
      this.setState({ movies, currentPath: movie.path });
    } else {
      if(movie.path.endsWith(".mp4") || movie.path.endsWith(".mkv")) {
        console.log("Video player should be rendered", movie);
        this.props.history.push("/video-player?filePath=" + movie.path);

      } else {
        console.log("File format not supported for video streaming");
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
    console.log("Inside Go back", newPath);

    const { data: movies } = await axios.get(
      apiEndpoint + "?filePath=" + newPath
    );

    this.setState({ movies, currentPath: newPath });
  };

  render() {
    const { movies } = this.state;
    console.log(movies);
    return (
      <div>
        {/* <h1>Movies will be displayed here</h1>
        <p>{this.props.location.search}</p> */}

        <button onClick={this.handleGoBack} className="btn btn-success" style={{ marginTop: 20, marginBottom: 20}}>
          Go back
        </button>

        <ul id="movieDirectoryList" className="list-group">
          {this.state.movies.map((movie) => {
            return (
              <li
                key={movie.path}
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => this.handleClick(movie)}
              >
                {movie.type} - {getShortNameOfPath(movie.path)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Movies;
