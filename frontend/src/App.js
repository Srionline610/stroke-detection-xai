import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanUpload from './pages/ScanUpload';
import PatientRecords from './pages/PatientRecords';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan-upload" element={<ScanUpload />} />
        <Route path="/patients" element={<PatientRecords />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;