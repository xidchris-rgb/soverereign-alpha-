import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Play, Terminal, Database, ShieldAlert, BadgeCheck } from 'lucide-react';
import { Venture } from '../types';

interface BuildingDrawerProps {
  onClose: () => void;
}

export default function BuildingDrawer({ onClose }: BuildingDrawerProps) {
  // Ventures List
  const ventures: Venture[] = [
    {
      id: "v1",
      name: "AETHER Grid",
      sector: "Sovereign Compute & Mesh Networks",
      description: "A decentralized, high-density physical GPU/CPU cluster that operates completely independently of hyperscalers. Operates on localized solar microgrids.",
      status: "Alpha",
      progress: 68,
      specifications: {
        "Latency Target": "<14ms localized",
        "Hardware Platform": "Pure VEX ASIC & custom cluster chassis",
        "Redundancy Vector": "Geographic edge shard model"
      }
    },
    {
      id: "v2",
      name: "CHRONOS Core",
      sector: "Bio-computational Storage Nodes",
      description: "Next-generation solid-state information lockers running DNA-layered matrices. Offers secure physical data storage that will endure for millennia.",
      status: "Beta",
      progress: 89,
      specifications: {
        "Half-life Stability": ">10,000 years",
        "Encoding Protocol": "Xerox DNA Shard V3",
        "Sovereign Lockout": "Hardware-enforced bio signature"
      }
    },
    {
      id: "v3",
      name: "AQUILA Transit",
      sector: "Low-Altitude Autonomous Logistical Mesh",
      description: "Autonomous software layer guiding small multi-rotor platforms without cellular or centralized GPS requirements. Uses regional topological meshes.",
      status: "Deploying",
      progress: 95,
      specifications: {
        "Navigation Engine": "Localized topological vision pipeline",
        "Control Mesh": "Point-to-point secure radio telemetry",
        "Load Efficiency": "Up to 15kg continuous transport"
      }
    }
  ];

  const [selectedVentureIdx, setSelectedVentureIdx] = useState<number>(0);

  // Terminal simulator state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS_INIT: Establishing VEX Building Sandbox...",
    "NODE_STATUS: All active systems online [3/3 units]",
    "TELEMETRY: Select 'COMPILE PROTOCOL' to simulate test deployment."
  ]);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCompileSimulation = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setTerminalLogs([
      "COMPILING SYSTEM MATRIX...",
      "TARGET: VEX Autonomous Sandbox v4.11"
    ]);

    const codeLogs = [
      "Connecting local cryptographic ring core...",
      "Inspecting topological routing shards...",
      "Resolving consensus across network edge nodes...",
      "Injecting DNA storage encryption sequence...",
      "TEST COMPILATION SUCCESS: 0 warnings, 0 block failures.",
      "DEPLOYED: Dynamic node sandbox initialized on private subnet."
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < codeLogs.length) {
        setTerminalLogs(prev => [...prev, `[INIT] ${codeLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
      }
    }, 800);
  };

  const activeVenture = ventures[selectedVentureIdx];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 liquid-glass border-l border-white/10 flex flex-col h-full shadow-2xl text-white font-sans"
      id="building-drawer"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-neutral-300" />
          <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase">VENTURE STUDIO CONSOLE</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          id="close-building"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scroll Container */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
        {/* Intro */}
        <p className="text-xs text-neutral-400 font-light leading-relaxed">
          The VEX Studio incubates sovereign technologies that redefine computing, security, and automation. We don't just fund builders; we embed directly within their codebases.
        </p>

        {/* Ventures List / Toggles */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs tracking-widest text-neutral-500 uppercase">ACTIVE CO-BUILDING LIST</h4>
          <div className="flex flex-col gap-2">
            {ventures.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVentureIdx(idx)}
                className={`w-full p-4 rounded text-left border transition-all cursor-pointer ${
                  selectedVentureIdx === idx 
                    ? 'bg-neutral-900 border-white/25 shadow-lg' 
                    : 'bg-neutral-950/45 border-white/5 hover:border-white/10 hover:bg-neutral-900/20'
                }`}
                id={`venture-btn-${v.id}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-sm text-neutral-100">{v.name}</h5>
                    <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">{v.sector}</span>
                  </div>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-white/10 bg-neutral-950 text-neutral-300">
                    {v.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Venture Dashboard Display */}
        <div className="p-5 rounded-lg bg-neutral-950 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-sans text-base font-light text-white">{activeVenture.name}</h5>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase">SANDBOX ALIGNMENT DEPLOYED</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {activeVenture.description}
          </p>

          {/* Progress gauge */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>DEVELOPMENT TO LAUNCH</span>
              <span className="text-white">{activeVenture.progress}% Completed</span>
            </div>
            <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-700 ease-out" 
                style={{ width: `${activeVenture.progress}%` }} 
              />
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <span className="block text-[10px] font-mono text-neutral-500 uppercase">SHARD SPECIFICATIONS</span>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(activeVenture.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between text-xs font-mono p-2 rounded bg-neutral-900/60 border border-white/5">
                  <span className="text-neutral-500 font-light">{key}</span>
                  <span className="text-neutral-300">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sandbox Active Telemetry Console Simulation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-neutral-400" />
              <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">TOPOLOGICAL COMPILE CONSOLE</h4>
            </div>
            <button
              onClick={handleCompileSimulation}
              disabled={isCompiling}
              className={`font-mono text-[9px] font-semibold px-2.5 py-1.5 rounded uppercase flex items-center gap-1 cursor-pointer transition-colors ${
                isCompiling 
                  ? 'bg-neutral-900 text-neutral-500 pointer-events-none' 
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
              id="compile-btn"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              {isCompiling ? "Compiling..." : "COMPILE PROTOCOL"}
            </button>
          </div>

          <div className="p-4 rounded bg-neutral-950 border border-white/10 font-mono text-[10px] text-neutral-300 space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar h-40">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-1">
                <span className="text-neutral-600 shrink-0">&gt;</span>
                <span className="leading-normal">{log}</span>
              </div>
            ))}
            {isCompiling && (
              <div className="flex items-center gap-1">
                <span className="text-neutral-600">&gt;</span>
                <span className="text-white inline-block w-1.5 h-3 bg-white animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
