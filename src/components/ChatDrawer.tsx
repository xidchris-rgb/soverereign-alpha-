import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, MessageSquare, Terminal, Eye } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatDrawerProps {
  onClose: () => void;
}

export default function ChatDrawer({ onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      sender: "partner",
      text: "Greetings. I am Marcus Drake, Venture Partner at VEX. Our team designs and allocates autonomous capital to deep code projects. What systems are you currently building or looking to secure?",
      timestamp: new Date()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetPrompts = [
    "What are your core investment criteria?",
    "Tell me about the physical VEX Sandboxes",
    "I'm looking to build high-density compute. How can VEX help?",
    "How does VEX view regulatory sovereignty?"
  ];

  // Logic to generate high-fidelity, customized offline responses
  const getSimulatedResponse = (lowerText: string): string => {
    if (lowerText.includes('criteria') || lowerText.includes('invest') || lowerText.includes('standard')) {
      return "VEX criteria centers on absolute systemic autonomy. We prioritize teams targeting self-custodial protocols, physical edge microgrids, or bio-computational storage. Your venture must show structural viability and custom economic utility from day one. High-friction external clouds or heavy reliance on centralized APIs is a failure vector for our model.";
    }
    if (lowerText.includes('sandbox') || lowerText.includes('physical') || lowerText.includes('location')) {
      return "We maintain physical-digital convergence sandboxes in Zurich, Switzerland and Singapore. These facilities provide fully isolated Faraday cages, custom satellite mesh uplinks, biological synthesis hubs, and localized private ASICs networks. Partners test edge transit units and physical nodes in zero-external connectivity environments.";
    }
    if (lowerText.includes('compute') || lowerText.includes('gpu') || lowerText.includes('hardware') || lowerText.includes('grid')) {
      return "For deep physical-layer processing, we coordinate directly through our active venture 'AETHER Grid'. We deliver hardware ASICs, custom cluster cabinets, and isolated power pipelines to developers. Tell us about your node bandwidth, micro-cooling designs, or edge latency profiles inside our booking scheduler.";
    }
    if (lowerText.includes('regulatory') || lowerText.includes('sovereign') || lowerText.includes('sovereignty') || lowerText.includes('policy')) {
      return "Regulatory compliance is an active engineering variable, not a legal afterthought. VEX develops custom corporate shielding structures, utilizing smart legal-cryptographic wraps and local edge sandboxes. We operate across multi-sovereign networks, ensuring your software nodes remain resilient to judicial or administrative overreach.";
    }
    if (lowerText.includes('pitch') || lowerText.includes('submit') || lowerText.includes('helix') || lowerText.includes('proposal')) {
      return "Your protocol outline looks promising. Please make sure to finalize your core technical manifesto details and run your ROI parameters in our 'Investing Apparatus' panel. Once registered on our consensus ledger, we will schedule a PGP-encrypted audio alignment briefing.";
    }
    // Generic high-intellect fallback
    return "This coordinate fits our broader thesis. True physical-digital security requires deep architectural integration across every layer: edge power, cryptographic security layers, and local hardware execution. We should schedule a sovereign regulatory briefing. You can book a secure slot via our 'Advisory' dashboard to finalize our partnership details.";
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const responseText = getSimulatedResponse(textToSend.toLowerCase());
      const partnerMsg: ChatMessage = {
        id: `m-partner-${Date.now()}`,
        sender: "partner",
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, partnerMsg]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 liquid-glass border-l border-white/10 flex flex-col h-full shadow-2xl text-white font-sans"
      id="chat-drawer"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-neutral-300" />
          <div className="text-left">
            <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase block leading-none">MARCUS DRAKE</span>
            <span className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase block mt-1">VENTURE PARTNER COLLABORATION</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          id="close-chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
        <div className="space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto items-end' : 'items-start'
              }`}
            >
              {/* Sender Tag */}
              <span className="font-mono text-[9px] text-neutral-500 uppercase mb-1">
                {m.sender === 'user' ? 'YOU' : 'MARCUS DRAKE'} &bull; {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>

              {/* Message box */}
              <div
                className={`p-4 rounded-lg text-xs leading-relaxed font-light ${
                  m.sender === 'user'
                    ? 'bg-white text-black font-normal rounded-tr-none'
                    : 'bg-neutral-950 border border-white/10 text-neutral-300 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing State */}
          {isTyping && (
            <div className="flex flex-col items-start max-w-[85%]">
              <span className="font-mono text-[9px] text-neutral-500 uppercase mb-1">
                MARCUS DRAKE IS COMPILING...
              </span>
              <div className="p-4 rounded-lg bg-neutral-950 border border-white/10 text-neutral-400 text-xs flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input / Presets Area */}
      <div className="p-6 border-t border-white/10 shrink-0 bg-neutral-950/40 space-y-4">
        {/* Presets Grid */}
        <div className="space-y-1.5">
          <span className="block text-[9px] font-mono text-neutral-500 uppercase">SUGGESTED DISCOVERY POINTS</span>
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                className="text-[10px] font-mono text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-full border border-white/5 hover:border-white/15 bg-neutral-950/80 hover:bg-neutral-900 transition-all text-left cursor-pointer"
                id={`preset-prompt-${idx}`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Free-text input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Introduce your protocol or thesis..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputText);
            }}
            disabled={isTyping}
            className="flex-1 text-xs p-3 rounded bg-neutral-950 border border-white/10 focus:border-white focus:outline-none transition-all placeholder-neutral-700 font-sans"
            id="chat-input-text"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            className={`p-3 rounded font-mono text-xs uppercase flex items-center justify-center transition-colors px-4 cursor-pointer ${
              !inputText.trim() || isTyping
                ? 'bg-neutral-900 text-neutral-600 pointer-events-none'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
            id="chat-send-btn"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
