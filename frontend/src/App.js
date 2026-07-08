import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScanUpload from './pages/ScanUpload';
import PatientRecords from './pages/PatientRecords';
import Results from './pages/Results';
import CreateDoctor from './pages/CreateDoctor';
import ManageDoctors from './pages/ManageDoctors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/scan-upload" element={<ScanUpload />} />
        <Route path="/patients" element={<PatientRecords />} />
        <Route path="/results" element={<Results />} />
        <Route path="/create-doctor" element={<CreateDoctor />} />
        <Route path="/manage-doctors" element={<ManageDoctors />} />
      </Routes>
    </Router>
  );
}

export default App;