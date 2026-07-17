import { Mail, MapPin, Phone } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-8 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold text-indigo-600">
              MultiVendor
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
              Shop from trusted vendors across India.
              Fast delivery, secure payments and
              quality products at the best prices.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
                >
                  Wishlist
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer */}

          <div>

            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Customer Support
            </h3>

            <ul className="space-y-4">

              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Phone size={18} />
                +91 98765 43210
              </li>

              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Mail size={18} />
                support@multivendor.com
              </li>

              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin size={18} />
                Chennai, Tamil Nadu
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="rounded-full bg-indigo-600 p-3 text-white transition hover:scale-110"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-sky-500 p-3 text-white transition hover:scale-110"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-pink-600 p-3 text-white transition hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-blue-700 p-3 text-white transition hover:scale-110"
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

          </div>

        </div>

        <hr className="my-10 border-slate-300 dark:border-slate-700" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-gray-600 dark:text-gray-400">
            © 2026 MultiVendor Marketplace. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}