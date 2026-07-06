import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Plus, Eye, FileText,
  Brain, Bell, ChevronDown, User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const patients = [
  { id: 'PT-2026-001', name: 'Patient A', age: 58, gender: 'Male', scans: 3, lastScan: '06 Jul 2026', result: 'Stroke Detected', confidence: '96.4%', status: 'critical' },
  { id: 'PT-2026-002', name: 'Patient B', age: 45, gender: 'Female', scans: 1, lastScan: '05 Jul 2026', result: 'No Stroke', confidence: '98.1%', status: 'normal' },
  { id: 'PT-2026-003', name: 'Patient C', age: 67, gender: 'Male', scans: 5, lastScan: '05 Jul 2026', result: 'Stroke Detected', confidence: '91.7%', status: 'critical' },
  { id: 'PT-2026-004', name: 'Patient D', age: 52, gender: 'Female', scans: 2, lastScan: '04 Jul 2026', result: 'No Stroke', confidence: '97.3%', status: 'normal' },
  { id: 'PT-2026-005', name: 'Patient E', age: 71, gender: 'Male', scans: 4, lastScan: '04 Jul 2026', result: 'Stroke Detected', confidence: '89.5%', status: 'critical' },
  { id: 'PT-2026-006', name: 'Patient F', age: 39, gender: 'Female', scans: 1, lastScan: '03 Jul 2026', result: 'No Stroke', confidence: '99.1%', status: 'normal' },
  { id: 'PT-2026-007', name: 'Patient G', age: 63, gender: 'Male', scans: 2, lastScan: '03 Jul 2026', result: 'Stroke Detected', confidence: '93.2%', status: 'critical' },
  { id: 'PT-2026-008', name: 'Patient H', age: 48, gender: 'Female', scans: 1, lastScan: '02 Jul 2026', result: 'No Stroke', confidence: '96.8%', status: 'normal' },
];

export default function PatientRecords() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' ||
      (filter === 'Critical' && p.status === 'critical') ||
      (filter === 'Normal' && p.status === 'normal');
    return matchSearch && matchFilter;
  });

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
            <h1 className="text-lg font-black text-white">Patient Records</h1>
            <p className="text-xs" style={{ color: '#475569' }}>Manage and view all patient scan history</p>
          </div>
          <div className="flex items-center gap-4">
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

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Patients', value: patients.length, color: '#00D4FF' },
              { label: 'Stroke Detected', value: patients.filter(p => p.status === 'critical').length, color: '#FF6B35' },
              { label: 'No Stroke', value: patients.filter(p => p.status === 'normal').length, color: '#00FF88' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${stat.color}25`,
                }}
              >
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Search + Filter + Add */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-4"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search size={14} color="#475569" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or patient ID..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none text-white"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8' }}
              >
                <option value="All">All Patients</option>
                <option value="Critical">Stroke Detected</option>
                <option value="Normal">No Stroke</option>
              </select>
              <Filter size={14} color="#475569" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown size={14} color="#475569" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Add Patient */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/scan-upload')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', color: 'white' }}
            >
              <Plus size={16} />
              New Scan
            </motion.button>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.1)' }}
          >
            {/* Table Header */}
            <div className="grid grid-cols-7 px-4 py-3 text-xs font-semibold"
              style={{ background: 'rgba(0,212,255,0.05)', borderBottom: '1px solid rgba(0,212,255,0.1)', color: '#475569' }}>
              <span>Patient</span>
              <span>ID</span>
              <span>Age / Gender</span>
              <span>Total Scans</span>
              <span>Last Scan</span>
              <span>Result</span>
              <span>Actions</span>
            </div>

            {/* Table Rows */}
            {filtered.map((patient, i) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="grid grid-cols-7 px-4 py-4 items-center transition-all duration-300 cursor-pointer"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                }}
                whileHover={{ background: 'rgba(0,212,255,0.03)' }}
              >
                {/* Patient Name */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: patient.status === 'critical' ? 'rgba(255,107,53,0.15)' : 'rgba(0,255,136,0.15)',
                      color: patient.status === 'critical' ? '#FF6B35' : '#00FF88',
                    }}>
                    <User size={14} />
                  </div>
                  <span className="text-sm font-medium text-white">{patient.name}</span>
                </div>

                {/* ID */}
                <span className="text-xs" style={{ color: '#475569' }}>{patient.id}</span>

                {/* Age / Gender */}
                <span className="text-xs text-white">{patient.age}y / {patient.gender}</span>

                {/* Scans */}
                <div className="flex items-center gap-1">
                  <Brain size={12} color="#00D4FF" />
                  <span className="text-xs text-white">{patient.scans} scans</span>
                </div>

                {/* Last Scan */}
                <span className="text-xs" style={{ color: '#475569' }}>{patient.lastScan}</span>

                {/* Result */}
                <div>
                  <span className="text-xs font-bold px-2 py-1 rounded-lg"
                    style={{
                      background: patient.status === 'critical' ? 'rgba(255,107,53,0.15)' : 'rgba(0,255,136,0.15)',
                      color: patient.status === 'critical' ? '#FF6B35' : '#00FF88',
                      border: `1px solid ${patient.status === 'critical' ? 'rgba(255,107,53,0.3)' : 'rgba(0,255,136,0.3)'}`,
                    }}>
                    {patient.result}
                  </span>
                  <p className="text-xs mt-1" style={{ color: '#334155' }}>{patient.confidence}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/results')}
                    className="p-1.5 rounded-lg transition-all duration-300"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                    title="View Results">
                    <Eye size={14} color="#00D4FF" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg transition-all duration-300"
                    style={{ background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.2)' }}
                    title="View Report">
                    <FileText size={14} color="#7B2FFF" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <User size={40} color="#1E293B" className="mb-3" />
                <p className="text-sm font-medium" style={{ color: '#334155' }}>No patients found</p>
                <p className="text-xs mt-1" style={{ color: '#1E293B' }}>Try a different search or filter</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}