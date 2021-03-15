import './App.css';
import { Route, Switch } from "react-router-dom";
import NavBar from './components/navbar';
import Video from './components/video';
import Movies from "./components/movies";
import Photos from "./components/photos";
import Musics from "./components/musics";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Video source="http://192.168.31.173:8000/x-video?filePath=/media/apurbo/A69A97279A96F353/Procrastination/Christopher Nolan Movies/Interstellar (2014) (2014) [1080p]/Interstellar.2014.2014.1080p.BluRay.x264.YIFY.mp4" /> */}
      <div className="content">
        <Switch>
          <Route path="/x-video" component={Movies} />
          <Route path="/photos" component={Photos} />
          <Route path="/musics" component={Musics} />
          <Route path="/video-player" component={Video} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
