import { useState, useEffect, useMemo } from "react";

// ── Reemplaza estas rutas con tus fotos reales 
// ──────────────────────────────
import img1 from '../assets/20251018_111737.jpg'
import img2 from '../assets/20251023_125925.jpg'
import img3 from '../assets/20260111_184003.jpg'
import img4 from '../assets/20260124_191319.jpg'
import img5 from '../assets/IMG-20260203-WA0025.jpg'
import img6 from '../assets/fotoDataPax_70164-1.jpg'
const PHOTOS = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];
// ────────────────────────────────────────────────────────────────────────────

const START_DATE = new Date("2022-11-04T00:00:00");

function useTimer() {
  const [diff, setDiff] = useState(Date.now() - START_DATE.getTime());
  useEffect(() => {
    const id = setInterval(
      () => setDiff(Date.now() - START_DATE.getTime()),
      1000,
    );
    return () => clearInterval(id);
  }, []);
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);
  return { days, hours, minutes, seconds, totalSeconds };
}

// ── Rosa SVG animada ────────────────────────────────────────────────────────
function Rose() {
  return (
    <svg
      viewBox="0 0 120 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 120,
        height: 160,
        filter: "drop-shadow(0 0 18px #ff6b9d88)",
      }}
    >
      {/* Tallo */}
      <path
        d="M60 155 Q55 130 58 110"
        stroke="#4a9e4a"
        strokeWidth="3"
        fill="none"
      />
      {/* Hoja izquierda */}
      <path d="M58 130 Q40 120 38 105 Q52 108 58 120" fill="#5cb85c" />
      {/* Pétalos exteriores */}
      <ellipse
        cx="60"
        cy="90"
        rx="22"
        ry="28"
        fill="#e8336d"
        transform="rotate(-20 60 90)"
        opacity="0.85"
      />
      <ellipse
        cx="60"
        cy="90"
        rx="22"
        ry="28"
        fill="#d42060"
        transform="rotate(20 60 90)"
        opacity="0.85"
      />
      <ellipse
        cx="60"
        cy="90"
        rx="22"
        ry="28"
        fill="#e8336d"
        transform="rotate(-50 60 90)"
        opacity="0.75"
      />
      <ellipse
        cx="60"
        cy="90"
        rx="22"
        ry="28"
        fill="#d42060"
        transform="rotate(50 60 90)"
        opacity="0.75"
      />
      {/* Pétalos medios */}
      <ellipse
        cx="60"
        cy="88"
        rx="16"
        ry="20"
        fill="#f0547a"
        transform="rotate(-10 60 88)"
        opacity="0.9"
      />
      <ellipse
        cx="60"
        cy="88"
        rx="16"
        ry="20"
        fill="#e8336d"
        transform="rotate(30 60 88)"
        opacity="0.9"
      />
      <ellipse
        cx="60"
        cy="88"
        rx="16"
        ry="20"
        fill="#f0547a"
        transform="rotate(-40 60 88)"
        opacity="0.85"
      />
      {/* Centro */}
      <circle cx="60" cy="84" r="10" fill="#c71f5a" />
      <circle cx="60" cy="84" r="6" fill="#a8144a" />
      <circle cx="60" cy="84" r="3" fill="#8a0f3c" />
    </svg>
  );
}
type HeartValue = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
};
type RoseValue = {
  left: number;
  delay: number;
  duration: number;
  rot: number;
};
function defineHeartValues(): HeartValue[] {
  return Array.from({ length: 18 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 8,
    size: Math.random() * 22,
    opacity: Math.random() * 0.35,
  }));
}
function defineRosesValues(): RoseValue[] {
  return Array.from({ length: 18 }, () => ({
    left: 5 + Math.random() * 90,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
    rot: Math.random() * 360
  }));
}


// ── Corazones flotantes de fondo ────────────────────────────────────────────
function Hearts() {
  const heartValues = useMemo(() => defineHeartValues(), []);

  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: heartValues[i].left,
    delay: heartValues[i].delay,
    duration: heartValues[i].duration,
    size: heartValues[i].size,
    opacity: heartValues[i].opacity,
  }));
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            bottom: "-60px",
            fontSize: h.size,
            opacity: h.opacity,
            animation: `floatUp 4s 2s infinite linear`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

