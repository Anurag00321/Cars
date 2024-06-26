import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";
import Navbar from "../../components/navbar";
import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import { Suspense } from "react";
import LoadingComponent from "./loading";
import Footer from "../../components/footer";
import localFont from "next/font/local";
import { Rubik } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// const rubik = localFont({
//   src: '../../public/fonts/rubik/rubik-variablefont_wght.ttf',
//   display: 'swap',
// })

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata = {
  title: "CarDealer",
  description: "Best place to sell and buy cars",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currenUser = await getCurrentUser();
  return (
    <html lang="en" className={rubik.variable}>
      <body className="flex flex-col h-screen justify-between">
        <AuthContext>
          <Suspense fallback={<LoadingComponent />}>
            <Navbar currentUser={currenUser!} />
            <div className="mb-auto">{children}</div>
            <Footer />
          </Suspense>
        </AuthContext>
      </body>
    </html>
  );
}
