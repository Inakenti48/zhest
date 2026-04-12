'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function RotatingPipes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Scroll-based transforms
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020617]">
      {/* Animated Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-blue-400/5 blur-[120px] rounded-full"
        />
      </div>

      {/* 3D Motion Objects (Metallic Pipes & Elements) */}
      <motion.div 
        style={{ rotate: scrollRotate, y: scrollY }}
        className="relative w-full h-full flex items-center justify-center opacity-30"
      >
        {/* Tin Pipe 1 - Floating & Rotating */}
        <motion.div 
          animate={{ 
            rotate: [45, 50, 45],
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[900px] h-40 bg-gradient-to-r from-metal-600 via-metal-200 to-metal-600 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] border-y border-white/20"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(0,0,0,0.15)_60px,rgba(0,0,0,0.15)_61px)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
        </motion.div>
        
        {/* Tin Pipe 2 - Opposite Motion */}
        <motion.div 
          animate={{ 
            rotate: [-45, -40, -45],
            y: [0, 20, 0],
            x: [0, -15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute w-[900px] h-40 bg-gradient-to-r from-metal-700 via-metal-300 to-metal-700 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] border-y border-white/20"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(0,0,0,0.15)_60px,rgba(0,0,0,0.15)_61px)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
        </motion.div>

        {/* Floating Metallic Spheres */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i
            }}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-metal-200 via-metal-400 to-metal-800 shadow-2xl border border-white/20"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              opacity: 0.4
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]" />
          </motion.div>
        ))}

        {/* Vertical Decorative Pipes */}
        <motion.div 
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-[1400px] bg-gradient-to-b from-metal-600 via-metal-200 to-metal-600 rounded-full shadow-2xl border-x border-white/20 left-[10%]"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(0,0,0,0.15)_60px,rgba(0,0,0,0.15)_61px)]" />
        </motion.div>

        <motion.div 
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-[1400px] bg-gradient-to-b from-metal-600 via-metal-200 to-metal-600 rounded-full shadow-2xl border-x border-white/20 right-[10%]"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(0,0,0,0.15)_60px,rgba(0,0,0,0.15)_61px)]" />
        </motion.div>

        {/* Center Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
      </motion.div>

      {/* Grid Overlay for technical feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
    </div>
  );
}
