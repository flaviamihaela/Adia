import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "ADIA",
  description: "A wonderful and culture-rich experience",
  icons: {
    icon: "/images/adia.png",
  },
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
