import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, X, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[200]"
        >
          <div className="bg-brand-charcoal/90 backdrop-blur-xl border border-brand-blue/20 rounded-2xl p-6 shadow-2xl shadow-brand-blue/10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-brand-blue/10 rounded-lg shrink-0">
                <Cookie className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Protocol: Consent</h4>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed mb-4 font-mono">
                  WE USE COOKIES TO REMEMBER YOUR SESSION CONFIGURATIONS AND ENSURE OPTIMAL RESOURCE LOADING SPEED. BY CONTINUING, YOU ACKNOWLEDGE THE USE OF LOCAL STORAGE PROTOCOLS.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={handleAccept}
                    className="flex-1 py-2 bg-brand-blue text-brand-black font-mono text-[10px] font-bold uppercase rounded-lg hover:bg-brand-blue/80 transition-colors"
                  >
                    ACKNOWLEDGE
                  </button>
                  <button 
                    onClick={handleDecline}
                    className="px-4 py-2 border border-white/10 text-white/50 font-mono text-[10px] uppercase rounded-lg hover:border-brand-blue/30 hover:text-white transition-colors"
                  >
                    DECLINE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
