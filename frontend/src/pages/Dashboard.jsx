import { motion } from 'framer-motion';
import {
  Brain, Users, FileText, Upload,
  Bell, Search, ChevronRight, TrendingUp,
  Shield, Zap, Clock, ScanLine
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const stats = [
  { label: 'Total Scans', value: '1,284', change: '+12%', icon: ScanLine, color: '#00D4FF', bg: '#00D4FF15' },
  { label: 'Stroke Detected', value: '342', change: '+8%', icon: Brain, color: '#7B2FFF', bg: '#7B2FFF15' },
  { label: 'Active Patients', value: '89', change: '+3%', icon: Users, color: '#00FF88', bg: '#00FF8815' },
  { label: 'Avg Accuracy', value: '94.2%', change: '+1.2%', icon: TrendingUp, color: '#FF6B35', bg: '#FF6B3515' },
];

const recentScans = [
  { id: '#SC001', patient: 'Patient A', type: 'MRI', result: 'Stroke Detected', confidence: '96.4%', time: '2 min ago', status: 'critical' },
  { id: '#SC002', patient: 'Patient B', type: 'CT', result: 'No Stroke', confidence: '98.1%', time: '15 min ago', status: 'normal' },
  { id: '#SC003', patient: 'Patient C', type: 'MRI', result: 'Stroke Detected', confidence: '91.7%', time: '1 hr ago', status: 'critical' },
  { id: '#SC004', patient: 'Patient D', type: 'MRI', result: 'No Stroke', confidence: '97.3%', time: '2 hr ago', status: 'normal' },
  { id: '#SC005', patient: 'Patient E', type: 'CT', result: 'Stroke Detected', confidence: '89.5%', time: '3 hr ago', status: 'critical' },
];

const activities = [
  { text: 'New scan uploaded for Patient F', time: '1 min ago', color: '#00D4FF' },
  { text: 'Report generated for Patient A', time: '5 min ago', color: '#7B2FFF' },
  { text: 'Model accuracy updated to 94.2%', time: '20 min ago', color: '#00FF88' },
  { text: 'New patient registered', time: '1 hr ago', color: '#FF6B35' },
  { text: 'System backup completed', time: '2 hr ago', color: '#00D4FF' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen"
      style={{ background: 'linear-gradient(135deg, #020818 0%, #0a0f2e 100%)' }}>

      {/* ✅ Shared Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(0,212,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div>
            <h1 className="text-lg font-black text-white">Dashboard</h1>
            <p className="text-xs" style={{ color: '#475569' }}>Welcome back, Dr. Sri Bhargava</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search size={14} color="#475569" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search patients..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'white',
                  width: '200px',
                }}
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={18} color="#64748B" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: '#00D4FF' }} />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', color: 'white' }}>
              SB
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${stat.color}25`,
                  backdropFilter: 'blur(10px)',
                }}
              >
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

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Recent Scans Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 rounded-2xl p-5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(0,212,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-white">Recent Scans</h2>
                <button
                  onClick={() => navigate('/patients')}
                  className="text-xs flex items-center gap-1"
                  style={{ color: '#00D4FF' }}>
                  View All <ChevronRight size={12} />
                </button>
              </div>

              <div className="space-y-3">
                {recentScans.map((scan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    onClick={() => navigate('/results')}
                    className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer group"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    whileHover={{ background: 'rgba(0,212,255,0.05)', borderColor: 'rgba(0,212,255,0.2)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{
                          background: scan.status === 'critical' ? '#FF6B3515' : '#00FF8815',
                          color: scan.status === 'critical' ? '#FF6B35' : '#00FF88',
                          border: `1px solid ${scan.status === 'critical' ? '#FF6B3540' : '#00FF8840'}`,
                        }}>
                        {scan.type}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{scan.patient}</p>
                        <p className="text-xs" style={{ color: '#475569' }}>{scan.id} • {scan.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold"
                        style={{ color: scan.status === 'critical' ? '#FF6B35' : '#00FF88' }}>
                        {scan.result}
                      </p>
                      <p className="text-xs" style={{ color: '#475569' }}>{scan.confidence}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-4">

              {/* Quick Upload */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => navigate('/scan-upload')}
                className="rounded-2xl p-5 cursor-pointer group"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF10, #7B2FFF10)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center text-center py-4">
                  <div className="p-4 rounded-2xl mb-4"
                    style={{ background: 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)', border: '1px solid #00D4FF30' }}>
                    <Upload size={28} color="#00D4FF" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Upload New Scan</h3>
                  <p className="text-xs mb-4" style={{ color: '#475569' }}>
                    Upload MRI or CT scan for instant AI analysis
                  </p>
                  <button className="w-full py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', color: 'white' }}>
                    Upload Scan
                  </button>
                </div>
              </motion.div>

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(0,212,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3 className="text-sm font-bold text-white mb-4">System Status</h3>
                {[
                  { label: 'AI Model', status: 'Online', color: '#00FF88', icon: Brain },
                  { label: 'Database', status: 'Online', color: '#00FF88', icon: Shield },
                  { label: 'Processing', status: 'Active', color: '#00D4FF', icon: Zap },
                  { label: 'Last Backup', status: '2h ago', color: '#FF6B35', icon: Clock },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <item.icon size={14} color={item.color} />
                      <span className="text-xs" style={{ color: '#64748B' }}>{item.label}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: item.color }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(0,212,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3 className="text-sm font-bold text-white mb-4">Live Activity</h3>
                <div className="space-y-3">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: act.color }} />
                      <div>
                        <p className="text-xs text-white leading-relaxed">{act.text}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#334155' }}>{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}