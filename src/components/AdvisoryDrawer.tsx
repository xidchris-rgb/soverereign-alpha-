import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, ShieldAlert, Calendar, Mail, FileCheck, Check } from 'lucide-react';
import { AdvisoryDiscipline } from '../types';

interface AdvisoryDrawerProps {
  onClose: () => void;
}

export default function AdvisoryDrawer({ onClose }: AdvisoryDrawerProps) {
  const disciplines: AdvisoryDiscipline[] = [
    {
      id: "d1",
      title: "Sovereign Infrastructure Policy",
      description: "Navigating regional regulatory structures and defining sovereign physical sandboxes.",
      features: [
        "Cryptographic jurisdiction mapping",
        "Off-grid compliance matrices",
        "Autonomous entity corporate structures"
      ]
    },
    {
      id: "d2",
      title: "Tokenomics & Market Coordination",
      description: "Simulating robust native economy models that maintain stable programmatic systems.",
      features: [
        "Deflationary reward simulations",
        "Liquidity bootstrapping structures",
        "Decentralized governance frameworks"
      ]
    },
    {
      id: "d3",
      title: "Hardware Cryptography & Verification",
      description: "Auditing custom silicon profiles, physical security layers, and secure radio telemetry.",
      features: [
        "Silicon telemetry audits",
        "Encrypted edge routing validation",
        "Topological layout inspections"
      ]
    }
  ];

  // Helper to generate the next 14 days starting from today (2026-05-22 UTC)
  const generateUpcomingDays = () => {
    const dates = [];
    const baseDate = new Date(Date.UTC(2026, 4, 22)); // May 22, 2026
    const daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 1; i <= 12; i++) {
      const nextDate = new Date(baseDate);
      nextDate.setUTCDate(baseDate.getUTCDate() + i);
      const isWeekend = nextDate.getUTCDay() === 0 || nextDate.getUTCDay() === 6;
      dates.push({
        rawDate: nextDate,
        dayNum: nextDate.getUTCDate(),
        dayLabel: daysName[nextDate.getUTCDay()],
        monthLabel: "May",
        available: !isWeekend, // weekends closed in VEX advisor engine
      });
    }
    return dates;
  };

  const upcomingDays = generateUpcomingDays();

  // State
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<{
    dateStr: string;
    slot: string;
    email: string;
  } | null>(null);

  const availableSlots = [
    "09:00 - 11:00 UTC",
    "13:00 - 15:00 UTC",
    "16:00 - 18:00 UTC"
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDayIdx === null || !selectedSlot || !emailInput) return;

    setIsBooking(true);
    setTimeout(() => {
      const day = upcomingDays[selectedDayIdx];
      setBookedDetails({
        dateStr: `${day.dayLabel} ${day.monthLabel} ${day.dayNum}, 2026`,
        slot: selectedSlot,
        email: emailInput
      });
      setIsBooking(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full md:w-[600px] z-50 liquid-glass border-l border-white/10 flex flex-col h-full shadow-2xl text-white font-sans"
      id="advisory-drawer"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-neutral-300" />
          <span className="font-mono text-sm tracking-widest text-neutral-300 uppercase">Sovereign Advisory</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          id="close-advisory"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scroll Container */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
        {/* Disciplines Section */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs tracking-widest text-neutral-500 uppercase">DISCIPLINES OF CO-BUILDING</h4>
          <div className="space-y-4">
            {disciplines.map((d, dIdx) => (
              <div key={d.id} className="p-4 rounded-lg bg-neutral-950 border border-white/5 space-y-2">
                <h5 className="font-medium text-sm text-neutral-100">{d.title}</h5>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">{d.description}</p>
                <ul className="grid grid-cols-1 gap-1.5 pt-2">
                  {d.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                      <span className="w-1 h-1 bg-white rounded-full" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Scheduler */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <h4 className="font-mono text-xs tracking-widest text-neutral-500 uppercase">RESERVE CONSENSUS BRIEFING</h4>
            <Calendar className="w-4 h-4 text-neutral-500" />
          </div>

          {!bookedDetails ? (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Day horizontal picker */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400">SELECT BRIEFING DATE</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {upcomingDays.map((day, dIdx) => (
                    <button
                      key={dIdx}
                      type="button"
                      disabled={!day.available}
                      onClick={() => {
                        setSelectedDayIdx(dIdx);
                        setSelectedSlot(null);
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded w-14 shrink-0 transition-all font-mono border ${
                        !day.available 
                          ? 'border-neutral-900/40 text-neutral-750 opacity-20 pointer-events-none'
                          : selectedDayIdx === dIdx
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-950 border-white/5 text-neutral-300 hover:border-white/20 hover:bg-neutral-900/50'
                      }`}
                      id={`day-select-${dIdx}`}
                    >
                      <span className="text-[8px] uppercase tracking-wider">{day.dayLabel}</span>
                      <span className="text-sm font-semibold tracking-tight mt-0.5">{day.dayNum}</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60 mt-0.5">{day.monthLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots (Visible if Day selected) */}
              <AnimatePresence>
                {selectedDayIdx !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-1.5"
                  >
                    <label className="text-[10px] font-mono text-neutral-400">SELECT TIME WINDOW</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2.5 text-[10px] font-mono rounded border text-center transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-neutral-300 text-black border-white font-semibold'
                              : 'bg-neutral-950 border-white/5 text-neutral-300 hover:border-white/20 hover:bg-neutral-900'
                          }`}
                          id={`slot-select-${slot.split(':')[0]}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form entries (Visible if Day and Slot selected) */}
              <AnimatePresence>
                {selectedDayIdx !== null && selectedSlot !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 pt-2"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase">YOUR SECURE INBOX EMAIL</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="e.g. keyholder@protonmail.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full text-xs p-2.5 pl-9 rounded bg-neutral-950 border border-white/10 focus:border-white focus:outline-none transition-all placeholder-neutral-700"
                          id="book-email"
                        />
                        <Mail className="absolute left-3 top-3 w-3.5 h-3.5 text-neutral-600" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isBooking}
                      className="w-full uppercase text-[10px] font-mono p-3 bg-white text-black hover:bg-neutral-200 transition-colors rounded text-center font-bold tracking-wider cursor-pointer"
                      id="book-btn"
                    >
                      {isBooking ? "CRYPTOGRAPHIC SCHEDULING..." : "COMMIT BRIEFING APPOINTMENT"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          ) : (
            <div className="p-6 rounded-lg bg-neutral-950 border border-white/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <FileCheck className="w-5 h-5" />
                <span className="font-mono text-xs tracking-widest uppercase">BRIEFING COVENANT ESTABLISHED</span>
              </div>
              
              <div className="space-y-2 text-xs font-light text-neutral-300 leading-relaxed">
                <p>
                  VEX Advisory Console has successfully booked your session and established a secure socket pipeline.
                </p>
                <div className="p-3 bg-white/5 border border-white/10 font-mono text-[10px] rounded space-y-1 text-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Date:</span>
                    <span>{bookedDetails.dateStr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Time Window:</span>
                    <span>{bookedDetails.slot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Target Inbox:</span>
                    <span>{bookedDetails.email}</span>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-450 italic mt-2">
                  * A secure PGP sign key has been transmitted. Complete visual verification upon launch link dispatch.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookedDetails(null);
                    setSelectedDayIdx(null);
                    setSelectedSlot(null);
                    setEmailInput('');
                  }}
                  className="w-full font-mono text-[10px] p-2.5 bg-neutral-900 border border-white/10 hover:border-white/20 text-white rounded transition-colors uppercase cursor-pointer text-center"
                  id="book-again-btn"
                >
                  SCHEDULE NEW BRIEFING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
