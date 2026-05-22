import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, MapPin, Calendar, Users, Star, ArrowUpRight, 
  Wifi, Phone, Sun, Snowflake, Play, Square, Volume2, VolumeX,
  Plus, Check, ChevronRight, Send, Shield, Info, ArrowRight, Sparkles, RefreshCw
} from 'lucide-react';

const bgImage = "https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNmExMDFiY2MyYTY4ODE5MWE1MTk4ZDQ1ZjgyYzg3NmM6c2VkaW1lbnQ6Ly80YTM2MGI5ZDgxYzAxZjEjZmlsZV8wMDAwMDAwMGFlODA3MjA3ODU2ZGY5OTY0ZjllNjZlMyN1bmZ1cmwiLCJ0cyI6IjIwNTk1IiwicCI6InB5aSIsImNpZCI6IjEiLCJzaWciOiIwM2Y0MjUxZTEwNWExNDU4Y2UyYjBhYjhmMjQ4Y2NiZWUzNmQ1NDc3ZDA1MjQzYmNhOWEzZGE3ZTcxODA1ODk5IiwidiI6IjAiLCJnaXptb19pZCI6bnVsbCwiY3MiOm51bGwsImNkbiI6bnVsbCwiZm4iOm51bGwsImNkIjpudWxsLCJjcCI6bnVsbCwibWEiOm51bGx9";

