import "./globals.css";

export const metadata = {
  title: "Undangan Walimatul Khitan",
  description: "Undangan Digital Premium - Ananda Rizky Pratama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        suppressHydrationWarning={true}
        className="bg-[#e5e7eb] flex justify-center items-start min-h-screen overflow-x-hidden"
      >
        {/* Container Utama: Portrait Mode (Max 450px) */}
        <div className="w-full max-w-[450px] min-h-screen bg-white relative shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
