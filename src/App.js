import './App.css';
import Video from './components/video';

function App() {
  return (
    <div className="App">
      <Video source="http://192.168.31.173:8000/video" />
    </div>
  );
}

export default App;
