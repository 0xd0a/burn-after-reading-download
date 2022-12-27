import './App.css';
import DragDropFile from './components/drag-n-drop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DownloadScreen from './components/DownloadScreen.js';

function App() {
  return (
    <Router>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<DragDropFile></DragDropFile>} />
          <Route path="/download" element={<DownloadScreen></DownloadScreen>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