// ── Fotos flotando en el espacio ────────────────────────────────────────────
function FloatingPhotos() {
  // Posiciones fijas para que no salten en cada render
  const configs = [
    { top: "6%", left: "2%", rot: -8, delay: 0, dur: 7 },
    { top: "5%", right: "3%", rot: 6, delay: 1.2, dur: 8 },
    { top: "38%", left: "1%", rot: -5, delay: 2.5, dur: 9 },
    { top: "40%", right: "2%", rot: 9, delay: 0.7, dur: 7.5 },
    { top: "72%", left: "3%", rot: -10, delay: 1.8, dur: 8.5 },
    { top: "74%", right: "2%", rot: 7, delay: 3, dur: 7 },
  ];

  return (
    <>
      {PHOTOS.map((src, i) => {
        const c = configs[i];
        const style: React.CSSProperties = {
          position: "fixed",
          top: c.top,
          left: (c as any).left,
          right: (c as any).right,
          width: 110,
          height: 110,
          borderRadius: 12,
          objectFit: "cover",
          border: "3px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
          transform: `rotate(${c.rot}deg)`,
          animation: `photoFloat ${c.dur}s ${c.delay}s ease-in-out infinite alternate`,
          zIndex: 1,
          backdropFilter: "blur(2px)",
        };
        return (
          <img key={i} src={src} alt={`recuerdo ${i + 1}`} style={style} />
        );
      })}
    </>
  );
}

