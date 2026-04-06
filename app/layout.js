import localFont from "next/font/local";
import colors from "./colors/colors";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chemistry MCQ Test - SSC Exam Preparation",
  description:
    "Master Chemistry concepts with comprehensive MCQ tests designed for SSC examination success. Practice organic, inorganic, and physical chemistry questions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${colors.bg} min-h-screen w-screen`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
