import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Poppins, Cormorant_Garamond} from "next/font/google"
import {ReactNode} from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    variable: "--font-poppins",
});

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-cormorant-garamond",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en" className={`${poppins.variable} ${cormorantGaramond.variable}`}>
        <body className="text-white bg-black">
            <Header />
            <main className={"container mt-4"}>{children}</main>
            <Footer />
        </body>
      </html>
  )
}
