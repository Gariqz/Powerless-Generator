"use client";

import { useEffect, useState } from "react";
import { getLeaderboardAction } from "@/app/actions";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Loader2, Skull } from "lucide-react";
import Link from "next/link";

export default function LeaderboardPage() {
  const [data, setData] = useState<{ name: string; percentage: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const history = JSON.parse(localStorage.getItem("powerless_history") || "[]");
        console.log("Local History found:", history);
        
        if (history.length > 0) {
          const results = await getLeaderboardAction(history);
          console.log("Results from DB:", results);
          setData(results);
        }
      } catch (err) {
        console.error("Leaderboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-zinc-50 dark:bg-[#020202] text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-200/50 dark:bg-zinc-800/10 rounded-full blur-[120px] -z-10" />
      
      <main className="w-full max-w-2xl flex flex-col gap-8 z-10 py-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <Link 
            href="/"
            className="group flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Scanner
          </Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tightest italic uppercase">
            Personal <span className="text-zinc-400 dark:text-zinc-600">Leaderboard</span>
          </h1>
          <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Your most pathetic calculations ranked
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
          <div className="p-6 sm:p-10">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-zinc-400" size={32} />
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Accessing Archives...</p>
              </div>
            ) : data.length === 0 ? (
              <div className="py-20 flex flex-col items-center gap-4 text-center">
                <Skull className="text-zinc-200 dark:text-zinc-800" size={64} />
                <p className="text-sm font-bold uppercase text-zinc-400">No data found. Go get scanned first.</p>
                <Link href="/" className="text-xs font-black underline decoration-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                  START SCANNING
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex items-center justify-between p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-black">
                        #{index + 1}
                      </div>
                      <span className="text-lg font-black uppercase tracking-tighter truncate max-w-[150px] sm:max-w-none">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-2xl font-black tracking-tighter">{item.percentage}%</span>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Powerless</p>
                      </div>
                      {index === 0 && <Trophy size={20} className="text-yellow-500 animate-bounce" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
