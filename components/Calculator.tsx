"use client";

import { useState, useEffect } from "react";
import { calculatePowerlessAction } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check, Loader2, Trophy, ShieldAlert, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ name: string; percentage: number; fromDb?: boolean } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadingSteps = [
    "Phrasing the names to uqi's mouth...",
    "Swallowing the nuh into syn's stomach...",
    "Identifying whether it's fit in jay or not...",
    "Getting gaga ready to blast out the nuh...",
    "Here it comes ahhh..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalculating) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 800);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsCalculating(true);
    setError(null);
    setResult(null);

    // Artificial delay for "Cool" loading effect
    await new Promise(resolve => setTimeout(resolve, 4000));

    try {
      const data = await calculatePowerlessAction(name);
      if ("error" in data) {
        setError(data.error || "System Failure");
      } else {
        setResult(data);
        // Save to local history
        const history = JSON.parse(localStorage.getItem("powerless_history") || "[]");
        if (!history.includes(data.name.toLowerCase())) {
          const newHistory = [data.name.toLowerCase(), ...history].slice(0, 50);
          localStorage.setItem("powerless_history", JSON.stringify(newHistory));
        }
      }
    } catch (err) {
      setError("Connection to Zenith Mainframe lost.");
    } finally {
      setIsCalculating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `💀 I am ${result.percentage}% POWERLESS! 💀\nCheck your own score at: ${window.location.origin}\n#PowerlessGen #ZenithTeam`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMockingMessage = (p: number) => {
    if (p > 90) return "QUIT THE GAME LIL BRO, YOU AIN'T BUILD FOR THIS 💀";
    if (p > 60) return "WHAT CAN I SAY? WEAKER THAN JAY'S DINGDONG 😂";
    if (p > 30) return "YOU'RE SO MID BRUH 💁";
    return "YOU'RE STRONG, WE GET IT 🫡";
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-8">
      <motion.div 
        layout
        className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl transition-all duration-500"
      >
        {/* Certificate Header Decor */}
        <div className="h-2 w-full bg-gradient-to-r from-zinc-500 via-zinc-900 to-zinc-500 dark:from-zinc-800 dark:via-zinc-200 dark:to-zinc-800" />
        
        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-2 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500"
            >
              <Trophy size={12} /> Approved by WHO
            </motion.div>
            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 italic">
              POWERLESS SCANNER
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="SUBJECT NAME"
                disabled={isCalculating}
                className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 rounded-2xl outline-none transition-all duration-300 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 placeholder:italic disabled:opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isCalculating || !name.trim()}
              className="group relative w-full py-4 px-6 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-black text-lg rounded-2xl overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-xl hover:shadow-zinc-500/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isCalculating ? (
                  <>
                    <Loader2 className="animate-spin" />
                    ANALYZING...
                  </>
                ) : (
                  <>
                    <Zap size={20} className="fill-current" />
                    CALCULATE POWERLESSNESS
                  </>
                )}
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-black dark:from-zinc-200 dark:to-white"
                initial={false}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </button>
          </form>

          <AnimatePresence mode="wait">
            {isCalculating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-12 flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 blur-xl opacity-20 animate-pulse" />
                  <Loader2 size={64} className="animate-spin text-zinc-900 dark:text-zinc-100 relative z-10" />
                </div>
                <motion.p 
                  key={loadingStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter"
                >
                  {loadingSteps[loadingStep]}
                </motion.p>
              </motion.div>
            )}

            {result && !isCalculating && (
              <motion.div 
                initial={{ opacity: 0, y: 20, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                className="relative mt-8 p-8 space-y-6 border-4 border-double border-zinc-900 dark:border-zinc-100 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden"
              >
                {/* Certificate Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
                  <Trophy size={300} />
                </div>

                <div className="relative z-10 text-center space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Official Verdict for</p>
                    <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 truncate uppercase underline decoration-double underline-offset-8">
                      {result.name}
                    </h3>
                  </div>

                  <div className="py-4">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100"
                    >
                      {result.percentage}%
                    </motion.div>
                    <p className="text-2xl font-black italic uppercase text-zinc-900 dark:text-zinc-100 tracking-widest">
                      POWERLESS
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-xl transform -rotate-1 shadow-lg">
                    <p className="text-sm font-bold tracking-tight leading-tight uppercase italic">
                      "{getMockingMessage(result.percentage)}"
                    </p>
                  </div>

                  <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-zinc-800 border-2 border-zinc-900 dark:border-zinc-100 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all active:scale-95"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "COPIED TO CLIPBOARD" : "COPY LINK"}
                    </button>
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-200 dark:bg-zinc-800 opacity-50 cursor-not-allowed rounded-xl text-[10px] font-bold uppercase tracking-tighter"
                    >
                      <Share2 size={16} />
                      AUTO-POST (COMING SOON)
                    </button>
                  </div>
                  
                  <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-4">
                    CERTIFIED BY ZENITH TEAM PROTOCOL v.1.0
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && !isCalculating && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl"
            >
              <ShieldAlert size={20} />
              <p className="text-xs font-bold uppercase">{error}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
