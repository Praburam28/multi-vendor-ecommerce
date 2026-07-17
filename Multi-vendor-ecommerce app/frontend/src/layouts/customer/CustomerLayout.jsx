import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-all duration-300 dark:bg-slate-950 dark:text-white">

      <Navbar />

      <main className="min-h-[80vh]">
        {children}
      </main>

      <Footer />

    </div>
  );
}