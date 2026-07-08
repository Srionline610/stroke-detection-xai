import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, LayoutDashboard, ScanLine,
  FolderOpen, FileText, Settings,
  LogOut, Menu, X, Users, BarChart3,
  UserPlus, Shield
} from 'lucide-react';

const doctorNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor-dashboard' },
  { icon: ScanLine, label: 'Scan Analysis', path: '/scan-upload' },
  { icon: FolderOpen, label: 'Patient Records', path: '/patients' },
  { icon: FileText, label: 'Reports', path: '/results' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminNav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard' },
  { icon: Users, label: 'Manage Doctors', path: '/manage-doctors' },
  { icon: UserPlus, label: 'Create Doctor', path: '/create-doctor' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Shield, label: 'System', path: '/system' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ role = 'doctor' }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = role === 'admin' ? adminNav : doctorNav;
  const accentColor = role === 'admin' ? '#7B2FFF' : '#00D4FF';

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-between py-6 px-4 transition-all duration-300"
      style={{
        width: open ? '240px' : '72px',
        minHeight: '100vh',
        background: 'rgba(255,255,255,0.02)',
        borderRight: `1px solid ${accentColor}20`,
        backdropFilter: 'blur(20px)',
        flexShrink: 0,
      }}
    >
      <div>
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`,
                border: `1px solid ${accentColor}40`
              }}>
              <Brain size={22} color={accentColor} />
            </div>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-base font-black text-white tracking-wider">
                  Stroke<span style={{ color: accentColor }}>XAI</span>
                </p>
                <p className="text-xs font-medium"
                  style={{ color: accentColor }}>
                  {role === 'admin' ? 'Admin Panel' : 'Doctor Portal'}
                </p>
              </motion.div>
            )}
          </div>
          <button onClick={() => setOpen(!open)} className="p-1">
            {open ? <X size={16} color="#475569" /> : <Menu size={16} color="#475569" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300"
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)`
                    : 'transparent',
                  border: active
                    ? `1px solid ${accentColor}30`
                    : '1px solid transparent',
                }}
              >
                <item.icon size={20} color={active ? accentColor : '#475569'} />
                {open && (
                  <span className="text-sm font-medium"
                    style={{ color: active ? accentColor : '#475569' }}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Badge + Logout */}
      <div className="space-y-2">
        {open && (
          <div className="px-3 py-2 rounded-xl text-center"
            style={{
              background: `${accentColor}10`,
              border: `1px solid ${accentColor}20`
            }}>
            <p className="text-xs font-bold"
              style={{ color: accentColor }}>
              {role === 'admin' ? '👑 Administrator' : '🩺 Doctor'}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#334155' }}>
              Sri Bhargava
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300"
          style={{ border: '1px solid rgba(255,100,100,0.2)' }}
        >
          <LogOut size={20} color="#FF6B6B" />
          {open && <span className="text-sm font-medium" style={{ color: '#FF6B6B' }}>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}