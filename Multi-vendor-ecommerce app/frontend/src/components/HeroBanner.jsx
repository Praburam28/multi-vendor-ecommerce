import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-8 py-20 md:flex-row">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
            🔥 Summer Sale - Up to 50% OFF
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Shop From
            <br />
            Multiple Vendors
          </h1>

          <p className="mt-6 text-lg text-gray-100">
            Buy electronics, fashion, books, sports accessories and
            much more from trusted vendors across the marketplace.
          </p>

          <div className="mt-10 flex gap-4">

            <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition hover:scale-105">

              Shop Now

              <ArrowRight size={20} />

            </button>

            <button className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-indigo-700">

              Explore Products

            </button>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
            alt="Hero"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}