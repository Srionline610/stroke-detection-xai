import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff, Activity } from 'lucide-react';

function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
            grad.addColorStop(1, `rgba(123, 47, 255, ${alpha})`);
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      nodes.forEach(n => {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse);
        glow.addColorStop(0, `rgba(0, 212, 255, ${pulse})`);
        glow.addColorStop(1, `rgba(0, 212, 255, 0)`);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 200, ${pulse})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [activeRole, setActiveRole] = useState('Doctor');

  // ✅ Added navigate
  const navigate = useNavigate();

  // ✅ Updated handleLogin to navigate to dashboard
  const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    if (activeRole === 'Doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/admin-dashboard');
    }
  }, 2000);
};

  return (
    <div className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #020818 0%, #0a0f2e 50%, #020818 100%)' }}>

      <NeuralBackground />

      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00D4FF, transparent)', zIndex: 1 }} />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7B2FFF, transparent)', zIndex: 1 }} />

      <div className="relative flex min-h-screen" style={{ zIndex: 2 }}>

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col justify-center items-start w-1/2 px-20"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="p-3 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)', border: '1px solid #00D4FF40' }}>
              <Brain size={32} color="#00D4FF" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wider">
              Stroke<span style={{ color: '#00D4FF' }}>XAI</span>
            </span>
          </div>

          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            AI-Powered<br />
            <span style={{
              background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Stroke
            </span><br />
            Detection
          </h1>

          <p className="text-lg mb-10" style={{ color: '#94A3B8', maxWidth: '400px', lineHeight: '1.8' }}>
            An Explainable Adaptive Deep Learning Framework for
            Neuroimage-Guided Early Stroke Detection using Ensemble CNN and Grad-CAM.
          </p>

          {[
            { label: 'Detection Accuracy', value: '94.2%', color: '#00D4FF' },
            { label: 'Scans Analyzed', value: '7,200+', color: '#7B2FFF' },
            { label: 'Response Time', value: '<3 sec', color: '#00FF88' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-2 h-2 rounded-full" style={{ background: stat.color }} />
              <span style={{ color: stat.color }} className="text-xl font-bold">{stat.value}</span>
              <span style={{ color: '#64748B' }} className="text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Side — Login Card */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md rounded-3xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(0,212,255,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 80px rgba(0,212,255,0.08), 0 32px 64px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl lg:hidden"
                style={{ background: 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)', border: '1px solid #00D4FF40' }}>
                <Brain size={24} color="#00D4FF" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Welcome Back</h2>
                <p className="text-sm" style={{ color: '#64748B' }}>Sign in to StrokeXAI Platform</p>
              </div>
            </div>

            <div className="my-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #00D4FF30, transparent)' }} />

            {/* ✅ Role selector now interactive */}
            <div className="flex gap-2 mb-6">
              {['Doctor', 'Admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: activeRole === role
                      ? 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)'
                      : 'transparent',
                    border: activeRole === role
                      ? '1px solid #00D4FF60'
                      : '1px solid #ffffff10',
                    color: activeRole === role ? '#00D4FF' : '#64748B',
                  }}>
                  {role}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">

              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail size={16} color={focused === 'email' ? '#00D4FF' : '#475569'}
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="doctor@hospital.com"
                    className="w-full py-3.5 pl-11 pr-4 rounded-xl text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: focused === 'email' ? '1px solid #00D4FF80' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: focused === 'email' ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold mb-2 block" style={{ color: '#94A3B8' }}>
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock size={16} color={focused === 'password' ? '#00D4FF' : '#475569'}
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="••••••••••"
                    className="w-full py-3.5 pl-11 pr-12 rounded-xl text-white text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: focused === 'password' ? '1px solid #00D4FF80' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: focused === 'password' ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                    }}
                  />
                  <button type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2">
                    {showPassword
                      ? <EyeOff size={16} color="#475569" />
                      : <Eye size={16} color="#475569" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button type="button" className="text-xs font-medium"
                  style={{ color: '#00D4FF' }}>
                  Forgot Password?
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-sm tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
                  color: 'white',
                  boxShadow: '0 0 30px rgba(0,212,255,0.3)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Activity size={16} className="animate-spin" />
                    AUTHENTICATING...
                  </span>
                ) : (
                  `SIGN IN AS ${activeRole.toUpperCase()}`
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs" style={{ color: '#334155' }}>
                Sathyabama Institute of Science and Technology
              </p>
              <p className="text-xs mt-1" style={{ color: '#1E293B' }}>
                CSE (IoT) • Final Year Project • IEEE ICICT 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}