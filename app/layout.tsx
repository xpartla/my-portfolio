import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ReactNode} from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
        <body>
          <Header />
          <main className={"container mt-4"}>{children}</main>
          <Footer />
        </body>
      </html>
  )
}
