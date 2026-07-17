import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-8 py-24 md:flex-row">

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-white"
        >

          <span className="rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">

            🔥 Biggest Sale of the Year

          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">

            Discover

            <br />

            Amazing Products

          </h1>

          <p className="mt-8 text-xl text-slate-200">

            Shop electronics, fashion, books,
            sports and much more from trusted vendors.

          </p>

          <div className="mt-10 flex gap-5">

            <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-700">

              Shop Now

              <ArrowRight size={18} />

            </button>

            <button className="rounded-xl border border-white px-8 py-4">

              Learn More

            </button>

          </div>

        </motion.div>

        <motion.img

          initial={{ x: 100, opacity: 0 }}

          animate={{ x: 0, opacity: 1 }}

          transition={{ duration: 1 }}

          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"

          className="mt-10 w-full max-w-lg rounded-3xl shadow-2xl md:mt-0"

        />

      </div>

    </section>
  );
}