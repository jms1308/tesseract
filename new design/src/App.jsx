import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe2, 
  Lock, 
  Radio, 
  Server, 
  Shield, 
  Terminal, 
  Zap, 
  ArrowRight,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import MorphingGlobe from './MorphingGlobe';
import { Text_03 } from '@/components/ui/wave-text';
import { TextSlider } from '@/components/ui/dynamic-text-slider';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05020a] text-[#f3f4f6] relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      {/* Glowing orange ambient lights matching the theme (smaller/subtler) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[220px] bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12)_0%,rgba(245,158,11,0.06)_35%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[90px] bg-orange-500/10 rounded-full blur-[50px] pointer-events-none z-0" />
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[120px] h-[50px] bg-amber-500/8 rounded-full blur-[35px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.02),transparent_70%)] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto px-8 h-16 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between shadow-xl shadow-orange-950/5">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg tracking-wider bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent leading-none text-left">
              TESSERACT<br /><span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-semibold">MARKETING</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Xizmatlar" className="text-sm font-medium" />
            </a>
            <a href="#about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Biz haqimizda" className="text-sm font-medium" />
            </a>
            <a href="#portfolio" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Portfolio" className="text-sm font-medium" />
            </a>
            <a href="#contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Kontakt" className="text-sm font-medium" />
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="relative px-5 py-2 rounded-full border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 flex items-center gap-1 group">
              <Text_03 text="Bog'lanish" className="font-semibold text-xs" /> <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 border border-white/10 bg-[#05020a]/90 backdrop-blur-lg px-6 py-6 flex flex-col gap-4 rounded-2xl w-full z-40">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Xizmatlar" className="text-base font-medium" />
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Biz haqimizda" className="text-base font-medium" />
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Portfolio" className="text-base font-medium" />
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Kontakt" className="text-base font-medium" />
            </a>
            <hr className="border-white/10 my-1" />
            <button className="w-full text-center py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-bold rounded-full flex items-center justify-center gap-2 group">
              <Text_03 text="Bog'lanish" className="font-bold text-base" /> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 min-h-screen flex items-center justify-center z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full">
          
          {/* Left Hero Content */}
          <div className="flex-1 flex flex-col items-start text-left max-w-2xl lg:pl-16">
            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[66px] tracking-tight leading-[1.15] mb-6 text-white flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Biznesingizni</span> <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">raqamli</span>
              <span>olamda</span>
              <TextSlider text="o'stiramiz" className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent font-display font-extrabold text-5xl sm:text-6xl lg:text-[66px]" />
            </h1>

            {/* Description */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Strategiya, kreativ va texnologiyani uyg'unlashtirib, brendingizni keyingi darajaga olib chiqamiz.
            </p>
          </div>

          {/* Right — Globe & Morphing Cube Visualization */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-0 min-h-[550px] w-full relative">
            <div className="absolute inset-0 bg-radial-gradient opacity-80 blur-xl pointer-events-none scale-75" />
            <div className="relative w-full max-w-[760px] aspect-square flex items-center justify-center">
              <MorphingGlobe />
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Explanation Section */}
      <section className="relative border-t border-white/5 bg-neutral-950/30 py-20 z-10" id="network">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Fluid Grid Architecture
            </h2>
            <p className="text-neutral-400">
              Watch the visualization transform. When workloads shift from global synchronization (Sphere/Globe Mode) to structured database clusters (Cube Mode), every single node dynamically realigns.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glow-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 text-orange-400">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Sphere Topology</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Evenly distributed Fibonacci mesh providing optimized route planning, geo-routing, and dynamic request load balancing worldwide.
              </p>
            </div>

            <div className="glow-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Cube Topology</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Structured multi-region matrix layout optimized for stateful database replication, high concurrency, and localized key-value lookups.
              </p>
            </div>

            <div className="glow-card p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 text-rose-400">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Dynamic Morphing</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                No downtime transition logic. Node coordinates recalculate in real-time, flying directly to their new configuration states without dropping a packet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specifications / Dashboard Preview */}
      <section className="py-20 z-10" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glow-card p-8 md:p-12 rounded-3xl overflow-hidden relative flex flex-col lg:flex-row items-center gap-12">
            
            {/* Background elements */}
            <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-gradient-to-bl from-orange-500/8 to-amber-500/0 rounded-full blur-3xl pointer-events-none" />

            <div className="flex-1 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono mb-3 block">Real-time Telemetry</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
                Automated Load Re-balancing
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-mono text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-white text-base">Automatic Failover Protection</h4>
                    <p className="text-neutral-400 text-sm">If a region suffers high latency, the nodes morph topology to reroute requests instantly.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-mono text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-white text-base">Stateful Sync Engine</h4>
                    <p className="text-neutral-400 text-sm">Consistent database sync across all coordinate facets, mapping perfectly to the cubic data model.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-mono text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-white text-base">Enterprise Grade Security</h4>
                    <p className="text-neutral-400 text-sm">Zero-trust routing and mutual TLS across all nodes, regardless of current topology.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive HUD card */}
            <div className="flex-1 w-full max-w-md bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-xs text-neutral-400 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-white font-semibold">cluster-monitor-v2</span>
                </div>
                <span className="text-[10px] text-orange-400">SYS_OK</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Topology:</span>
                  <span className="text-amber-400 font-semibold uppercase">DYNAMIC_MESH</span>
                </div>
                <div className="flex justify-between">
                  <span>Node Count:</span>
                  <span className="text-white">600 Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>Interpolation Factor:</span>
                  <span className="text-orange-400 font-semibold">Morphing Adaptive</span>
                </div>
                <div className="flex justify-between">
                  <span>Packet Drop Rate:</span>
                  <span className="text-orange-400">0.000%</span>
                </div>
              </div>

              {/* Progress bar simulation */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px]">
                  <span>RE-ROUTE PROGRESS</span>
                  <span className="text-white">100% SUCCESS</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-400 w-full" />
                </div>
              </div>

              <div className="bg-neutral-950/80 p-3 rounded-lg border border-white/5 text-[11px] leading-relaxed text-amber-300">
                &gt; vens-edge-cli --morph --target=cube <br />
                <span className="text-neutral-500">Initializing coordinates transformation...</span> <br />
                <span className="text-orange-400">Morph complete. 600 nodes successfully mapped.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050505]/90 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-display font-bold tracking-tight text-white">VENS.EDGE</span>
          </div>
          
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact Support</a>
          </div>

          <span className="text-xs text-neutral-600 font-mono">
            &copy; 2026 Vens Edge, Inc. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
