import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp, Send, CheckCircle2, Sliders, FileText } from 'lucide-react';
import { InvestmentScenario } from '../types';

interface InvestingDrawerProps {
  onClose: () => void;
  onOpenChat: () => void;
}

export default function InvestingDrawer({ onClose, onOpenChat }: InvestingDrawerProps) {
  // Simulator State
  const [initialCapital, setInitialCapital] = useState<number>(50000);
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [multiplier, setMultiplier] = useState<number>(4); // e.g., 4x target growth

  // Venture Pitch State
  const [pitchName, setPitchName] = useState('');
  const [pitchSector, setPitchSector] = useState('');
  const [sovereigntyLevel, setSovereigntyLevel] = useState<number>(8);
  const [pitchDetails, setPitchDetails] = useState('');
  
  // Review Mechanism State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingStep, setSubmittingStep] = useState('');
  const [submittedResponse, setSubmittedResponse] = useState<null | {
    aligned: boolean;
    analysis: string;
    nextStep: string;
  }>(null);

  // Growth projection calculation
  const calculatedReturn = initialCapital * multiplier;
  const annualCompoundedRate = ((Math.pow(multiplier, 1 / holdingYears) - 1) * 100).toFixed(1);

  // Review simulation
  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchName || !pitchSector) return;

    setIsSubmitting(true);
    setSubmittedResponse(null);
    
    const steps = [
      "Securing sandbox communications channels...",
      "Parsing autonomous project model...",
      "Assessing decentralized sovereignty index...",
      "Evaluating network multiplier effects...",
      "Formulating VEX governance review..."
    ];

    let currentStepIdx = 0;
    setSubmittingStep(steps[0]);

    const interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        setSubmittingStep(steps[currentStepIdx]);
      } else {
        clearInterval(interval);
        setIsSubmitting(false);

        // Generate high-fidelity customized review based on inputs
        const isSovereignOk = sovereigntyLevel >= 7;
        const lengthOk = pitchDetails.trim().length > 15;
        
        let customAnalysis = "";
        let finalAligned = false;

        if (isSovereignOk && lengthOk) {
          finalAligned = true;
          customAnalysis = `VEX Consensus Engine ranks "${pitchName}" highly in systemic autonomy (${sovereigntyLevel}/10). Your thesis on centralized model subversion aligns with our hardware-grid priorities. Combined with standard 4x returns, your proposal warrants structured partner review.`;
        } else if (!isSovereignOk) {
          customAnalysis = `Analysis complete: "${pitchName}" demonstrates viable cashflows but relies on high-friction external clouds. Our mandate restricts backing systems with a sovereignty level below 7. Raise the autonomy metric for full alignment.`;
        } else {
          customAnalysis = `The concept code is noted. However, the details provided do not specify high-resolution architectural milestones. Strengthen the underlying technical thesis to qualify for sovereign venture backing.`;
        }

        setSubmittedResponse({
          aligned: finalAligned,
          analysis: customAnalysis,
          nextStep: finalAligned 
            ? "Scheduling brief sandbox chat. Open our VEX Chat or choose 'Start a Chat' to begin partner alignment."
            : "Refine specifications and deploy next-round revision."
        });
      }
    }, 1200);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 liquid-glass border-l border-white/10 flex flex-col h-full shadow-2xl text-white font-sans"
      id="investing-drawer"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-neutral-300" />
          <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase">INVESTING APPARATUS</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          id="close-investing"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scroll Container */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
        {/* Core Stats / Active Allocations */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/5">
            <span className="block font-mono text-[10px] text-neutral-500 tracking-wider">TOTAL ASSETS ALLOCATED</span>
            <span className="font-mono text-xl font-light tracking-tight text-white mt-1 block">$184.2M</span>
          </div>
          <div className="p-4 rounded-lg bg-neutral-900/60 border border-white/5">
            <span className="block font-mono text-[10px] text-neutral-500 tracking-wider">ACTIVE VENTURE POSITIONS</span>
            <span className="font-mono text-xl font-light tracking-tight text-white mt-1 block">18 Units</span>
          </div>
        </div>

        {/* Dynamic Simulator Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">VENTURE ROI CALCULATOR</h4>
            <Sliders className="w-4 h-4 text-neutral-500" />
          </div>

          <div className="p-5 rounded-lg bg-neutral-900/80 border border-white/10 space-y-5">
            {/* Capital slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">ALLOCATED CAPITAL</span>
                <span className="text-neutral-200">${initialCapital.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="2000000"
                step="10000"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                id="capital-range"
              />
            </div>

            {/* Hold Years slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">HOLD HORIZON</span>
                <span className="text-neutral-200">{holdingYears} Years</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="1"
                value={holdingYears}
                onChange={(e) => setHoldingYears(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                id="years-range"
              />
            </div>

            {/* Targeted multiplier */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-400">ESTIMATED TARGET VECTOR</span>
                <span className="text-neutral-200">{multiplier}x Return</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                id="multiplier-range"
              />
            </div>

            {/* Simulated Return */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">PROJECTED VALUE</span>
                <span className="font-mono text-lg font-light tracking-tight text-white">${calculatedReturn.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">TARGET ANNUAL RATE</span>
                <span className="font-mono text-lg font-light text-neutral-300">+{annualCompoundedRate}% / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Venture Pitch Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">SUBMIT STARTUP FOR CO-INVESTING</h4>
            <FileText className="w-4 h-4 text-neutral-500" />
          </div>

          {!submittedResponse && !isSubmitting ? (
            <form onSubmit={handlePitchSubmit} className="space-y-4 p-5 rounded-lg bg-neutral-900/40 border border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase">VENTURE NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Helix"
                    value={pitchName}
                    onChange={(e) => setPitchName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded bg-neutral-950 border border-white/10 focus:border-white focus:outline-none transition-all placeholder-neutral-700"
                    id="pitch-name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase">SECTOR</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sovereign Compute"
                    value={pitchSector}
                    onChange={(e) => setPitchSector(e.target.value)}
                    className="w-full text-xs p-2.5 rounded bg-neutral-950 border border-white/10 focus:border-white focus:outline-none transition-all placeholder-neutral-700"
                    id="pitch-sector"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>DESIRED SOVEREIGNTY INDEX</span>
                  <span className="text-white">{sovereigntyLevel}/10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="1"
                  value={sovereigntyLevel}
                  onChange={(e) => setSovereigntyLevel(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                  id="sovereign-slider"
                />
                <p className="text-[9px] text-neutral-500">Degree of local decentralization, physical independence, or algorithmic autonomy.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-neutral-400 uppercase">TECHNICAL MANIFESTO HIGHLIGHT</label>
                <textarea
                  required
                  rows={3}
                  placeholder="In 1-2 sentences describe how this system breaks centralized architecture dependencies..."
                  value={pitchDetails}
                  onChange={(e) => setPitchDetails(e.target.value)}
                  className="w-full text-xs p-2.5 rounded bg-neutral-950 border border-white/10 focus:border-white focus:outline-none transition-all placeholder-neutral-700 resize-none"
                  id="pitch-details"
                />
              </div>

              <button
                type="submit"
                className="w-full uppercase text-[10px] font-mono p-3 bg-white text-black hover:bg-neutral-200 transition-colors rounded text-center block font-semibold cursor-pointer"
                id="submit-pitch"
              >
                DEPLOY PROTOCOL FOR REVIEW
              </button>
            </form>
          ) : isSubmitting ? (
            <div className="p-8 text-center rounded-lg bg-neutral-950 border border-white/15 h-48 flex flex-col items-center justify-center space-y-4">
              <div className="w-5 h-5 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
              <p className="font-mono text-xs text-neutral-400 animate-pulse">{submittingStep}</p>
            </div>
          ) : (
            <div className="p-5 rounded-lg bg-neutral-950 border border-white/20 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${submittedResponse?.aligned ? 'text-emerald-400' : 'text-neutral-400'}`} />
                <span className="font-mono text-xs tracking-widest uppercase">EVALUATION METRIC REPORT</span>
              </div>
              
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {submittedResponse?.analysis}
              </p>

              <div className="p-3.5 rounded bg-white/5 border border-white/10">
                <span className="block text-[9px] font-mono text-neutral-400">RECOMMENDED ACTION SPEEDWAY:</span>
                <span className="block text-xs font-light text-neutral-200 mt-1">{submittedResponse?.nextStep}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSubmittedResponse(null)}
                  className="flex-1 font-mono text-[10px] p-2.5 bg-neutral-800 text-white rounded hover:bg-neutral-750 transition-colors uppercase cursor-pointer text-center"
                >
                  RE-PITCH NEW MODEL
                </button>
                {submittedResponse?.aligned && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChat();
                    }}
                    className="flex-1 font-mono text-[10px] p-2.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-all uppercase cursor-pointer text-center"
                  >
                    INITIATE PARTNER ALIGNMENT
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
