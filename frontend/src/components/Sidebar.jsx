import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, LayoutDashboard, ScanLine,
  FolderOpen, FileText, Settings, LogOut, Menu, X
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ScanLine, label: 'Scan Analysis', path: '/scan-upload' },
  { icon: FolderOpen, label: 'Patient Records', path: '/patients' },
  { icon: FileText, label: 'Reports', path: '/results' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
        borderRight: '1px solid rgba(0,212,255,0.1)',
        backdropFilter: 'blur(20px)',
        flexShrink: 0,
      }}
    >
      <div>
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #00D4FF30, #7B2FFF30)', border: '1px solid #00D4FF40' }}>
              <Brain size={22} color="#00D4FF" />
            </div>
            {open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-black text-white tracking-wider">
                Stroke<span style={{ color: '#00D4FF' }}>XAI</span>
              </motion.span>
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
                  background: active ? 'linear-gradient(135deg, #00D4FF15, #7B2FFF15)' : 'transparent',
                  border: active ? '1px solid #00D4FF30' : '1px solid transparent',
                }}
              >
                <item.icon size={20} color={active ? '#00D4FF' : '#475569'} />
                {open && (
                  <span className="text-sm font-medium"
                    style={{ color: active ? '#00D4FF' : '#475569' }}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300"
        style={{ border: '1px solid rgba(255,100,100,0.2)' }}
      >
        <LogOut size={20} color="#FF6B6B" />
        {open && <span className="text-sm font-medium" style={{ color: '#FF6B6B' }}>Logout</span>}
      </button>
    </motion.aside>
  );
}