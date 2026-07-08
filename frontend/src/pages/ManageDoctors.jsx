import { motion } from 'framer-motion';
import {
  Users, UserPlus, Bell, Search,
  Eye, Trash2, Edit, CheckCircle,
  XCircle, Brain, ScanLine
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const doctors = [
  { name: 'Dr. Vaishnavi B', id: 'DOC-001', email: 'vaishnavi@hospital.com', specialization: 'Neurologist', patients: 24, scans: 87, status: 'Active' },
  { name: 'Dr. Ramesh K', id: 'DOC-002', email: 'ramesh@hospital.com', specialization: 'Radiologist', patients: 18, scans: 64, status: 'Active' },
  { name: 'Dr. Priya S', id: 'DOC-003', email: 'priya@hospital.com', specialization: 'Neurosurgeon', patients: 31, scans: 102, status: 'Active' },
  { name: 'Dr. Kiran M', id: 'DOC-004', email: 'kiran@hospital.com', specialization: 'General Physician', patients: 12, scans: 43, status: 'Inactive' },
  { name: 'Dr. Anitha R', id: 'DOC-005', email: 'anitha@hospital.com', specialization: 'Neurologist', patients: 19, scans: 56, status: 'Active' },
];

export default function ManageDoctors() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen"
      style={{ background: 'linear-gradient(135deg, #020818 0%, #0a0f2e 100%)' }}>

      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(123,47,255,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div>
            <h1 className="text-lg font-black text-white">Manage Doctors</h1>
            <p className="text-xs" style={{ color: '#475569' }}>
              View and manage all registered doctors
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={14} color="#475569" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input placeholder="Search doctors..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', width: '200px' }} />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/create-doctor')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)', color: 'white' }}>
              <UserPlus size={14} />
              Add Doctor
            </motion.button>
            <button className="relative p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={18} color="#64748B" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#7B2FFF' }} />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)', color: 'white' }}>
              AD
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-6">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Doctors', value: doctors.length, color: '#7B2FFF', icon: Users },
              { label: 'Active Doctors', value: doctors.filter(d => d.status === 'Active').length, color: '#00FF88', icon: CheckCircle },
              { label: 'Inactive Doctors', value: doctors.filter(d => d.status === 'Inactive').length, color: '#FF6B35', icon: XCircle },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${stat.color}25` }}>
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon size={18} color={stat.color} />
                  <p className="text-xs" style={{ color: '#475569' }}>{stat.label}</p>
                </div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Doctors Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123,47,255,0.15)' }}>

            {/* Header */}
            <div className="grid grid-cols-7 px-5 py-3 text-xs font-semibold"
              style={{ background: 'rgba(123,47,255,0.08)', borderBottom: '1px solid rgba(123,47,255,0.15)', color: '#475569' }}>
              <span>Doctor</span>
              <span>ID</span>
              <span>Email</span>
              <span>Specialization</span>
              <span className="flex items-center gap-1"><Brain size={10} /> Patients</span>
              <span className="flex items-center gap-1"><ScanLine size={10} /> Scans</span>
              <span>Actions</span>
            </div>

            {/* Rows */}
            {doctors.map((doc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="grid grid-cols-7 px-5 py-4 items-center"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                whileHover={{ background: 'rgba(123,47,255,0.04)' }}>

                {/* Name */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7B2FFF30, #00D4FF20)', color: '#7B2FFF', border: '1px solid #7B2FFF30' }}>
                    {doc.name.charAt(4)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{doc.name}</p>
                    <p className="text-xs" style={{ color: doc.status === 'Active' ? '#00FF88' : '#FF6B35' }}>
                      ● {doc.status}
                    </p>
                  </div>
                </div>

                {/* ID */}
                <span className="text-xs font-mono" style={{ color: '#475569' }}>{doc.id}</span>

                {/* Email */}
                <span className="text-xs truncate" style={{ color: '#64748B' }}>{doc.email}</span>

                {/* Specialization */}
                <span className="text-xs px-2 py-1 rounded-lg w-fit"
                  style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.15)' }}>
                  {doc.specialization}
                </span>

                {/* Patients */}
                <span className="text-sm font-bold text-white">{doc.patients}</span>

                {/* Scans */}
                <span className="text-sm font-bold text-white">{doc.scans}</span>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                    title="View">
                    <Eye size={13} color="#00D4FF" />
                  </button>
                  <button className="p-1.5 rounded-lg"
                    style={{ background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.2)' }}
                    title="Edit">
                    <Edit size={13} color="#7B2FFF" />
                  </button>
                  <button className="p-1.5 rounded-lg"
                    style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}
                    title="Delete">
                    <Trash2 size={13} color="#FF6B35" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}