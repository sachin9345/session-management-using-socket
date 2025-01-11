import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateSession from './Components/Sessioncreate/Createsession';
import SessionScreen from './Components/session/sessionScreen/sessionScreen';
import JoinSession from './Components/Joinsession/Joinsession';
import VideoCall from './Components/session/components/videoCall/videoCall';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<CreateSession />} />
      <Route path="/join" element={<JoinSession />} />
      <Route path="/session/:sessionId" element={<SessionScreen/>} />
      <Route path="/videocall" element={<VideoCall/>}/>
      </Routes>
    </Router>
  );
}

export default App;
