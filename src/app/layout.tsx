import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "ADIA",
  description: "A wonderful and culture-rich experience",
  icons: {
    icon: [
      { url: "/images/adia.png", type: "image/png" },
      { url: "/images/adia.png", sizes: "32x32", type: "image/png" },
      { url: "/images/adia.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/adia.png",
    shortcut: "/images/adia.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageLoader />
        <LenisProvider>
          {children}
          <div className="noise" />
        </LenisProvider>
      </body>
    </html>
  );
}
