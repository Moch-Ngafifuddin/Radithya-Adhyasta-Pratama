"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Komponen Dekorasi Multi-Layer ---
const FullDecorations = () => (
  <>
    <div className="islamic-bg" />
    <motion.img
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 0.9, y: 0 }}
      src="/top-corner.png"
      className="decor-static-top pointer-events-none"
      alt="Frame"
    />
    <div className="ornament-container-top pointer-events-none">
      <img
        src="/bottom-corner.png"
        className="spinning-ornament spin-cw offset-left"
        alt="TL"
      />
      <img
        src="/bottom-corner.png"
        className="spinning-ornament spin-cw offset-right"
        alt="TR"
      />
    </div>
    <div className="ornament-container-bottom pointer-events-none">
      <img
        src="/bottom-corner.png"
        className="spinning-ornament spin-ccw offset-left"
        alt="BL"
      />
      <img
        src="/bottom-corner.png"
        className="spinning-ornament spin-ccw offset-right"
        alt="BR"
      />
    </div>
  </>
);

// --- Animasi Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
      className="flex gap-2 justify-center z-30 relative mt-4 scale-90"
    >
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="bg-[#c5a059] text-white p-2 rounded-xl min-w-[60px] text-center shadow-md border border-white/20"
        >
          <div className="text-lg font-bold font-serif">{value}</div>
          <div className="text-[9px] uppercase tracking-tighter">{label}</div>
        </div>
      ))}
    </motion.div>
  );
};

