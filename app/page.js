"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Komponen Dekorasi Simetris 4 Sudut ---
const FullDecorations = () => (
  <>
    {/* LAYER BELAKANG: Dekorasi Statis (Gambar top-corner.png) */}
    <img
      src="/top-corner.png"
      className="decor-static-top pointer-events-none"
      alt="Static Decor Back"
    />
    {/* Ornamen Pojok ATAS (Kiri & Kanan) */}
    <div className="ornament-container-top pointer-events-none">
      <img
        src="/bottom-corner.png"
        className="spinning-ornament offset-left"
        alt="Top Left"
      />
      <img
        src="/bottom-corner.png"
        className="spinning-ornament offset-right"
        alt="Top Right"
      />
    </div>

    {/* Ornamen Pojok BAWAH (Kiri & Kanan) */}
    <div className="ornament-container-bottom pointer-events-none">
      <img
        src="/bottom-corner.png"
        className="spinning-ornament offset-left"
        alt="Bottom Left"
      />
      <img
        src="/bottom-corner.png"
        className="spinning-ornament offset-right"
        alt="Bottom Right"
      />
    </div>
  </>
);

// --- Varian Animasi Staggered untuk Konten ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- Komponen Countdown Timer ---
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    Days: 0,
    Hours: 0,
    Min: 0,
    Sec: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance < 0) clearInterval(timer);
      else {
        setTimeLeft({
          Days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          Hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          Min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          Sec: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      variants={itemVariants}
      className="flex gap-2 justify-center z-30 relative mt-4"
    >
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="bg-[#c5a059] text-white p-2 rounded-lg min-w-[65px] text-center shadow-md"
        >
          <div className="text-xl font-bold font-serif">{value}</div>
          <div className="text-[10px] uppercase tracking-widest">{label}</div>
        </div>
      ))}
    </motion.div>
  );
};

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Nama Tamu";
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleCopy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Nomor rekening berhasil disalin!"));
    }
  };

  const data = {
    childName: "Rashad Hakeem Darmawan",
    parents: "Putra Bapak Fulan & Ibu Fulanah",
    targetDate: "2026-12-24T10:00:00",
    displayDate: "Saturday, 24 December 2026",
    time: "10.00 AM - 01.00 PM",
    location: "Komplek Perumahan INALUM, Sei Suka, Batu Bara",
    wa: "628123456789",
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.play();
  };

  return (
    <main className="max-w-md mx-auto shadow-2xl relative bg-[#fdfcf9]">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* --- COVER PAGE --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.section
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[500] bg-[#fdfcf9] flex flex-col items-center justify-center text-center p-8 overflow-hidden"
          >
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="z-30 relative"
            >
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-[#c5a059] text-xl mb-2"
              >
                Undangan
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="font-serif text-3xl text-[#c5a059] font-bold tracking-[0.2em] mb-12 uppercase leading-tight"
              >
                Tasyakuran Khitan
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="w-56 h-56 rounded-full border-4 border-[#c5a059] overflow-hidden mx-auto mb-10 shadow-xl"
              >
                <img
                  src="/hero.avif"
                  className="w-full h-full object-cover"
                  alt="Hero"
                />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl font-serif text-[#1a365d] font-bold mb-8 leading-tight"
              >
                {data.childName}
              </motion.h2>
              <motion.div
                variants={itemVariants}
                className="mb-10 text-stone-500"
              >
                <p className="text-sm italic mb-2">Kepada Yth;</p>
                <p className="text-2xl font-serif text-[#c5a059] font-bold">
                  {guestName}
                </p>
              </motion.div>
              <motion.button
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="bg-[#1a365d] text-white px-10 py-3 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* --- CONTENT (SNAP SCROLL) --- */}
      {isOpen && (
        <div className="snap-container">
          {/* SECTION 1: PROFIL */}
          <div className="snap-section flex flex-col items-center justify-center text-center px-8">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-10 relative"
            >
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-stone-600 mb-2"
              >
                Assalamu'alaikum Wr Wb
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-[13px] leading-relaxed text-stone-500 mb-8 px-4"
              >
                Tanpa mengurangi rasa hormat kami bermaksud mengundang
                Bapak/Ibu/Saudara/i pada acara syukuran khitan anak kami:
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="w-48 h-56 arch-frame overflow-hidden border-2 border-[#c5a059] mb-6 shadow-lg mx-auto"
              >
                <img src="/hero.avif" className="w-full h-full object-cover" />
              </motion.div>
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-serif text-[#c5a059] font-bold mb-2 leading-tight"
              >
                {data.childName}
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-sm font-serif italic text-[#1a365d] font-bold"
              >
                {data.parents}
              </motion.p>
            </motion.div>
          </div>

          {/* SECTION 2: EVENT */}
          <div className="snap-section flex flex-col items-center justify-center text-center px-8">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-10 relative"
            >
              <motion.h1
                variants={itemVariants}
                className="font-serif text-3xl text-[#c5a059] font-bold tracking-[0.1em] mb-4 uppercase leading-tight"
              >
                Waktu Pelaksanaan
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="space-y-2 text-[#1a365d] font-bold mb-10 mt-6"
              >
                <p className="text-xl font-serif">{data.displayDate}</p>
                <p className="text-sm">{data.time}</p>
                <p className="text-xs leading-relaxed max-w-[250px] mx-auto font-normal text-stone-400 italic">
                  {data.location}
                </p>
              </motion.div>
              <CountdownTimer targetDate={data.targetDate} />
            </motion.div>
          </div>

          {/* SECTION 3: GIFT */}
          <div className="snap-section flex flex-col items-center justify-center text-center px-8">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-10 relative"
            >
              <motion.h4
                variants={itemVariants}
                className="font-serif italic text-[#c5a059] text-2xl mb-8"
              >
                Tanda Kasih
              </motion.h4>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center"
              >
                <p className="text-[#1a365d] font-bold text-2xl mb-3 tracking-widest">
                  12345678
                </p>
                <button
                  onClick={() => handleCopy("12345678")}
                  className="bg-[#c5a059] text-white px-8 py-2 rounded-full text-[10px] uppercase font-bold shadow-md"
                >
                  Salin Rekening
                </button>
                <p className="text-[11px] text-stone-400 mt-3 uppercase font-bold tracking-widest">
                  BCA : Rashad Hakeem
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[400] flex flex-col gap-3">
          <a
            href={`https://wa.me/${data.wa}`}
            target="_blank"
            className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg"
          >
            📱
          </a>
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }}
            className="w-10 h-10 bg-white text-[#c5a059] rounded-full flex items-center justify-center shadow-lg border border-stone-200"
          >
            {isPlaying ? "🔊" : "🔇"}
          </button>
        </div>
      )}
    </main>
  );
}

export default function LuxuryInvitation() {
  return (
    <Suspense fallback={null}>
      <InvitationContent />
    </Suspense>
  );
}
