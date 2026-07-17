import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import SearchBar from "../common/SearchBar";

export default function Navbar() {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <Link
          to="/"
          className="text-3xl font-bold text-indigo-600"
        >
          MultiVendor
        </Link>

        <SearchBar />

        <nav className="hidden items-center gap-8 lg:flex">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-indigo-600"
                : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:text-gray-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-indigo-600"
                : "text-gray-700 hover:text-indigo-600 dark:text-gray-300"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/products"
            className="text-gray-700 hover:text-indigo-600 dark:text-gray-300"
          >
            Categories
          </NavLink>

        </nav>

        <div className="flex items-center gap-5">

          <Link
            to="/wishlist"
            title="Wishlist"
          >
            <Heart className="cursor-pointer hover:text-red-500 dark:text-white" />
          </Link>

          <Link
            to="/cart"
            title="Cart"
          >
            <ShoppingCart className="cursor-pointer hover:text-indigo-600 dark:text-white" />
          </Link>

          <button
            type="button"
            title="Toggle Theme"
            onClick={toggleTheme}
          >
            {darkMode ? (
              <Sun className="cursor-pointer text-yellow-400" />
            ) : (
              <Moon className="cursor-pointer hover:text-yellow-500" />
            )}
          </button>

          <Link
            to="/login"
            title="Login"
          >
            <User className="cursor-pointer hover:text-indigo-600 dark:text-white" />
          </Link>

        </div>

      </div>
    </header>
  );
}