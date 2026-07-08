import { motion } from 'framer-motion';
import {
  Brain, Users, ScanLine, TrendingUp,
  Bell, Search, UserPlus, Shield,
  Activity, BarChart3, CheckCircle,
  AlertTriangle, Clock, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const stats = [
  { label: 'Total Doctors', value: '12', change: '+2', icon: Users, color: '#7B2FFF', bg: '#7B2FFF15' },
  { label: 'Total Patients', value: '284', change: '+24', icon: Brain, color: '#00D4FF', bg: '#00D4FF15' },
  { label: 'Scans Today', value: '47', change: '+8', icon: ScanLine, color: '#00FF88', bg: '#00FF8815' },
  { label: 'System Accuracy', value: '94.2%', change: '+1.2%', icon: TrendingUp, color: '#FF6B35', bg: '#FF6B3515' },
];

const doctors = [
  { name: 'Dr. Vaishnavi B', id: 'DOC-001', patients: 24, scans: 87, status: 'Active' },
  { name: 'Dr. Ramesh K', id: 'DOC-002', patients: 18, scans: 64, status: 'Active' },
  { name: 'Dr. Priya S', id: 'DOC-003', patients: 31, scans: 102, status: 'Active' },
  { name: 'Dr. Kiran M', id: 'DOC-004', patients: 12, scans: 43, status: 'Inactive' },
];

const modelStats = [
  { name: 'CNN', accuracy: 84.2, color: '#00D4FF' },
  { name: 'ResNet50', accuracy: 89.6, color: '#7B2FFF' },
  { name: 'EfficientNet', accuracy: 91.8, color: '#00FF88' },
  { name: 'Ensemble', accuracy: 94.2, color: '#FF6B35' },
];

const systemLogs = [
  { text: 'Model retrained successfully', time: '10 min ago', type: 'success' },
  { text: 'Dr. Vaishnavi uploaded 3 scans', time: '25 min ago', type: 'info' },
  { text: 'Database backup completed', time: '1 hr ago', type: 'success' },
  { text: 'New doctor account created', time: '2 hr ago', type: 'info' },
  { text: 'High confidence stroke detected', time: '3 hr ago', type: 'warning' },
];

export default function AdminDashboard() {
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
            <h1 className="text-lg font-black text-white">Admin Dashboard</h1>
            <p className="text-xs" style={{ color: '#475569' }}>
              System Overview — StrokeXAI Platform 👑
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={14} color="#475569" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', width: '200px' }} />
            </div>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${stat.color}25` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl" style={{ background: stat.bg }}>
                    <stat.icon size={18} color={stat.color} />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg"
                    style={{ background: '#00FF8815', color: '#00FF88' }}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-xs" style={{ color: '#475569' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* Doctors Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123,47,255,0.15)' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-white">Registered Doctors</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/create-doctor')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)', color: 'white' }}>
                  <UserPlus size={14} />
                  Add Doctor
                </motion.button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-5 px-3 py-2 text-xs font-semibold mb-2"
                style={{ color: '#475569' }}>
                <span>Doctor</span>
                <span>ID</span>
                <span>Patients</span>
                <span>Scans</span>
                <span>Status</span>
              </div>

              <div className="space-y-2">
                {doctors.map((doc, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="grid grid-cols-5 items-center px-3 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    whileHover={{ background: 'rgba(123,47,255,0.05)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: 'rgba(123,47,255,0.2)', color: '#7B2FFF' }}>
                        {doc.name.charAt(4)}
                      </div>
                      <span className="text-xs font-medium text-white truncate">{doc.name}</span>
                    </div>
                    <span className="text-xs" style={{ color: '#475569' }}>{doc.id}</span>
                    <span className="text-xs text-white">{doc.patients}</span>
                    <span className="text-xs text-white">{doc.scans}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg w-fit"
                      style={{
                        background: doc.status === 'Active' ? 'rgba(0,255,136,0.15)' : 'rgba(255,107,53,0.15)',
                        color: doc.status === 'Active' ? '#00FF88' : '#FF6B35',
                      }}>
                      {doc.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-4">

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123,47,255,0.15)' }}>
                <h3 className="text-sm font-bold text-white mb-4">Admin Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Create Doctor Account', icon: UserPlus, color: '#7B2FFF', path: '/create-doctor' },
                    { label: 'View All Patients', icon: Users, color: '#00D4FF', path: '/patients' },
                    { label: 'System Analytics', icon: BarChart3, color: '#00FF88', path: '/analytics' },
                    { label: 'Security Settings', icon: Shield, color: '#FF6B35', path: '/settings' },
                  ].map((action, i) => (
                    <button key={i}
                      onClick={() => navigate(action.path)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300"
                      style={{ background: `${action.color}10`, border: `1px solid ${action.color}25` }}
                      onMouseEnter={e => e.currentTarget.style.background = `${action.color}20`}
                      onMouseLeave={e => e.currentTarget.style.background = `${action.color}10`}>
                      <action.icon size={16} color={action.color} />
                      <span className="text-xs font-medium text-white">{action.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* System Logs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123,47,255,0.15)' }}>
                <h3 className="text-sm font-bold text-white mb-4">System Logs</h3>
                <div className="space-y-3">
                  {systemLogs.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {log.type === 'success' && <CheckCircle size={12} color="#00FF88" />}
                        {log.type === 'warning' && <AlertTriangle size={12} color="#FF6B35" />}
                        {log.type === 'info' && <Activity size={12} color="#00D4FF" />}
                      </div>
                      <div>
                        <p className="text-xs text-white">{log.text}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#334155' }}>{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Model Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123,47,255,0.15)' }}>
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} color="#7B2FFF" />
              <h3 className="text-sm font-bold text-white">AI Model Performance</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {modelStats.map((model, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="rounded-xl p-4"
                  style={{ background: `${model.color}08`, border: `1px solid ${model.color}25` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} color={model.color} />
                    <span className="text-xs font-bold text-white">{model.name}</span>
                  </div>
                  <p className="text-xl font-black mb-2" style={{ color: model.color }}>
                    {model.accuracy}%
                  </p>
                  <div className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.accuracy}%` }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${model.color}, ${model.color}88)` }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock size={10} color="#334155" />
                    <p className="text-xs" style={{ color: '#334155' }}>Last updated today</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}