// ── Tarjeta de contador ─────────────────────────────────────────────────────
function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 16,
        padding: "12px 20px",
        backdropFilter: "blur(8px)",
        minWidth: 70,
      }}
    >
      <span
        style={{
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 700,
          color: "#ffb3cc",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.55)",
          marginTop: 4,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Pétalos de rosa cayendo ─────────────────────────────────────────────────
function Petals() {
    const petalValues = useMemo(()=>defineRosesValues(), [])
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: petalValues[i].left,
    delay: petalValues[i].delay,
    duration: petalValues[i].duration,
    rot: petalValues[i].rot,
  }));
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-30px",
            width: 12,
            height: 8,
            borderRadius: "50% 50% 50% 0 / 60% 60% 40% 40%",
            background: "rgba(232, 51, 109, 0.45)",
            transform: `rotate(${p.rot}deg)`,
            animation: `petalFall ${p.duration}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────────
export default function App() {
  const { days, hours, minutes, seconds, totalSeconds } = useTimer();
  const [roseClicked, setRoseClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  
  const handleRose = () => {
    setRoseClicked(true);
    setShowMessage(true);
    setTimeout(() => setRoseClicked(false), 1200);
  };

  const tiernezas = [
    "Cada segundo que pasa es uno más que te quiero 💕",
    "Eres mi persona favorita en todo el universo 🌙",
    "Contigo el tiempo vuela y aun así quiero más ✨",
    "Mi corazón lleva tu nombre tatuado 🌹",
  ];

  const [tierneza, setTierneza] = useState(tiernezas[Math.floor(Math.random() * tiernezas.length)])
  useEffect(()=>{
    const interval = setInterval(()=>{
        setTierneza(
            tiernezas[Math.floor(Math.random()*tiernezas.length)]
        )
    },3000)
    return ()=> clearInterval(interval)
  },[])


  return (
    <>
      {/* ── Estilos globales ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400&family=Dancing+Script:wght@700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: radial-gradient(ellipse at 30% 20%, #2a0a1f 0%, #1a0612 40%, #0d0008 100%);
          min-height: 100vh;
          color: #fff;
          overflow-x: hidden;
        }

        @keyframes floatUp {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: inherit; }
          50%  { transform: translateY(-50vh) translateX(15px); }
          100% { transform: translateY(-105vh) translateX(-10px) scale(0.5); opacity: 0; }
        }
        @keyframes petalFall {
          0%   { transform: translateY(-30px) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
        }
        @keyframes photoFloat {
          from { transform: translateY(0px) rotate(var(--r, 0deg)); }
          to   { transform: translateY(-18px) rotate(var(--r, 0deg)); }
        }
        @keyframes rosePulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.12); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes sparkle {
          0%,100% { opacity: 0; transform: scale(0); }
          50%      { opacity: 1; transform: scale(1); }
        }
        @keyframes bump {
          0%,100% { transform: scale(1); }
          30%     { transform: scale(1.3); }
        }

        .rose-btn {
          background: none; border: none; cursor: pointer;
          animation: rosePulse 2.4s ease-in-out infinite;
          transition: filter .2s;
        }
        .rose-btn:hover { filter: brightness(1.2) drop-shadow(0 0 24px #ff6b9d); }
        .rose-btn:active { transform: scale(0.9); }

        .name-gradient {
          background: linear-gradient(90deg, #ff9dc8, #ff4d8d, #ffb3cc, #ff4d8d, #ff9dc8);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .counter-wrapper {
          animation: fadeSlideUp .8s ease both;
          animation-delay: .4s;
        }

        .message-card {
          animation: fadeSlideUp .5s ease both;
        }

        .sparkle {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ffb3cc;
          animation: sparkle 1.2s ease infinite;
        }
      `}</style>

      {/* ── Capas de fondo ── */}
      <Petals />
      <Hearts />
      <FloatingPhotos />

      {/* ── Contenido central ── */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "40px 20px",
          gap: 32,
        }}
      >
        {/* Título */}
        <div
          style={{
            textAlign: "center",
            animation: "fadeSlideUp .7s ease both",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,180,210,0.7)",
              marginBottom: 8,
            }}
          >
            para mi amor
          </p>
          <h1
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(3.5rem, 12vw, 7rem)",
              lineHeight: 1,
            }}
          >
            <span className="name-gradient">Victoria</span>
          </h1>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
              color: "rgba(255,200,220,0.8)",
              marginTop: 10,
            }}
          >
            te regalo esta rosa y todos mis segundos 🌹
          </p>
        </div>

        {/* Rosa interactiva */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {roseClicked && (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 55}px`,
                    left: `${60 + Math.cos((i * 60 * Math.PI) / 180) * 55}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </>
          )}
          <button
            className="rose-btn"
            onClick={handleRose}
            aria-label="Toca la rosa"
          >
            <Rose />
          </button>
        </div>

        {showMessage && (
          <div
            className="message-card"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,100,160,0.3)",
              borderRadius: 20,
              padding: "16px 28px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              maxWidth: 320,
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "#ffcce0",
                lineHeight: 1.6,
              }}
            >
              {tierneza}
            </p>
          </div>
        )}

        {/* Contador */}
        <div className="counter-wrapper" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,180,210,0.6)",
              marginBottom: 14,
            }}
          >
            llevamos juntos
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <StatCard value={days} label="días" />
            <StatCard value={hours} label="horas" />
            <StatCard value={minutes} label="minutos" />
            <StatCard value={seconds} label="segundos" />
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,200,220,0.65)",
              marginTop: 16,
              lineHeight: 1.5,
            }}
          >
            eso son{" "}
            <span style={{ color: "#ff9dc8", fontWeight: 600 }}>
              {totalSeconds.toLocaleString()}
            </span>{" "}
            segundos pensando en ti 💓
          </p>
        </div>

        {/* Frase final */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 340,
            padding: "0 16px",
            animation: "fadeSlideUp 1s .8s ease both",
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              color: "rgba(255,210,230,0.85)",
              lineHeight: 1.75,
            }}
          >
           "te amo, muchito, sos el amorcito de mi vida te amo amorperdonportodo"
          </p>
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "1.4rem",
              color: "#ff7aaa",
              marginTop: 12,
            }}
          >
            — con todo mi amor 🌙
          </p>
        </div>

        {/* Toca la rosa hint */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,150,190,0.4)",
          }}
        >
          ✦ toca la rosa ✦
        </p>
      </main>
    </>
  );
}
