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
  const koordinat = "-7.445232, 109.262780";
  const mapsUrl = `https://www.google.com/maps?q=${koordinat}`;
  const iframeSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3950.000000000000!2d${koordinat.split(", ")[1]}!3d${koordinat.split(", ")[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid`;

  const albumPhotos = [
    "/foto1.avif",
    "/foto2.avif",
    "/foto3.avif",
    "/foto4.avif",
  ];

  const handleCopy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Nomor rekening berhasil disalin!"));
    }
  };

  const data = {
    childName: "Rashad Hakeem Darmawan",
    parents: "Putra Bapak Fulan & Ibu Nanik Sugiarti",
    targetDate: "2026-04-20T10:00:00",
    displayDate: "Senin, 20 April 2026",
    time: "09.00 - 16.00 ",
    location: "Komplek Perumahan INALUM, Sei Suka, Batu Bara",
    wa: "628123456789",

    turutMengundang: [
      "Keluarga Besar Bpk. Fulan",
      "Keluarga Besar Ibu Fulanah",
      "Seluruh Kerabat & Sahabat",
    ],
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
          {/* SECTION 4: LOKASI & GOOGLE MAPS */}
          <div className="snap-section flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            <FullDecorations />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center justify-center"
            >
              <motion.h3
                variants={itemVariants}
                className="font-serif text-[#c5a059] text-2xl font-bold mb-4 uppercase tracking-widest"
              >
                Lokasi Acara
              </motion.h3>

              {/* Frame Peta Interaktif */}
              <motion.div
                variants={itemVariants}
                className="w-4/5 aspect-square max-w-[280px] rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-6 bg-stone-100 relative mx-auto"
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

              {/* Detail Alamat Pendek */}
              <motion.p
                variants={itemVariants}
                className="text-[12px] text-stone-500 mb-6 italic leading-relaxed px-4"
              >
                {data.location}
              </motion.p>

              {/* Tombol Navigasi */}
              <motion.a
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a365d] text-white px-10 py-3 rounded-full text-xs font-bold shadow-xl inline-block uppercase tracking-widest transition-all hover:bg-[#c5a059]"
              >
                Buka Google Maps
              </motion.a>
            </motion.div>
          </div>
          {/* SECTION 5: GALLERY FOTO */}
          <div className="snap-section flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            <FullDecorations />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center justify-center"
            >
              <motion.h3
                variants={itemVariants}
                className="font-serif text-[#c5a059] text-2xl font-bold mb-6 uppercase tracking-widest"
              >
                Galeri Foto
              </motion.h3>

              {/* Grid Foto 2x2 */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3 w-full max-w-[300px] mx-auto mb-4"
              >
                {albumPhotos.map((src, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-stone-200"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt={`Gallery ${index + 1}`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-[11px] text-stone-400 italic tracking-wider"
              >
                "Momen bahagia ananda tersayang"
              </motion.p>
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
                Tanda Kasih Terima kasih telah menambah semangat kegembiraan
                kami dengan kehadiran dan hadiah indah anda
              </motion.h4>
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center"
              >
                <p className="text-[#1a365d] font-bold text-2xl mb-3 tracking-widest">
                  3307181890299881
                </p>
                <button
                  onClick={() => handleCopy("3307181890299881")}
                  className="bg-[#c5a059] text-white px-8 py-2 rounded-full text-[10px] uppercase font-bold shadow-md"
                >
                  Salin Rekening
                </button>
                <p className="text-[11px] text-stone-400 mt-3 uppercase font-bold tracking-widest">
                  BRI : Nanik Sugiarti
                </p>
              </motion.div>
            </motion.div>
          </div>
          {/* SECTION 5: GIFT */}
          {/* SECTION 6: PENUTUP & TURUT MENGUNDANG */}
          <div className="snap-section flex flex-col items-center justify-center text-center px-8 relative overflow-hidden pt-24">
            <FullDecorations />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-30 relative w-full flex flex-col items-center justify-center"
            >
              {/* Salam Penutup */}
              <motion.p
                variants={itemVariants}
                className="font-serif italic text-stone-600 mb-4 text-sm"
              >
                Wassalamu'alaikum Wr. Wb.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-[12px] leading-relaxed text-stone-500 mb-8 px-2"
              >
                Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
                kepada putra kami.
              </motion.p>

              <motion.h4
                variants={itemVariants}
                className="font-serif text-[#c5a059] text-xl font-bold mb-6 uppercase tracking-[0.2em]"
              >
                Terima Kasih
              </motion.h4>

              {/* Turut Mengundang Box */}
              <motion.div
                variants={itemVariants}
                className="w-full max-w-[280px] p-4 border-t border-b border-[#c5a059]/30 mt-4 mb-8"
              >
                <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-3">
                  Turut Mengundang:
                </p>
                <div className="space-y-1">
                  {data.turutMengundang.map((nama, i) => (
                    <p
                      key={i}
                      className="text-[11px] text-[#1a365d] font-medium leading-tight"
                    >
                      {nama}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Logo/Inisial Penutup (Opsional) */}
              <motion.div variants={itemVariants} className="opacity-40">
                <p className="font-serif text-2xl text-[#c5a059]">R & H</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-2">
                  Rashad Hakeem
                </p>
              </motion.div>
            </motion.div>
          </div>
          {/* SECTION 5: GIFT */}
        </div>
      )}

      {/* Floating Buttons */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[400] flex flex-col gap-3">
          {/* Tombol WhatsApp dengan Icon SVG */}
          <a
            href={`https://wa.me/${data.wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* Tombol Musik */}
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              isPlaying ? audioRef.current.pause() : audioRef.current.play();
            }}
            className="w-11 h-11 bg-white text-[#c5a059] rounded-full flex items-center justify-center shadow-lg border border-stone-200 transition-transform active:scale-90"
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
