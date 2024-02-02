import type { Metadata } from "next";

import Navbar from "../components/navbar";
import Footer from "../components/footer/footer";

import "@repo/ui/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "OH.STUDIO",
  description: "Test-App",
  icons: {
    icon: "fav.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
