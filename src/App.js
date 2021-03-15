import './App.css';
import NavBar from './components/navbar';
import Video from './components/video';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Video source="http://192.168.31.173:8000/x-video?filePath=/media/apurbo/A69A97279A96F353/Procrastination/Christopher Nolan Movies/Interstellar (2014) (2014) [1080p]/Interstellar.2014.2014.1080p.BluRay.x264.YIFY.mp4" />
    </div>
  );
}

export default App;