interface Destination {
  id: string;
  name: string;
  elevation: string;
  price: number;
  tags: string[];
  description: string;
  mainImage: string;
  vacancies: number;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'brienz',
    name: 'Brienz Turquoise Sanctuary',
    elevation: '1,860m',
    price: 1850,
    tags: ['Lakeside', 'Private Dock', 'Panoramic Glass'],
    description: 'An architectural glass villa suspended over the pristine cyan waters of Lake Brienz, bordered by majestic mossy fir woods and dramatic waterfalls.',
    mainImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    vacancies: 2
  },
  {
    id: 'zermatt',
    name: 'Zermatt Obsidian Spires',
    elevation: '2,920m',
    price: 2400,
    tags: ['Glacier Front', 'Helipad', 'Cryo Chamber'],
    description: 'Crafted from raw blackened pinewood and obsidian steel, facing the sheer vertical precipice of the mystical Matterhorn summit.',
    mainImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    vacancies: 1
  },
  {
    id: 'cortina',
    name: 'Cortina Fireplace Hearth',
    elevation: '1,540m',
    price: 1550,
    tags: ['Equestrian', 'Michelin Cellar', 'Hot Springs'],
    description: 'A cozy timber fortress nestled in a quiet, mist-covered pine valley of the Dolomites, complete with underground thermal volcanic baths.',
    mainImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    vacancies: 3
  },
  {
    id: 'chamonix',
    name: 'Chamonix High Altitude Spires',
    elevation: '3,100m',
    price: 3100,
    tags: ['Peak Exposure', 'Star Dome', 'Glacier Ridge'],
    description: 'Suspended directly on a razor-thin granite shelf at the absolute limit of the sky, featuring a retracting glass star-dome ceiling.',
    mainImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    vacancies: 1
  }
];

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences' | 'services' | 'reserve' | 'phone'>('destinations');
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  
  // Interactive Sound Synth state & analyzer
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; filter: BiquadFilterNode; gain: GainNode } | null>(null);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([15, 12, 22, 16, 28, 14, 19, 25, 10, 18]);

  // Booking details configuration
  const [bookingDest, setBookingDest] = useState<string>('brienz');
  const [checkInDate, setCheckInDate] = useState<string>('2026-06-12');
  const [nightsCount, setNightsCount] = useState<number>(4);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['spa']);
  
  // Modal active
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Service Sliders level (0-100)
  const [butlerLevel, setButlerLevel] = useState<number>(65);
  const [lessonCount, setLessonCount] = useState<number>(3);
  const [wineQuality, setWineQuality] = useState<string>('Grand Cru Reserve');

  // Phone emulator states
  const [phoneScreen, setPhoneScreen] = useState<'key' | 'weather' | 'concierge'>('key');
  const [phoneChatText, setPhoneChatText] = useState('');
  const [phoneChat, setPhoneChat] = useState<Array<{ sender: 'user' | 'assistant', text: string }>>([
    { sender: 'assistant', text: "Welcome back, Sovereign Traveler. I am Sven, your dedicated alpine advisor. How may I coordinate your high-altitude itinerary today?" }
  ]);
  const [snowDepth, setSnowDepth] = useState<number>(142); // in cm
  const [isKeyUnlocked, setIsKeyUnlocked] = useState(false);

  // Background Pull-down Physics simulation state
  const [isPulldownActive, setIsPulldownActive] = useState(false);

  // Soundscape synthesiser generator
  const toggleSoundscape = () => {
    if (isPlayingSound) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingSound(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Oscillators simulating mountain wind and glacier drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Soft white-ish wind noise filter envelope
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(85, ctx.currentTime); // Low drone
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(142, ctx.currentTime); // Resonance chimes

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(5, ctx.currentTime);

        // Modulate filter for realistic wind gusts
        const windLFO = ctx.createOscillator();
        const windLFOGain = ctx.createGain();
        windLFO.type = 'sine';
        windLFO.frequency.setValueAtTime(0.18, ctx.currentTime); // Ultra slow swoop
        windLFOGain.gain.setValueAtTime(220, ctx.currentTime);

        windLFO.connect(windLFOGain);
        windLFOGain.connect(filter.frequency);
        windLFO.start();

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        // Safe soft volumes
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc1.start();
        osc2.start();

        synthNodesRef.current = { osc1, osc2, filter, gain };
        setIsPlayingSound(true);
      } catch (e) {
        console.error("Audio generation failed: ", e);
      }
    }
  };

  // Keep the audio visualizer swinging
  useEffect(() => {
    let animationId: number;
    const updateStats = () => {
      if (isPlayingSound) {
        setVisualizerBars(prev => prev.map(bar => {
          const change = Math.floor(Math.random() * 9) - 4;
          return Math.max(4, Math.min(32, bar + change));
        }));
      }
      animationId = requestAnimationFrame(updateStats);
    };
    animationId = requestAnimationFrame(updateStats);
    return () => cancelAnimationFrame(animationId);
  }, [isPlayingSound]);

  // Clean-up sounds, standard behavior
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const triggerReservation = () => {
    const randomHex = Math.random().toString(16).substring(3, 8).toUpperCase();
    const prefix = DESTINATIONS.find(d => d.id === bookingDest)?.id.slice(0, 3).toUpperCase() || 'ALP';
    setConfirmationCode(`SV-${prefix}-${randomHex}`);
    setIsReceiptOpen(true);
  };

  // Bot response algorithm
  const handlePhoneSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phoneChatText.trim()) return;

    const userMsg = phoneChatText;
    const updated = [...phoneChat, { sender: 'user' as const, text: userMsg }];
    setPhoneChat(updated);
    setPhoneChatText('');

    setTimeout(() => {
      let botAnswer = "Our direct satellite link is stable. Glacier Heli-transfers can still be booked in real-time. I've adjusted your heating controls.";
      const query = userMsg.toLowerCase();

      if (query.includes('weather') || query.includes('snow') || query.includes('depth')) {
        botAnswer = `The pass current depth is exactly ${snowDepth}cm with fresh powder tracks under stellar skies. Visual visibility stands at clear 12km. Perfect weather for the High Alps Spires path.`;
      } else if (query.includes('heli') || query.includes('flight') || query.includes('helicopter')) {
        botAnswer = `Helicopter shuttle flight H-704 is marked for takeoff on scheduled intervals from the Valley Base directly to our high-altitude landing pad. The transit time is 11 minutes total.`;
      } else if (query.includes('view') || query.includes('sunset') || query.includes('secret')) {
        botAnswer = `There is a secret panoramic rock seat located 150m west of our glass dining platform. Walk the warm path with safety boots. The golden hour hits there beautifully around 20:42.`;
      } else if (query.includes('spa') || query.includes('pool') || query.includes('massage')) {
        botAnswer = `Your private Cryo-Thermal hot spa has been pre-heated to exactly 39.5°C today. A fresh Alpine Eucalyptus infusion has been prepared for your relaxation.`;
      } else if (query.includes('wine') || query.includes('drink') || query.includes('dine')) {
        botAnswer = `Your cabin selection has been stocked with our signature luxury collection. A masterfully aged ${wineQuality} is corked and resting in cold conditions for you at correct cellar standards.`;
      }
      setPhoneChat(prev => [...prev, { sender: 'assistant' as const, text: botAnswer }]);
    }, 600);
  };

  const selectedDestObj = DESTINATIONS.find(d => d.id === bookingDest) || DESTINATIONS[0];

  return (
    <div className="relative min-h-screen text-neutral-100 overflow-x-hidden font-sans select-none bg-black">
      {/* ── Immersive Pristine Alpine Lake Backdrop ── */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black select-none pointer-events-none">
        {/* Recreating user-specified physical blur overlay */}
        <div className="blur-overlay blur-overlay-top" />
        <div className="blur-overlay blur-overlay-bottom" />
        
        {/* Invisible SVG displacement element running fully hardware-accelerated water shimmer rendering */}
        <svg className="absolute w-0 h-0 pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="water-flow-filter" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.005 0.02" numOctaves="3" result="noise">
                {/* Smooth horizontal and vertical shifting for a natural wind ripple flow cycle */}
                <animate 
                  attributeName="baseFrequency" 
                  values="0.005 0.02; 0.007 0.035; 0.005 0.02" 
                  dur="18s" 
                  repeatCount="indefinite" 
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Animated background element with Flow Fluidics (Cinemagraph effect) */}
        <div 
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all bg-front water-flow ${isPulldownActive ? 'pull-down' : ''}`}
          style={{ backgroundImage: `url(${selectedDest.id === 'brienz' ? bgImage : selectedDest.mainImage})` }}
          id="bg-image-element"
        />
        {/* Soft, rich gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* ── Outer Workspace Container ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-20">
        
        {/* ========================= */}
        {/* NAVBAR */}
        {/* ========================= */}
        <header className="navbar w-full flex flex-col md:flex-row justify-between items-center py-6 gap-4 z-40 border-b border-white/5 backdrop-blur-md mb-8">
          <div className="logo flex items-center gap-3">
            <Compass className="w-6 h-6 text-cyan-400 animate-pulse" />
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-wider text-white">SOVEREIGN</h2>
              <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400 select-none block leading-none">ALPES RETREATS</span>
            </div>
          </div>

          <ul className="nav-links flex items-center gap-6 md:gap-10 list-none">
            <li>
              <a 
                href="#destinations" 
                onClick={() => setActiveTab('destinations')}
                className={`text-[11px] font-mono uppercase tracking-widest transition-all duration-300 relative py-1 ${activeTab === 'destinations' ? 'text-white border-b-2 border-cyan-400' : 'text-neutral-400 hover:text-white'}`}
              >
                Destinations
              </a>
            </li>
            <li>
              <a 
                href="#experiences" 
                onClick={() => setActiveTab('experiences')}
                className={`text-[11px] font-mono uppercase tracking-widest transition-all duration-300 relative py-1 ${activeTab === 'experiences' ? 'text-white border-b-2 border-cyan-400' : 'text-neutral-400 hover:text-white'}`}
              >
                Experiences
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                onClick={() => setActiveTab('services')}
                className={`text-[11px] font-mono uppercase tracking-widest transition-all duration-300 relative py-1 ${activeTab === 'services' ? 'text-white border-b-2 border-cyan-400' : 'text-neutral-400 hover:text-white'}`}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#companion" 
                onClick={() => setActiveTab('phone')}
                className={`text-[11px] font-mono uppercase tracking-widest space-x-1.5 transition-all duration-300 relative py-1 flex items-center ${activeTab === 'phone' ? 'text-white border-b-2 border-cyan-400' : 'text-cyan-400/90 hover:text-white'}`}
              >
                <Wifi className="w-3.5 h-3.5 animate-pulse" />
                <span>Companion Key</span>
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {/* Background Pull-down Physics Trigger */}
            <button 
              onClick={() => setIsPulldownActive(!isPulldownActive)}
              className="flex items-center gap-2 py-2 px-3.5 rounded-full border transition-all text-[10px] font-mono tracking-wider cursor-pointer shadow-lg"
              style={{
                backgroundColor: isPulldownActive ? 'var(--active-toggle)' : 'rgba(0, 0, 0, 0.5)',
                color: isPulldownActive ? '#000000' : '#a3a3a3',
                borderColor: isPulldownActive ? 'var(--active-toggle)' : 'rgba(255, 255, 255, 0.1)'
              }}
              title="Dynamic CSS Physics Simulator"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPulldownActive ? 'animate-spin' : ''}`} />
              <span>{isPulldownActive ? "PULL ACTIVE" : "PHYSICS LAUNCH"}</span>
            </button>

            {/* Ambient Sound Equalizer Toggler */}
            <button 
              onClick={toggleSoundscape}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-full border border-white/10 ${isPlayingSound ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30' : 'bg-black/50 text-neutral-400 border-white/5'} transition-all text-[10px] font-mono tracking-wider cursor-pointer`}
              title="Interactive Peak Atmosphere"
            >
              {isPlayingSound ? <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isPlayingSound ? "ATMOSPHERE LIVE" : "PLAY SOUNDSCAPE"}</span>
              
              {/* Little visualizer wave graph */}
              {isPlayingSound && (
                <div className="flex items-end gap-0.5 h-3 ml-1.5 overflow-hidden">
                  {visualizerBars.slice(0, 5).map((h, i) => (
                    <span 
                      key={i} 
                      className="w-[1.5px] bg-cyan-400 transition-all duration-150 rounded-full" 
                      style={{ height: `${h}px` }} 
                    />
                  ))}
                </div>
              )}
            </button>

            <button 
              onClick={() => {
                setActiveTab('reserve');
                const element = document.getElementById('reserve-console');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="plan-btn text-[11px] font-mono font-medium tracking-widest bg-cyan-400 text-black px-5 py-2.5 hover:bg-cyan-300 active:scale-95 transition-all duration-200 uppercase rounded cursor-pointer ring-4 ring-cyan-400/10"
              id="reserve-cta"
            >
              Secure Retreat
            </button>
          </div>
        </header>

        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}
        <section className="hero relative mt-4 mb-16 flex flex-col items-start justify-center min-h-[50vh] pt-4 md:pt-12 px-2 md:px-0 z-20">
          <div className="overlay absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent -z-10 pointer-events-none" />
          
          <div className="hero-content max-w-2xl leading-normal space-y-6">
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Sovereign Sanctuary Peak Series
            </span>
            
            <h1 className="font-serif text-6xl md:text-8xl tracking-tight leading-none font-bold text-white uppercase select-text">
              SHAPING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-400">TOMORROW</span>
            </h1>
            
            <h2 className="font-cursive text-3xl md:text-5xl text-cyan-300 drop-shadow-[0_0_12px_rgba(39,208,255,0.4)] animate-pulse tracking-wide select-text">
              Crystalline Sanctuary
            </h2>
            
            <p className="mt-4 text-neutral-300/90 text-sm md:text-base leading-relaxed tracking-wide select-text font-sans">
              Welcome back. Experience unmatched architectural serenity high above the noise of civilization. Every Sovereign lodge bridges pristine glacier views, automated thermostatic living, private helipads, and absolute mountain peace.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-mono text-neutral-400 tracking-widest">WILDERNESS LATITUDE: 46.551°N</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4.5 h-4.5 text-cyan-300 animate-spin-slow" />
                <span className="text-[11px] font-mono text-neutral-400 tracking-widest">SUMMIT ATMOSPHERE: CRYOGENIC CLEAR</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= */}
        {/* BOOKING BAR */}
        {/* ========================= */}
        <section id="reserve-console" className="relative z-30 mb-20 scroll-mt-24">
          <div className="booking-bar liquid-glass rounded-2xl md:rounded-full border border-white/10 p-2 grid grid-cols-1 md:grid-cols-4 items-center gap-2 shadow-2xl">
            
            {/* Dest selector */}
            <div className="booking-item px-6 py-4 flex flex-col gap-1 hover:bg-white/5 transition-all rounded-xl md:rounded-l-full cursor-pointer relative group">
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> DESTINATION
              </span>
              <select 
                value={bookingDest} 
                onChange={(e) => {
                  setBookingDest(e.target.value);
                  const selected = DESTINATIONS.find(d => d.id === e.target.value);
                  if (selected) setSelectedDest(selected);
                }}
                className="bg-transparent text-white font-serif text-base border-none outline-none cursor-pointer w-full"
              >
                {DESTINATIONS.map(d => (
                  <option key={d.id} value={d.id} className="bg-neutral-900 text-white">
                    {d.name.split(' ')[0]} Peak ({d.elevation})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-neutral-400 tracking-wider">Configure high-pass sanctuary</p>
            </div>

            {/* Date entry */}
            <div className="booking-item px-6 py-4 flex flex-col gap-1 hover:bg-white/5 transition-all cursor-pointer">
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> RETREAT ARRIVAL
              </span>
              <input 
                type="date" 
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent text-white text-sm font-mono border-none outline-none w-full" 
              />
              <p className="text-[11px] text-neutral-400 tracking-wider">Helicopter shuttle synchronization</p>
            </div>

            {/* Nights Duration & Guests count */}
            <div className="booking-item px-6 py-4 flex flex-col gap-1 hover:bg-white/5 transition-all cursor-pointer grid grid-cols-2">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 block mb-0.5">DURATION</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    max="30"
                    value={nightsCount} 
                    onChange={(e) => setNightsCount(parseInt(e.target.value) || 1)}
                    className="bg-transparent text-white text-base font-semibold border-none outline-none w-10" 
                  />
                  <span className="text-xs text-neutral-400">Nights</span>
                </div>
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 block mb-0.5">RETREATERS</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    max="6"
                    value={guestCount} 
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    className="bg-transparent text-white text-base font-semibold border-none outline-none w-10" 
                  />
                  <span className="text-xs text-neutral-400">Guests</span>
                </div>
              </div>
            </div>

            {/* Action Search/Reserve button */}
            <div className="p-2 h-full flex items-center justify-center">
              <button 
                onClick={triggerReservation}
                className="search-btn w-full md:w-auto h-full flex items-center justify-between gap-4 bg-cyan-400 hover:bg-cyan-300 hover:scale-[1.02] active:scale-95 text-black font-semibold tracking-widest text-xs px-8 py-4 uppercase rounded-full transition-all cursor-pointer shadow-lg"
              >
                <span>RESERVE SUITE</span>
                <ArrowRight className="w-4 h-4 ml-2 animate-bounce-horizontal" />
              </button>
            </div>
          </div>

          {/* ========================= */}
          {/* FEATURES FLIGHT GRID */}
          {/* ========================= */}
          <div className="features grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
            <div className="feature liquid-glass rounded-xl p-5 border border-white/5 bg-black/60 backdrop-blur">
              <h3 className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> 01. EXTREME AUTONOMY
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                Each panoramic dome features dual oxygen injection capsules, cryogenic insulation, and local geothermic thermal circulation.
              </p>
            </div>
            <div className="feature liquid-glass rounded-xl p-5 border border-white/5 bg-black/60 backdrop-blur">
              <h3 className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> 02. FLIGHT ACCESS
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                Zero roads exist to reach the Matterhorn peaks or Lake Brienz glass dock. Complete high-alpine private helipads stand synced.
              </p>
            </div>
            <div className="feature liquid-glass rounded-xl p-5 border border-white/5 bg-black/60 backdrop-blur">
              <h3 className="text-[11px] font-mono tracking-[0.25em] text-cyan-400 flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> 03. BIO-SPHERES
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-sans">
                Michelin ingredients are cultivated inside high-latitude hydroponic bio-spheres. Direct farm-to-glacier organic luxury dining.
              </p>
            </div>
          </div>
        </section>

        {/* ========================= */}
        {/* DESTINATIONS SECTION */}
        {/* ========================= */}
        <section id="destinations" className="destinations scroll-mt-24 mb-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Dest Left Side info */}
            <div className="destinations-left lg:col-span-4 flex flex-col justify-between py-6 min-h-[400px]">
              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-semibold">
                  Sovereign Terroir
                </span>
                
                <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
                  GLACIAL <br />SERENITY
                </h2>
                
                <div className="h-0.5 w-20 bg-cyan-400 my-4" />
                
                {/* Visual statistics map node */}
                <div className="bg-black/55 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3 shadow-md">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">CURRENT FOCUS:</span>
                    <span className="text-cyan-400 font-semibold">{selectedDest.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">PEAK ELEVATION:</span>
                    <span className="text-white font-semibold">{selectedDest.elevation}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">AVAILABILITY RATING:</span>
                    <span className="text-emerald-400 font-semibold">{selectedDest.vacancies} Chalets Vacant</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-cyan-400 h-full transition-all duration-700" 
                      style={{ width: `${selectedDest.id === 'brienz' ? 85 : selectedDest.id === 'zermatt' ? 95 : selectedDest.id === 'cortina' ? 62 : 98}%` }} 
                    />
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  {selectedDest.description}
                </p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    setBookingDest(selectedDest.id);
                    const element = document.getElementById('reserve-console');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full group py-4 px-6 rounded-xl border border-white/15 bg-black hover:bg-neutral-950 transition-all text-xs font-mono tracking-widest text-neutral-100 flex items-center justify-between cursor-pointer"
                >
                  <span className="group-hover:text-cyan-300 transition-colors">CHOOSE THIS SANCTUARY</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Destination cards grid */}
            <div className="destination-cards lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {DESTINATIONS.map((dest) => {
                const isSelected = selectedDest.id === dest.id;
                return (
                  <div 
                    key={dest.id}
                    onClick={() => setSelectedDest(dest)}
                    className={`card relative rounded-3xl overflow-hidden h-[450px] cursor-pointer group transition-all duration-500 border ${isSelected ? 'border-cyan-400 shadow-[0_0_30px_rgba(39,208,255,0.25)] scale-[1.02]' : 'border-white/5 hover:border-white/20'}`}
                  >
                    {/* Destination Image backdrop with hover scale */}
                    <img 
                      src={dest.mainImage} 
                      alt={dest.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for card text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent transition-opacity duration-300" />
                    
                    {/* Status/Elevation Tag */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#27d0ff] bg-black/75 px-3 py-1 rounded-full border border-cyan-400/20">
                        {dest.elevation}
                      </span>
                    </div>

                    <div className="card-content absolute bottom-6 left-6 right-6 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {dest.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-mono uppercase bg-white/10 px-2.5 py-0.5 rounded-full text-neutral-300 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {dest.name}
                      </h3>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-[11px] font-mono tracking-wider text-neutral-400">NIGHTLY FRACTION</span>
                        <span className="text-medium text-white font-mono font-semibold">
                          ${dest.price} <span className="text-[10px] font-light text-neutral-400">/ USD</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================= */}
        {/* PREMIUM SERVICES WITH SLIDERS */}
        {/* ========================= */}
        <section id="experiences" className="services scroll-mt-24 mb-24 relative bg-black/65 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Services descriptions */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-semibold">
                Bespoke Calibration
              </span>
              <h2 className="font-serif text-5xl font-bold tracking-tight text-white uppercase leading-none">
                EXPERIENCE <br />CONTROL
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Adjust the Sovereign digital parameters using the sliders below. Your customized variables dynamically update your retreat profile, ensuring your arrival capsule is provisioned exactly as calibrated.
              </p>

              {/* Instant calculation summary box */}
              <div className="border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-neutral-900 to-black space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#27d0ff] block">
                  CALCULATED APEX CHARGE (ESTIMATED)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-mono font-bold text-white">
                    ${(selectedDestObj.price * nightsCount + (butlerLevel * 10) + (lessonCount * 180)).toLocaleString()}
                  </span>
                  <span className="text-neutral-400 text-xs font-mono">USD Total</span>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 space-y-1 pt-2 border-t border-white/1.2">
                  <p>• {selectedDestObj.name.split(' ')[0]} Retreat at ${selectedDestObj.price}/night ({nightsCount} nights)</p>
                  <p>• Elite Butler calibration level: {butlerLevel}%</p>
                  <p>• Private backcountry heli-guides: {lessonCount} scheduled passes</p>
                </div>
              </div>
            </div>

            {/* Custom Interactive Sliders */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
              
              {/* Slider 1: Dedicated Concierge Assist */}
              <div className="service space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                    Butler Call Dedication Ratio
                  </h3>
                  <span className="font-mono font-semibold text-white bg-white/10 px-2 py-0.5 rounded text-xs select-none">
                    {butlerLevel === 100 ? "Exclusive (1:1)" : `${butlerLevel}% Dedicated`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={butlerLevel}
                  onChange={(e) => setButlerLevel(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  From shared satellite alert nodes to a dedicated, high-altitude butler standing on passive watch outside your dome entrance 24 hours a day.
                </p>
              </div>

              {/* Slider 2: Heli ski runs */}
              <div className="service space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                    Ascent Heli Guide Passes
                  </h3>
                  <span className="font-mono font-semibold text-white bg-white/10 px-2 py-0.5 rounded text-xs select-none">
                    {lessonCount === 0 ? "Self Guided Paths" : `${lessonCount} Dedicated Flights`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="8" 
                  value={lessonCount}
                  onChange={(e) => setLessonCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Add direct glacier-climbing guide services. High-grade climbing cables, rescue radios, and custom ski line planning in raw deep snow included.
                </p>
              </div>

              {/* Select Selector 3: Vineyard cellars reserve */}
              <div className="service space-y-2">
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                  Wine Cellar Integration
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { style: 'Exclusive Artisan Blend', price: 'Classic' },
                    { style: 'Grand Cru Reserve', price: 'Premium' },
                    { style: 'Royal Vintage Reserve', price: 'Ultra Caviar' }
                  ].map((cellar, idx) => (
                    <button
                      key={idx}
                      onClick={() => setWineQuality(cellar.style)}
                      className={`text-center py-4 px-3 rounded-xl border text-[11px] font-mono transition-all cursor-pointer ${wineQuality === cellar.style ? 'border-cyan-400 bg-cyan-950/20 text-white' : 'border-white/5 hover:border-white/15 bg-neutral-900/60 text-neutral-400'}`}
                    >
                      <p className="font-bold uppercase tracking-wider">{cellar.price}</p>
                      <p className="text-[9px] text-neutral-500 mt-1">{cellar.style}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Curate your built-in geothermic glass wine vault. Hand-stocked vintage cellar pairing with dynamic thermal control based on altitude moisture levels.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ========================= */}
        {/* MOBILE SHOWCASE & COMPANION PHONE EMULATOR */}
        {/* ========================= */}
        <section id="companion" className="mobile-showcase scroll-mt-24 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanative copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="inline-block relative">
                  <span className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-60" />
                  <span className="relative w-2.5 h-2.5 bg-cyan-400 rounded-full block" />
                </span>
                <span className="text-[11px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-semibold">
                  Companion Protocol
                </span>
              </div>
              
              <h2 className="font-serif text-5xl font-bold tracking-tight text-white uppercase leading-none">
                ALPINE <br />CONSOLE
              </h2>
              
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Every reservation includes our direct companion terminal application on a personalized device. 
                Interact with the living smartphone mockup on the right to simulate your digital room keycard, weather telemetry, and satellite conversation thread with your private AI concierge Sven.
              </p>

              {/* Direct feature items */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-400/20 text-cyan-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs text-white uppercase tracking-wider">Satellite Cryptography</h5>
                    <p className="text-xs text-neutral-400 mt-1">Encrypted signals guarantee emergency communications on the highest peaks even on standard network failure.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-400/20 text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs text-white uppercase tracking-wider">Alchemist Thermal Integration</h5>
                    <p className="text-xs text-neutral-400 mt-1">One-click thermal pool temperature tuning directly matching ambient biometric moisture metrics.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live iPhone 16 Pro mockup */}
            <div className="lg:col-span-7 flex justify-center py-6">
              <div className="relative w-[340px] h-[670px] bg-neutral-900 rounded-[55px] p-3.5 shadow-2xl border-4 border-neutral-800 ring-12 ring-neutral-950 select-none">
                
                {/* Dynamic Island Pin */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_cyan]" />
                  <span className="text-[8px] font-mono text-neutral-500 tracking-[0.2em]">SV-CH-704</span>
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full bg-neutral-950 rounded-[42px] overflow-hidden relative flex flex-col justify-between pt-10 pb-6 text-white border border-neutral-800">
                  
                  {/* Phone Header */}
                  <div className="px-5 flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-2">
                    <span>9:04 AM</span>
                    <div className="flex items-center gap-1.5 text-cyan-400">
                      <Wifi className="w-3 h-3" />
                      <span>SAT-LINK LIVE</span>
                    </div>
                  </div>

                  {/* Action Navigation Tabs within the Phone UI */}
                  <div className="grid grid-cols-3 border-b border-white/5 bg-white/5 p-1 rounded-xl mx-4 gap-1">
                    <button 
                      onClick={() => setPhoneScreen('key')}
                      className={`py-2 text-[9px] font-mono rounded-lg transition-all cursor-pointer ${phoneScreen === 'key' ? 'bg-cyan-400 text-black font-semibold' : 'text-neutral-400 hover:text-white'}`}
                    >
                      KEYCARD
                    </button>
                    <button 
                      onClick={() => setPhoneScreen('weather')}
                      className={`py-2 text-[9px] font-mono rounded-lg transition-all cursor-pointer ${phoneScreen === 'weather' ? 'bg-cyan-400 text-black font-semibold' : 'text-neutral-400 hover:text-white'}`}
                    >
                      WEATHER
                    </button>
                    <button 
                      onClick={() => {
                        setPhoneScreen('concierge');
                        // Quick hint alert
                      }}
                      className={`py-2 text-[9px] font-mono rounded-lg transition-all cursor-pointer ${phoneScreen === 'concierge' ? 'bg-cyan-400 text-black font-semibold' : 'text-neutral-400 hover:text-white'}`}
                    >
                      CONCIERGE
                    </button>
                  </div>

                  {/* Active Phone Screen content */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
                    <AnimatePresence mode="wait">
                      
                      {/* Screen 1: Digital RFID Room Keycard */}
                      {phoneScreen === 'key' && (
                        <motion.div 
                          key="keycard"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <div className="text-center space-y-1">
                            <span className="text-[9px] font-mono text-cyan-400 tracking-widest block uppercase">Lake Brienz Cabin</span>
                            <h4 className="font-serif text-xl font-bold">RESERVED SUITE 704</h4>
                            <span className="text-[10px] font-mono text-neutral-500">SECURE SHUTTLE IDENTIFIED</span>
                          </div>

                          {/* Interactive RFID Device */}
                          <div className="relative h-44 rounded-2xl bg-gradient-to-br from-cyan-900/40 via-neutral-900 to-black border border-cyan-500/20 p-5 flex flex-col justify-between overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
                            
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[8px] font-mono text-neutral-400 block tracking-widest">SOVEREIGN PROTOCOL</span>
                                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider">MEMBER PASS v2.4</span>
                              </div>
                              <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                            </div>

                            {/* Digital Key state block */}
                            <div className="text-center pt-2">
                              <button 
                                onClick={() => setIsKeyUnlocked(!isKeyUnlocked)}
                                className={`py-2.5 px-6 rounded-full font-mono text-[10px] tracking-widest transition-all cursor-pointer ${isKeyUnlocked ? 'bg-emerald-400 text-black font-medium shadow-[0_0_15px_rgba(52,211,153,0.4)]' : 'bg-cyan-400 text-black font-medium hover:bg-cyan-300 shadow-[0_0_15px_rgba(39,208,255,0.45)]'}`}
                              >
                                {isKeyUnlocked ? "🔓 KEY ACTIVE" : "🔒 TAP TO KEY UNLOCK"}
                              </button>
                            </div>

                            <div className="flex justify-between items-end text-[9px] font-mono text-neutral-400 leading-none">
                              <div>
                                <p className="text-neutral-500">GPS LATITUDE</p>
                                <p className="font-semibold text-neutral-300">46.551°N, 8.012°E</p>
                              </div>
                              <div className="text-right">
                                <p className="text-neutral-500">EXPIRES END</p>
                                <p className="font-semibold text-neutral-300">06/20/2026</p>
                              </div>
                            </div>
                          </div>

                          {/* RFID Instructions */}
                          <div className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-1.5 text-[11px] leading-relaxed">
                            <p className="text-cyan-400 font-mono tracking-wide text-[10px] flex items-center gap-1.5">
                              <Info className="w-3 h-3" /> NFC PASS IDENTIFICATION
                            </p>
                            <p className="text-neutral-400 font-sans">
                              Unlock cabin thermal doors, fireplace logs igniter, and pre-heat cedar-wood hot tub options by tapping your phone device near the door plates.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Screen 2: Real-time Weather Telemetry */}
                      {phoneScreen === 'weather' && (
                        <motion.div 
                          key="weather"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          <div className="bg-cyan-950/40 border border-cyan-500/20 p-4 rounded-xl text-center relative overflow-hidden">
                            <span className="text-[9px] font-mono tracking-widest text-cyan-400 block">Zermatt Peak Radar</span>
                            <div className="flex items-center justify-center gap-2 mt-2">
                              <Snowflake className="w-7 h-7 text-cyan-300 animate-spin-slow" />
                              <span className="text-3xl font-mono font-bold text-white">-4.2°C</span>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400 block mt-1.5">WINDS 12 KM/H FROM NORTH</span>
                          </div>

                          {/* Snow depth interactive adjuster */}
                          <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-neutral-400">SNOW DEPTH METRIC</span>
                              <span className="text-cyan-400 font-bold">{snowDepth} CM</span>
                            </div>
                            <input 
                              type="range" 
                              min="50" 
                              max="300"
                              value={snowDepth}
                              onChange={(e) => setSnowDepth(parseInt(e.target.value))}
                              className="w-full accent-cyan-400 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer" 
                            />
                            <div className="flex justify-between text-[9px] font-mono text-neutral-500">
                              <span>50cm (Spring)</span>
                              <span>300cm (Heavy Pass)</span>
                            </div>
                          </div>

                          <div className="bg-[#27d0ff]/5 border border-[#27d0ff]/20 p-3.5 rounded-xl space-y-1 text-center">
                            <p className="text-[10px] font-mono text-cyan-400 tracking-wider">SKI TRAIL CONDITION</p>
                            <p className="text-xs text-neutral-200">
                              {snowDepth > 200 ? "⚠️ Extremely Heavy Powder - Heli Guides recommended" : "⛷️ Premium powder levels - Trails 100% open"}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Screen 3: Satellite AI Concierge chatbot Sven */}
                      {phoneScreen === 'concierge' && (
                        <motion.div 
                          key="concierge"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-col h-[320px] justify-between"
                        >
                          {/* Output logs */}
                          <div className="overflow-y-auto space-y-3 pr-1 text-[11px] leading-relaxed flex-1 max-h-[250px]">
                            {phoneChat.map((msg, index) => (
                              <div 
                                key={index}
                                className={`p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-400 text-black ml-10 font-sans' : 'bg-white/10 text-neutral-200 mr-10 font-sans border border-white/5'}`}
                              >
                                {msg.text}
                              </div>
                            ))}
                          </div>

                          {/* Fast suggestions suggestions chips */}
                          <div className="flex flex-wrap gap-1 mt-3 mb-2">
                            {[
                              "Heli schedules?",
                              "Secret view?",
                              "Spa slot check"
                            ].map((suggest, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  setPhoneChatText(`Tell me about the ${suggest.toLowerCase()}`);
                                }}
                                className="text-[9px] font-mono bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white px-2 py-1 rounded transition-colors cursor-pointer border border-white/5"
                              >
                                {suggest}
                              </button>
                            ))}
                          </div>

                          {/* Chat Input form inside Phone */}
                          <form onSubmit={handlePhoneSend} className="flex gap-1.5 pt-1 border-t border-white/5">
                            <input 
                              type="text" 
                              value={phoneChatText}
                              onChange={(e) => setPhoneChatText(e.target.value)}
                              placeholder="Message high-camp satellite Sven..." 
                              className="flex-1 bg-white/5 border border-white/5 rounded-lg text-[10px] px-2.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/40"
                            />
                            <button 
                              type="submit"
                              className="p-2.5 bg-cyan-400 hover:bg-cyan-300 text-black rounded-lg transition-colors cursor-pointer"
                            >
                              <Send className="w-3 h-3" />
                            </button>
                          </form>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Simulated App Drawer home touchline */}
                  <div className="px-5 text-center mt-3">
                    <div className="w-24 h-1 bg-neutral-700 rounded-full mx-auto" />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================= */}
        {/* DESIGN CREDITS ACCORDING TO ANTI-AI-SLOP DIRECTIVES */}
        {/* ========================= */}
        <footer className="mt-20 border-t border-white/5 pt-8 text-center text-[10px] font-mono text-neutral-600 tracking-[0.25em] space-y-1.5">
          <p>SOVEREIGN RETREAT PORTAL v2026.5</p>
          <p className="text-neutral-700">SECURE SATELLITE CONNECTION CO-STATIONED VIA SWISS PEAK INTERPRETATION ALPS</p>
        </footer>

      </div>

      {/* ========================= */}
      {/* RESERVATION COMPILING LEDGER MODAL RECEIPT */}
      {/* ========================= */}
      <AnimatePresence>
        {isReceiptOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Receipt Header */}
              <div className="bg-cyan-400 p-6 text-black flex justify-between items-center text-center">
                <div className="text-left">
                  <span className="text-[9px] font-bold font-mono tracking-widest block uppercase opacity-85">Sovereign Alpine Lodges</span>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">PASS SYSTEM</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono bg-black text-white px-2.5 py-1 rounded-full font-bold">
                    {confirmationCode}
                  </span>
                </div>
              </div>

              {/* Receipt body ledger */}
              <div className="p-8 space-y-6 text-sm">
                
                <div className="text-center pb-4 border-b border-white/5">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#27d0ff]">Retreat Reservation Locked</p>
                  <p className="text-neutral-400 text-xs mt-1">Satellite authorization broadcast has completed successfully.</p>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">CHALET PEAK LOCATION:</span>
                    <span className="text-white font-semibold">{selectedDestObj.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">PASSENGER CHECK-IN:</span>
                    <span className="text-white font-semibold">{checkInDate} (14:00 - Flight Arrival)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">DURATION OF RETREAT:</span>
                    <span className="text-white font-semibold">{nightsCount} High altitude nights</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">TOTAL CONCIERGE GUESTS:</span>
                    <span className="text-white font-semibold">{guestCount} Certified Cabin members</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">WINE VAULT SPECS:</span>
                    <span className="text-white font-semibold">{wineQuality}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-400">BUTLER ATTITUDE LEVEL:</span>
                    <span className="text-white font-semibold">{butlerLevel}% Dedicated</span>
                  </div>
                </div>

                {/* Final Calculation Section */}
                <div className="pt-4 border-t border-dashed border-white/15 flex justify-between items-baseline">
                  <span className="text-neutral-400 font-mono text-xs">AUTHORIZED APEX DOCK CHARGE:</span>
                  <div className="text-right">
                    <p className="text-3xl font-mono font-bold text-cyan-300">
                      ${(selectedDestObj.price * nightsCount + (butlerLevel * 10) + (lessonCount * 180)).toLocaleString()}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-500">VAT & HELICOPTER SHUTTLE INCLUDED</p>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="pt-6 flex flex-col items-center justify-center space-y-2">
                  <div className="bg-white p-3 rounded-xl flex flex-col items-center select-none shadow">
                    {/* Simulated visual digital linear barcode */}
                    <div className="flex items-center space-x-1.5 h-10 w-56 bg-white overflow-hidden text-black brightness-90">
                      {[
                        1,3,2,1,4,2,3,1,2,1,4,2,1,3,2,1,3,4,1,2,3,1,4,3,2,1,4,2,1,1,3,2,4,1,2,1,3,4,2
                      ].map((barSize, bIdx) => (
                        <span 
                          key={bIdx} 
                          className="bg-black inline-block h-full" 
                          style={{ width: `${barSize * 1.5}px` }} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 tracking-[0.4em] uppercase">SYSTEM BARCODE SECURITY LOCK</span>
                </div>

                {/* Confirm dismiss info */}
                <div className="flex gap-3 justify-end pt-4">
                  <button 
                    onClick={() => {
                      setIsReceiptOpen(false);
                      // Move to companions panel optionally
                      setPhoneScreen('key');
                      const element = document.getElementById('companion');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-center py-3 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono tracking-widest uppercase font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    SYNC TO COMPANION APP CARD
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
