import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus, Mail, Lock, User,
  Phone, Shield, CheckCircle,
  Bell, ArrowLeft, Eye, EyeOff
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function CreateDoctor() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    specialization: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/admin-dashboard'), 2000);
    }, 2000);
  };

  const inputStyle = (field) => ({
    background: 'rgba(255,255,255,0.04)',
    border: focused === field
      ? '1px solid #7B2FFF80'
      : '1px solid rgba(255,255,255,0.08)',
    boxShadow: focused === field
      ? '0 0 20px rgba(123,47,255,0.15)'
      : 'none',
  });

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
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft size={18} color="#64748B" />
            </button>
            <div>
              <h1 className="text-lg font-black text-white">Create Doctor Account</h1>
              <p className="text-xs" style={{ color: '#475569' }}>
                Add a new doctor to the StrokeXAI platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={18} color="#64748B" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: '#7B2FFF' }} />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)', color: 'white' }}>
              AD
            </div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">

            {/* Success State */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="p-6 rounded-full mb-6"
                  style={{ background: 'rgba(0,255,136,0.1)', border: '2px solid #00FF88' }}>
                  <CheckCircle size={48} color="#00FF88" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">
                  Doctor Account Created! ✅
                </h2>
                <p className="text-sm" style={{ color: '#475569' }}>
                  Redirecting to Admin Dashboard...
                </p>
              </motion.div>
            )}

            {!success && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left — Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(123,47,255,0.1), rgba(0,212,255,0.05))',
                    border: '1px solid rgba(123,47,255,0.2)',
                  }}
                >
                  <div className="p-4 rounded-2xl w-fit mb-6"
                    style={{ background: 'rgba(123,47,255,0.2)', border: '1px solid rgba(123,47,255,0.3)' }}>
                    <UserPlus size={32} color="#7B2FFF" />
                  </div>

                  <h2 className="text-xl font-black text-white mb-3">
                    New Doctor Registration
                  </h2>
                  <p className="text-sm mb-6" style={{ color: '#64748B', lineHeight: '1.7' }}>
                    Create a new doctor account to grant access to the StrokeXAI platform.
                    The doctor will be able to upload scans, view results and manage their patients.
                  </p>

                  <div className="space-y-3">
                    {[
                      { icon: Shield, text: 'Secure JWT authentication', color: '#7B2FFF' },
                      { icon: CheckCircle, text: 'Role-based access control', color: '#00FF88' },
                      { icon: User, text: 'Doctor-only portal access', color: '#00D4FF' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <item.icon size={14} color={item.color} />
                        <span className="text-xs" style={{ color: '#94A3B8' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Info box */}
                  <div className="mt-6 p-4 rounded-xl"
                    style={{ background: 'rgba(123,47,255,0.08)', border: '1px solid rgba(123,47,255,0.2)' }}>
                    <p className="text-xs" style={{ color: '#7B2FFF', lineHeight: '1.6' }}>
                      👑 Only administrators can create doctor accounts.
                      Credentials will be shared securely with the doctor.
                    </p>
                  </div>
                </motion.div>

                {/* Right — Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2 rounded-2xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(123,47,255,0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h3 className="text-base font-bold text-white mb-6">
                    Doctor Information
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold mb-2 block"
                          style={{ color: '#94A3B8' }}>FULL NAME</label>
                        <div className="relative">
                          <User size={14} color={focused === 'name' ? '#7B2FFF' : '#475569'}
                            className="absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused('')}
                            placeholder="Dr. Full Name"
                            required
                            className="w-full py-3 pl-10 pr-4 rounded-xl text-white text-sm outline-none"
                            style={inputStyle('name')}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold mb-2 block"
                          style={{ color: '#94A3B8' }}>PHONE NUMBER</label>
                        <div className="relative">
                          <Phone size={14} color={focused === 'phone' ? '#7B2FFF' : '#475569'}
                            className="absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            onFocus={() => setFocused('phone')}
                            onBlur={() => setFocused('')}
                            placeholder="+91 9999999999"
                            required
                            className="w-full py-3 pl-10 pr-4 rounded-xl text-white text-sm outline-none"
                            style={inputStyle('phone')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold mb-2 block"
                        style={{ color: '#94A3B8' }}>EMAIL ADDRESS</label>
                      <div className="relative">
                        <Mail size={14} color={focused === 'email' ? '#7B2FFF' : '#475569'}
                          className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused('')}
                          placeholder="doctor@hospital.com"
                          required
                          className="w-full py-3 pl-10 pr-4 rounded-xl text-white text-sm outline-none"
                          style={inputStyle('email')}
                        />
                      </div>
                    </div>

                    {/* Specialization */}
                    <div>
                      <label className="text-xs font-semibold mb-2 block"
                        style={{ color: '#94A3B8' }}>SPECIALIZATION</label>
                      <select
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        onFocus={() => setFocused('specialization')}
                        onBlur={() => setFocused('')}
                        required
                        className="w-full py-3 px-4 rounded-xl text-sm outline-none"
                        style={{ ...inputStyle('specialization'), color: form.specialization ? 'white' : '#475569' }}
                      >
                        <option value="">Select specialization</option>
                        <option value="neurologist">Neurologist</option>
                        <option value="radiologist">Radiologist</option>
                        <option value="neurosurgeon">Neurosurgeon</option>
                        <option value="general">General Physician</option>
                        <option value="emergency">Emergency Medicine</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold mb-2 block"
                          style={{ color: '#94A3B8' }}>PASSWORD</label>
                        <div className="relative">
                          <Lock size={14} color={focused === 'password' ? '#7B2FFF' : '#475569'}
                            className="absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused('')}
                            placeholder="••••••••"
                            required
                            className="w-full py-3 pl-10 pr-10 rounded-xl text-white text-sm outline-none"
                            style={inputStyle('password')}
                          />
                          <button type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2">
                            {showPassword
                              ? <EyeOff size={14} color="#475569" />
                              : <Eye size={14} color="#475569" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold mb-2 block"
                          style={{ color: '#94A3B8' }}>CONFIRM PASSWORD</label>
                        <div className="relative">
                          <Lock size={14} color={focused === 'confirm' ? '#7B2FFF' : '#475569'}
                            className="absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            name="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            value={form.confirmPassword}
                            onChange={handleChange}
                            onFocus={() => setFocused('confirm')}
                            onBlur={() => setFocused('')}
                            placeholder="••••••••"
                            required
                            className="w-full py-3 pl-10 pr-10 rounded-xl text-white text-sm outline-none"
                            style={inputStyle('confirm')}
                          />
                          <button type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2">
                            {showConfirm
                              ? <EyeOff size={14} color="#475569" />
                              : <Eye size={14} color="#475569" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Password mismatch warning */}
                    {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs"
                        style={{ color: '#FF6B35' }}>
                        ⚠️ Passwords do not match
                      </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading || form.password !== form.confirmPassword}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl font-bold text-sm tracking-wider mt-2"
                      style={{
                        background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
                        color: 'white',
                        boxShadow: '0 0 30px rgba(123,47,255,0.3)',
                        opacity: loading ? 0.8 : 1,
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <UserPlus size={16} className="animate-pulse" />
                          CREATING ACCOUNT...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <UserPlus size={16} />
                          CREATE DOCTOR ACCOUNT
                        </span>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}