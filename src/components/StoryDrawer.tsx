import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Eye, Award, Compass, ArrowRight } from 'lucide-react';

interface StoryDrawerProps {
  onClose: () => void;
}

export default function StoryDrawer({ onClose }: StoryDrawerProps) {
  const manifestoParagraphs = [
    {
      title: "The Genesis",
      text: "VEX was forged at the convergence of capital, code, and physical architecture. We believed that current institutions had lost the art of deep building—often settling for digital abstractions while abandoning physical realms. Our mission is to restore that balance: creating systems that matter."
    },
    {
      title: "Our Thesis",
      text: "Sovereignty is the ultimate human aspiration. We invest in technologies that decentralize networks, sovereignize resources, and simplify human interaction. Whether it's ambient physical materials, local bio-computation networks, or decentralized financial rails—we focus on full-stack reality."
    },
    {
      title: "The Architecture",
      text: "We only partner with builders who operate with extreme clarity. Every venture VEX coordinates maintains two constants: meticulous functional design and native economic sustainability from day zero. We do not fund hype; we build enduring mechanisms."
    }
  ];

  const milestones = [
    { year: "2023", event: "VEX founded with $120M in custom sovereign capital pledges." },
    { year: "2024", event: "Launched Venture Sandbox alpha. Deployed 4 deep-tech prototypes." },
    { year: "2025", event: "Expanded physical architecture integration. Advised three nation-state sandboxes." },
    { year: "2026", event: "Reconfigured advisory mechanisms for fully autonomous client integrations." }
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 liquid-glass border-l border-white/10 flex flex-col h-full shadow-2xl text-white font-sans"
      id="story-drawer"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-neutral-300" />
          <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase">OUR STORY</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          id="close-story"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scroll Container */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
        {/* Core Manifesto Banner */}
        <div className="p-6 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Compass className="w-32 h-32" />
          </div>
          <h3 className="font-sans text-xl font-light tracking-tight text-white mb-2">The VEX Manifesto</h3>
          <p className="text-sm font-light text-neutral-400 leading-relaxed italic">
            "To build without compromise. To invest with unyielding vision. To advise only when we can direct. This is the trifecta of structural integrity."
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">PHILOSOPHICAL ANCHORS</h4>
          <div className="grid gap-6">
            {manifestoParagraphs.map((p, idx) => (
              <div key={idx} className="border-l-2 border-white/20 pl-4 space-y-2">
                <h5 className="font-medium text-sm text-neutral-200">{p.title}</h5>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase">CHRONOLOGY</h4>
          <div className="relative border-l border-white/10 pl-6 space-y-6 ml-2">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative">
                {/* Circle bullet */}
                <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-white border border-black" />
                <span className="font-mono text-xs text-neutral-400">{m.year}</span>
                <p className="text-xs font-light text-neutral-300 mt-1 leading-relaxed">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Action */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-neutral-500 font-light mb-4">
            Want to learn more about our capital distributions?
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-white border-b border-white hover:border-white/50 pb-0.5 cursor-pointer transition-colors" onClick={onClose}>
            Explore our Investment Strategy <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