const Slideshow = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti gambar setiap 3 detik
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Slide ${index}`}
        />
      </AnimatePresence>

      {/* Indikator Titik (Dots) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-40">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${i === index ? "w-4 bg-white" : "w-1 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

function InvitationContent() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("to") || "Nama Tamu";
  const guestName = rawName.replace(/[+-]/g, " ");

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const data = {
    childName: "Radithya Adhyasta Pratama",
    parents: "Putra Bapak Rokhmat Priyoko & Ibu Nanik Sugianti",
    targetDate: "2026-04-20T10:00:00",
    location: "Desa Tambaksari Kidul, RT 03 RW 03, Kec.Kembaran, Kab.Banyumas",
    rekening: "0625817659",
    wa: "6283120772552",
    turutMengundang: [
      "Keluarga Karpan Hadi Muhyanto ( Alm ) & Mukinah",
      "Keluarga Masngud & Suci Winarni",
    ],
  };

  // Koordinat Presisi: Tambaksari Kidul, Kembaran, Banyumas
  const lat = "-7.3926183";
  const lng = "109.266245";

  // URL Tombol: Menggunakan format ?q= agar memunculkan PIN MERAH di titik koordinat
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  // URL Iframe: Menggunakan format Embed murni berbasis koordinat
  const iframeSrc = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3956.123!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjUnNDMuNyJTIDEwOcKwMTYnMzkuOCJF!5e0!3m2!1sid!2sid!4v1711500000000!5m2!1sid!2sid`;
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Nomor rekening berhasil disalin!"));
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.play();
  };

  return (
    <main className="max-w-md mx-auto shadow-2xl relative bg-[#fdfcf9] overflow-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence>
        {!isOpen && (
          <motion.section
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-[500] bg-[#fdfcf9] flex flex-col items-center justify-center text-center p-8 overflow-hidden"
          >
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="z-30"
            >
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-[#c5a059] text-lg mb-2"
              >
                Undangan
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="font-serif text-2xl text-[#c5a059] font-bold tracking-[0.2em] mb-8 uppercase"
              >
                Tasyakuran Khitan
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="w-48 h-48 rounded-full border-4 border-[#c5a059] overflow-hidden mx-auto mb-8 shadow-xl"
              >
                <img
                  src="/hero.png"
                  className="w-full h-full object-cover"
                  alt="Hero"
                />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-serif text-[#1a365d] font-bold mb-6 px-4 leading-tight"
              >
                {data.childName}
              </motion.h2>
              <div className="mb-8 text-stone-500">
                <p className="text-xs italic mb-1 text-center">Kepada Yth;</p>
                <p className="text-xl font-serif text-[#c5a059] font-bold text-center">
                  {guestName}
                </p>
              </div>
              <motion.button
                variants={itemVariants}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpen}
                className="bg-[#1a365d] text-white px-10 py-3 rounded-full text-xs uppercase tracking-widest font-bold shadow-lg"
              >
                Buka Undangan
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="snap-container">
          {/* SECTION 1: PROFIL */}
          <section className="snap-section flex flex-col items-center justify-center px-8 text-center">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-10 relative"
            >
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-stone-600 mb-2 uppercase text-xs text-center"
              >
                Assalamu'alaikum Wr Wb
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-[12px] text-stone-500 mb-6 px-4 leading-relaxed text-center"
              >
                Tanpa mengurangi rasa hormat kami bermaksud mengundang
                Bapak/Ibu/Saudara/i pada acara syukuran khitan anak kami:
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="w-40 h-48 arch-frame overflow-hidden border-2 border-[#c5a059] mx-auto mb-4 shadow-lg"
              >
                <img
                  src="/hero.png"
                  className="w-full h-full object-cover"
                  alt="Anak"
                />
              </motion.div>
              <motion.h3
                variants={itemVariants}
                className="text-xl font-serif text-[#c5a059] font-bold mb-1"
              >
                {data.childName}
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-[11px] font-serif italic text-[#1a365d] font-bold"
              >
                {data.parents}
              </motion.p>
            </motion.div>
          </section>

          {/* SECTION 2: EVENT */}
          <section className="snap-section flex flex-col items-center justify-center px-6 text-center">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center"
            >
              <motion.h1
                variants={itemVariants}
                className="font-serif text-xl text-[#c5a059] font-bold tracking-[0.15em] mb-5 uppercase text-center"
              >
                Waktu Pelaksanaan
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-md py-6 px-7 rounded-[2rem] border border-[#c5a059]/30 shadow-sm w-full max-w-[280px] relative overflow-hidden"
              >
                <div className="absolute inset-2 border border-[#c5a059]/10 rounded-[1.6rem] pointer-events-none"></div>
                <div className="relative z-10 space-y-3">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-0.5">
                      Hari
                    </span>
                    <span className="text-base font-serif font-bold text-[#1a365d]">
                      Senin & Selasa
                    </span>
                  </div>
                  <div className="w-10 h-[0.5px] bg-[#c5a059]/20 mx-auto"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-0.5">
                      Tanggal
                    </span>
                    <span className="text-base font-serif font-bold text-[#1a365d]">
                      20 & 21 April 2026
                    </span>
                  </div>
                  <div className="w-10 h-[0.5px] bg-[#c5a059]/20 mx-auto"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-bold mb-0.5">
                      Waktu
                    </span>
                    <span className="text-base font-serif font-bold text-[#1a365d]">
                      08.00 - Selesai
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="text-[9px] text-stone-400 italic mt-4 mb-2 px-6 leading-tight max-w-[240px] text-center"
              >
                📍 {data.location}
              </motion.p>
              <div className="transform scale-[0.85] origin-top">
                <CountdownTimer targetDate={data.targetDate} />
              </div>
            </motion.div>
          </section>

          {/* SECTION 3: MAPS */}
          <section className="snap-section flex flex-col items-center justify-center px-8 text-center">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center"
            >
              <motion.h3
                variants={itemVariants}
                className="font-serif text-[#c5a059] text-xl font-bold mb-4 uppercase tracking-widest"
              >
                Lokasi Acara
              </motion.h3>
              <motion.div
                variants={itemVariants}
                className="w-full aspect-square max-w-[250px] rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-6 mx-auto relative"
              >
                <iframe
                  src={iframeSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </motion.div>
              <motion.a
                variants={itemVariants}
                href={mapsUrl}
                target="_blank"
                className="bg-[#1a365d] text-white px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
              >
                Buka Google Maps
              </motion.a>
            </motion.div>
          </section>

          {/* SECTION 4: GALLERY (Auto Slideshow Version) */}
          <section className="snap-section flex flex-col items-center justify-center px-8 text-center relative overflow-hidden">
            <FullDecorations />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center"
            >
              <motion.h3
                variants={itemVariants}
                className="font-serif text-[#c5a059] text-xl font-bold mb-8 uppercase tracking-widest"
              >
                Galeri Foto
              </motion.h3>

              {/* Slideshow Container */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-[280px] aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-stone-100"
              >
                <Slideshow
                  images={[
                    "/foto1.png",
                    "/foto2.png",
                    "/foto3.png",
                    "/foto4.png",
                    "/foto5.jpeg",
                  ]}
                />
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-[10px] text-stone-400 italic mt-6 tracking-wide"
              >
                "Momen bahagia ananda tersayang"
              </motion.p>
            </motion.div>
          </section>

          {/* SECTION: DOA & HARAPAN (NEW) */}
          <section className="snap-section flex flex-col items-center justify-center px-10 text-center relative overflow-hidden">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center"
            >
              {/* Ornamen Pembuka Doa */}
              <motion.div variants={itemVariants} className="mb-6 opacity-60">
                <span className="text-2xl text-[#c5a059]">✨</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/40 backdrop-blur-sm p-6 rounded-[2.5rem] border-x border-[#c5a059]/20 relative"
              >
                <motion.p
                  className="font-serif italic text-[#1a365d] text-[13px] leading-loose tracking-wide"
                  variants={itemVariants}
                >
                  "Ya Allah, muliakanlah putra kami ini, panjangkanlah umurnya,
                  terangilah hatinya, teguhkanlah imannya, perbaikilah amal
                  perbuatannya, dan lapangkanlah rezekinya. Jadikanlah ia anak
                  yang sholeh dan berbakti kepada kedua orang tua, agama, serta
                  bangsa."
                </motion.p>
              </motion.div>

              {/* Amin / Penutup Doa */}
              <motion.p
                variants={itemVariants}
                className="mt-6 font-serif text-[#c5a059] font-bold tracking-[0.3em] text-[10px] uppercase"
              >
                — Aamiin Ya Rabbal Alamin —
              </motion.p>
            </motion.div>
          </section>

          {/* SECTION 6: CLOSING */}
          <section className="snap-section flex flex-col items-center justify-center px-8 text-center">
            <FullDecorations />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full pt-10"
            >
              <motion.p
                variants={itemVariants}
                className="text-[11px] text-stone-500 mb-6 px-4 leading-relaxed text-center"
              >
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
                kepada putra kami. Atas kehadiran dan doa restunya, kami ucapkan
                terima kasih.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-stone-600 mb-3 text-xs uppercase text-center"
              >
                Wassalamu'alaikum Wr. Wb.
              </motion.p>
              <motion.h4
                variants={itemVariants}
                className="font-serif text-[#c5a059] text-xl font-bold mb-6 tracking-widest uppercase text-center"
              >
                {/* Terima Kasih */}
              </motion.h4>
              <motion.div
                variants={itemVariants}
                className="w-full max-w-[260px] p-4 border-y border-[#c5a059]/30 mx-auto mb-6"
              >
                <p className="text-[9px] uppercase tracking-widest text-[#c5a059] font-bold mb-2 text-center">
                  Turut Mengundang:
                </p>
                <div className="space-y-1">
                  {data.turutMengundang.map((n, i) => (
                    <p
                      key={i}
                      className="text-[10px] text-[#1a365d] font-medium leading-tight text-center"
                    >
                      {n}
                    </p>
                  ))}
                </div>
              </motion.div>
              <div className="opacity-30">
                {/* <p className="font-serif text-2xl text-[#c5a059] text-center">
                  R & H
                </p> */}
              </div>
            </motion.div>
          </section>
        </div>
      )}

      {/* Floating Buttons */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[400] flex flex-col gap-3">
          <a
            href={`https://wa.me/${data.wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
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
