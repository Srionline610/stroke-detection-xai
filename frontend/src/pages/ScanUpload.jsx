import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, X, FileImage, Brain,
  CheckCircle, AlertCircle, Loader, Bell, Search
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function ScanUpload() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [scanType, setScanType] = useState('MRI');
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [notes, setNotes] = useState('');
  const fileRef = useRef();
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleFile = (f) => {
    setFile(f);
    setUploaded(false);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      setTimeout(() => navigate('/results'), 1000);
    }, 3000);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setUploaded(false);
  };

  return (
    <div className="flex min-h-screen"
      style={{ background: 'linear-gradient(135deg, #020818 0%, #0a0f2e 100%)' }}>

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(0,212,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div>
            <h1 className="text-lg font-black text-white">Scan Analysis</h1>
            <p className="text-xs" style={{ color: '#475569' }}>Upload MRI or CT scan for AI analysis</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={14} color="#475569" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input placeholder="Search..." className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', width: '200px' }} />
            </div>
            <button className="relative p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={18} color="#64748B" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#00D4FF' }} />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', color: 'white' }}>
              SB
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left — Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Scan Type Selector */}
              <div className="flex gap-3 mb-4">
                {['MRI', 'CT Scan'].map((type) => (
                  <button key={type}
                    onClick={() => setScanType(type)}
                    className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                    style={{
                      background: scanType === type
                        ? 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)'
                        : 'rgba(255,255,255,0.02)',
                      border: scanType === type
                        ? '1px solid #00D4FF60'
                        : '1px solid rgba(255,255,255,0.06)',
                      color: scanType === type ? '#00D4FF' : '#475569',
                    }}>
                    {type}
                  </button>
                ))}
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => !file && fileRef.current.click()}
                className="relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  border: dragOver
                    ? '2px dashed #00D4FF'
                    : file
                      ? '2px solid #00D4FF40'
                      : '2px dashed rgba(0,212,255,0.2)',
                  background: dragOver
                    ? 'rgba(0,212,255,0.05)'
                    : 'rgba(255,255,255,0.02)',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AnimatePresence mode="wait">
                  {!file ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center p-10"
                    >
                      <div className="p-6 rounded-3xl mb-6"
                        style={{ background: 'linear-gradient(135deg, #00D4FF10, #7B2FFF10)', border: '1px solid #00D4FF20' }}>
                        <Upload size={40} color="#00D4FF" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        Drop your {scanType} scan here
                      </h3>
                      <p className="text-sm mb-4" style={{ color: '#475569' }}>
                        or click to browse files
                      </p>
                      <span className="text-xs px-3 py-1 rounded-full"
                        style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid #00D4FF20' }}>
                        Supports: JPG, PNG, DICOM, NIfTI
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full"
                    >
                      <img src={preview} alt="scan"
                        className="w-full object-cover rounded-2xl"
                        style={{ maxHeight: '300px', objectFit: 'contain' }} />

                      {/* Overlay info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-2xl"
                        style={{ background: 'linear-gradient(to top, rgba(2,8,24,0.95), transparent)' }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileImage size={16} color="#00D4FF" />
                            <span className="text-xs text-white font-medium">{file.name}</span>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); removeFile(); }}
                            className="p-1 rounded-lg"
                            style={{ background: 'rgba(255,100,100,0.2)', border: '1px solid rgba(255,100,100,0.3)' }}>
                            <X size={14} color="#FF6B6B" />
                          </button>
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#475569' }}>
                          {(file.size / 1024).toFixed(1)} KB • {scanType}
                        </p>
                      </div>

                      {/* Success overlay */}
                      {uploaded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center rounded-2xl"
                          style={{ background: 'rgba(0,255,136,0.15)', border: '2px solid #00FF88' }}>
                          <div className="flex flex-col items-center gap-2">
                            <CheckCircle size={48} color="#00FF88" />
                            <span className="text-white font-bold">Redirecting to Results...</span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <input ref={fileRef} type="file"
                  accept="image/*,.dcm,.nii"
                  className="hidden"
                  onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
              </div>

              {/* AI Info Cards */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'CNN Model', status: 'Ready', color: '#00FF88' },
                  { label: 'ResNet50', status: 'Ready', color: '#00FF88' },
                  { label: 'EfficientNet', status: 'Ready', color: '#00FF88' },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl p-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,255,136,0.15)' }}>
                    <Brain size={16} color={m.color} className="mx-auto mb-1" />
                    <p className="text-xs font-bold text-white">{m.label}</p>
                    <p className="text-xs" style={{ color: m.color }}>{m.status}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Patient Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(0,212,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h2 className="text-base font-bold text-white mb-6">Patient Information</h2>

              <div className="space-y-4">
                {/* Patient Name */}
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>
                    PATIENT NAME
                  </label>
                  <input
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    placeholder="Enter patient full name"
                    className="w-full py-3 px-4 rounded-xl text-white text-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                {/* Patient ID */}
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>
                    PATIENT ID
                  </label>
                  <input
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    placeholder="e.g. PT-2026-001"
                    className="w-full py-3 px-4 rounded-xl text-white text-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>AGE</label>
                    <input placeholder="e.g. 45"
                      className="w-full py-3 px-4 rounded-xl text-white text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>GENDER</label>
                    <select className="w-full py-3 px-4 rounded-xl text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8' }}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Scan Type display */}
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>
                    SCAN TYPE
                  </label>
                  <div className="py-3 px-4 rounded-xl text-sm font-semibold"
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
                    {scanType}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>
                    CLINICAL NOTES
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Add any clinical observations or symptoms..."
                    rows={3}
                    className="w-full py-3 px-4 rounded-xl text-white text-sm outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                {/* Warning */}
                <div className="flex gap-2 p-3 rounded-xl"
                  style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                  <AlertCircle size={14} color="#FF6B35" className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs" style={{ color: '#FF6B35' }}>
                    This system assists medical professionals. Final diagnosis must be confirmed by a qualified doctor.
                  </p>
                </div>

                {/* Analyze Button */}
                <motion.button
                  onClick={handleAnalyze}
                  disabled={!file || uploading}
                  whileHover={file ? { scale: 1.02 } : {}}
                  whileTap={file ? { scale: 0.98 } : {}}
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wider"
                  style={{
                    background: file
                      ? 'linear-gradient(135deg, #00D4FF, #7B2FFF)'
                      : 'rgba(255,255,255,0.05)',
                    color: file ? 'white' : '#475569',
                    boxShadow: file ? '0 0 30px rgba(0,212,255,0.3)' : 'none',
                    cursor: file ? 'pointer' : 'not-allowed',
                  }}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader size={16} className="animate-spin" />
                      ANALYZING WITH AI...
                    </span>
                  ) : uploaded ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle size={16} />
                      ANALYSIS COMPLETE!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Brain size={16} />
                      START AI ANALYSIS
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}