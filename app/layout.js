import "./globals.css";

// 1. Deklarasi Metadata (Hanya Boleh Satu)
export const metadata = {
  title: "Tasyakuran Khitan Radithya Adhyasta Pratama",
  description: "Senin - Selasa, 20 - 21 April 2026",
  openGraph: {
    title: "Tasyakuran Khitan Radithya Adhyasta Pratama",
    description: "Senin - Selasa, 20 - 21 April 2026",
    url: "https://radithya-adhyasta-pratama.vercel.app/",
    siteName: "Undangan Digital Radithya",
    images: [
      {
        url: "/og-image.png", // Pastikan file ini ada di folder public/og-image.png
        width: 1200,
        height: 630,
        alt: "Undangan Radithya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

// 2. Deklarasi RootLayout (Hanya Boleh Satu)
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        suppressHydrationWarning={true}
        className="bg-[#e5e7eb] flex justify-center items-start min-h-screen overflow-x-hidden"
      >
        {/* Container Utama: Portrait Mode (Max 450px) agar tampilan di laptop tetap rapi seperti HP */}
        <div className="w-full max-w-[450px] min-h-screen bg-white relative shadow-[0_0_50px_rgba(0,0,0,0.1)] overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
