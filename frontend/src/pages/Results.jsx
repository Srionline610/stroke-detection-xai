import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, AlertTriangle, CheckCircle,
  Download, Share2, Bell, ArrowLeft,
  Activity, Zap, Shield, Eye
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

// Fake GRAD-CAM heatmap overlay using CSS
function HeatmapOverlay() {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ mixBlendMode: 'multiply' }}>
      <div className="absolute inset-0 rounded-xl"
        style={{
          background: `
            radial-gradient(ellipse 60px 80px at 45% 40%, rgba(255,50,50,0.85) 0%, transparent 70%),
            radial-gradient(ellipse 40px 50px at 55% 35%, rgba(255,150,0,0.7) 0%, transparent 70%),
            radial-gradient(ellipse 80px 60px at 40% 50%, rgba(255,200,0,0.4) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
}

const models = [
  { name: 'CNN', confidence: 94.2, result: 'Stroke Detected', color: '#FF6B35' },
  { name: 'ResNet50', confidence: 96.8, result: 'Stroke Detected', color: '#FF6B35' },
  { name: 'EfficientNet B3', confidence: 95.1, result: 'Stroke Detected', color: '#FF6B35' },
  { name: 'Ensemble', confidence: 96.4, result: 'Stroke Detected', color: '#FF6B35', ensemble: true },
];

const findings = [
  { label: 'Affected Region', value: 'Left Middle Cerebral Artery', icon: Brain },
  { label: 'Lesion Type', value: 'Ischemic Stroke', icon: AlertTriangle },
  { label: 'Severity', value: 'Moderate', icon: Activity },
  { label: 'Brain Area', value: 'Temporal Lobe', icon: Eye },
];

export default function Results() {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeTab, setActiveTab] = useState('analysis');
  const navigate = useNavigate();

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
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/scan-upload')}
              className="p-2 rounded-xl transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft size={18} color="#64748B" />
            </button>
            <div>
              <h1 className="text-lg font-black text-white">Analysis Results</h1>
              <p className="text-xs" style={{ color: '#475569' }}>Patient A • PT-2026-001 • MRI Scan</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{ background: 'rgba(123,47,255,0.15)', border: '1px solid rgba(123,47,255,0.3)', color: '#7B2FFF' }}>
              <Share2 size={14} />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', color: 'white' }}>
              <Download size={14} />
              Download Report
            </motion.button>
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

          {/* Alert Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 rounded-2xl mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,107,53,0.05))',
              border: '1px solid rgba(255,107,53,0.3)',
            }}
          >
            <div className="p-2 rounded-xl flex-shrink-0"
              style={{ background: 'rgba(255,107,53,0.2)' }}>
              <AlertTriangle size={20} color="#FF6B35" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: '#FF6B35' }}>
                Possible Stroke Detected — Immediate Medical Attention Required
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                AI model identifies possible ischemic stroke indicators with 96.4% ensemble confidence.
                This result assists clinical decision-making and must be verified by a qualified neurologist.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-black" style={{ color: '#FF6B35' }}>96.4%</p>
              <p className="text-xs" style={{ color: '#475569' }}>Confidence</p>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left — Scan Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Toggle */}
              <div className="flex gap-3 mb-4">
                {[
                  { key: false, label: 'Original Scan' },
                  { key: true, label: 'GRAD-CAM Heatmap' },
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setShowHeatmap(tab.key)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                    style={{
                      background: showHeatmap === tab.key
                        ? 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)'
                        : 'rgba(255,255,255,0.02)',
                      border: showHeatmap === tab.key
                        ? '1px solid #00D4FF50'
                        : '1px solid rgba(255,255,255,0.06)',
                      color: showHeatmap === tab.key ? '#00D4FF' : '#475569',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scan Display */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{
                  background: '#000',
                  border: '1px solid rgba(0,212,255,0.15)',
                  minHeight: '340px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Simulated Brain Scan */}
                <div className="relative w-72 h-72">
                  {/* Brain shape simulation */}
                  <div className="w-full h-full rounded-full relative overflow-hidden"
                    style={{ background: 'radial-gradient(ellipse, #2a2a2a 0%, #1a1a1a 60%, #0a0a0a 100%)' }}>

                    {/* Brain folds simulation */}
                    <div className="absolute inset-4 rounded-full"
                      style={{ background: 'radial-gradient(ellipse, #3a3a3a 0%, #252525 100%)', opacity: 0.8 }} />
                    <div className="absolute inset-8 rounded-full"
                      style={{ background: 'radial-gradient(ellipse, #404040 0%, #2a2a2a 100%)', opacity: 0.6 }} />

                    {/* Center line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px"
                      style={{ background: 'rgba(255,255,255,0.1)' }} />

                    {/* Heatmap overlay */}
                    {showHeatmap && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <HeatmapOverlay />
                      </motion.div>
                    )}
                  </div>

                  {/* Indicator arrow */}
                  {showHeatmap && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-8 right-2"
                    >
                      <div className="px-2 py-1 rounded-lg text-xs font-bold"
                        style={{ background: 'rgba(255,50,50,0.9)', color: 'white' }}>
                        ← Affected Region
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: 'linear-gradient(to top, rgba(2,8,24,0.95), transparent)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">MRI Brain Scan</p>
                      <p className="text-xs" style={{ color: '#475569' }}>Patient A • 06 Jul 2026</p>
                    </div>
                    {showHeatmap && (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {['#FF3232', '#FF9600', '#FFE000', '#00FF88'].map((c, i) => (
                            <div key={i} className="w-5 h-3 rounded"
                              style={{ background: c, opacity: 0.8 }} />
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: '#475569' }}>Low → High</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* XAI Explanation */}
              {showHeatmap && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl"
                  style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)' }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: '#00D4FF' }}>
                    🧠 Explainable AI — GRAD-CAM Analysis
                  </p>
                  <p className="text-xs" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    The highlighted region indicates the area most responsible for the model's
                    prediction. Red zones represent highest activation — indicating possible
                    ischemic lesion in the left temporal region. This visualization assists
                    neurologists in validating AI findings.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Right — Analysis Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* Model Results */}
              <div className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <h3 className="text-sm font-bold text-white mb-4">
                  Model Analysis — Ensemble Results
                </h3>
                <div className="space-y-3">
                  {models.map((model, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="rounded-xl p-3"
                      style={{
                        background: model.ensemble
                          ? 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,107,53,0.05))'
                          : 'rgba(255,255,255,0.02)',
                        border: model.ensemble
                          ? '1px solid rgba(255,107,53,0.3)'
                          : '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {model.ensemble
                            ? <Zap size={14} color="#FF6B35" />
                            : <Brain size={14} color="#00D4FF" />}
                          <span className="text-sm font-bold text-white">{model.name}</span>
                          {model.ensemble && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={{ background: 'rgba(255,107,53,0.2)', color: '#FF6B35' }}>
                              FINAL
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-black" style={{ color: model.color }}>
                          {model.confidence}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${model.confidence}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${model.color}, ${model.color}88)` }}
                        />
                      </div>
                      <p className="text-xs mt-1.5" style={{ color: '#475569' }}>{model.result}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Clinical Findings */}
              <div className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <h3 className="text-sm font-bold text-white mb-4">Clinical Findings</h3>
                <div className="grid grid-cols-2 gap-3">
                  {findings.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="rounded-xl p-3"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <f.icon size={14} color="#00D4FF" className="mb-2" />
                      <p className="text-xs font-bold text-white">{f.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{f.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="rounded-2xl p-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(123,47,255,0.05))',
                  border: '1px solid rgba(0,212,255,0.15)',
                }}>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} color="#00D4FF" />
                  <h3 className="text-sm font-bold text-white">Clinical Recommendation</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'Immediate neurologist consultation recommended',
                    'Consider CT angiography for confirmation',
                    'Monitor blood pressure and neurological signs',
                    'Thrombolytic therapy evaluation within 4.5 hours',
                  ].map((rec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} color="#00FF88" className="mt-0.5 flex-shrink-0" />
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{rec}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl"
                  style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
                  <p className="text-xs" style={{ color: '#FF6B35' }}>
                    ⚠️ This AI analysis assists clinical decision-making only.
                    Final diagnosis must be confirmed by a qualified neurologist.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}