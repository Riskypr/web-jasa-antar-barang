import "leaflet/dist/leaflet.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 transition-all duration-300">
        <div className="flex-1">
          {children} 
        </div>
        <Footer />

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
      </main>
    </div>
  );
}
