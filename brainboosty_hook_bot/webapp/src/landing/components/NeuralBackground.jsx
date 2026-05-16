import { motion } from "framer-motion";

/** Анимированный космический фон + нейронные линии */
export function NeuralBackground() {
  const particles = Array.from({ length: 24 }, (_, i) => i);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 bg-cosmic" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M ${20 + i * 40} 0 Q ${200 + i * 30} ${180 + i * 20} ${380 - i * 20} 400 T ${800} 900`}
            fill="none"
            stroke="url(#neural-line)"
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {particles.map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-neon-gold/80"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            boxShadow: "0 0 8px rgba(255,215,0,0.8)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}
