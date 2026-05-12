import { motion } from "motion/react";
import { Settings, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 selection:bg-brand-blue selection:text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <Settings className="w-32 h-32 text-brand-blue animate-spin-slow opacity-20" />
            <AlertTriangle className="w-16 h-16 text-brand-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-mono text-brand-blue text-xs tracking-[0.4em] uppercase mb-4 block">Error 404 // Protocol Failure</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">NODE NOT FOUND</h1>
          <p className="text-white/50 text-lg mb-10 font-mono leading-relaxed">
            SYSTEM DATA ACCESS DENIED. THE REQUESTED MODULE IS EITHER OFFLINE OR UNDERGOING CRITICAL MAINTENANCE.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="/"
            className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            Return to Base
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="btn-outline w-full sm:w-auto"
          >
            Reconnect Signal
          </button>
        </motion.div>

        {/* Decorative Grid */}
        <div className="mt-16 pt-8 border-t border-white/5 font-mono text-[10px] text-white/20 flex justify-center gap-8 uppercase tracking-widest">
          <span>Maintenance Status: Active</span>
          <span>//</span>
          <span>Uptime: 99.9%</span>
        </div>
      </div>
    </div>
  );
}
