import { Calculator } from "@/components/Calculator";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-[#020202] text-zinc-900 dark:text-zinc-100 overflow-hidden relative">
      <div className="absolute top-4 right-4 z-20">
        <Link 
          href="/leaderboard"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
        >
          <Trophy size={14} className="text-yellow-500" /> Leaderboard
        </Link>
      </div>
      {/* Background blobs for aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-200/50 dark:bg-zinc-800/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-200/50 dark:bg-zinc-800/10 rounded-full blur-[120px] -z-10" />
      
      {/* Scanline effect for that techy feel */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_2px,3px_100%] z-50 opacity-20 dark:opacity-40" />

      <main className="w-full max-w-4xl flex flex-col items-center gap-8 z-10">
        <header className="flex flex-col items-center gap-2 text-center">
          <div className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-sm mb-4">
            Zenith Team
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tightest glitch-hover cursor-default italic">
            POWERLESS<span className="text-zinc-400 dark:text-zinc-600">.</span>GEN
          </h1>
          <p className="text-xs md:text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest max-w-xs md:max-w-none">
            The truth of powerness or powerlessness
          </p>
        </header>

        <div className="w-full">
          <Calculator />
        </div>

        <footer className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600">
          <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-800 mb-2" />
          <p className="text-[10px] font-black tracking-[0.2em] uppercase">
            Developed by Zenith Team &copy; {new Date().getFullYear()}
          </p>
          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">
            Experimental Humiliation Protocol v1.0.4
          </p>
        </footer>
      </main>
    </div>
  );
}
