import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Bell,
  Menu,
} from "lucide-react";

import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import Logo from "./Logo";

export default function Navbar() {

  return (

    <header className="sticky top-0 z-50 bg-white shadow">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Logo />

        <div className="hidden lg:block">

          <SearchBar />

        </div>

        <nav className="hidden gap-8 lg:flex">

          <Link to="/">Home</Link>

          <Link to="/">Products</Link>

          <Link to="/">Categories</Link>

          <Link to="/products">Products</Link>


        </nav>

        <div className="flex items-center gap-5">

          <Heart
            className="cursor-pointer"
            size={22}
          />

          <div className="relative">

            <ShoppingCart
              className="cursor-pointer"
              size={22}
            />

            <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1 text-xs text-white">

              0

            </span>

          </div>

          <Bell
            className="cursor-pointer"
            size={22}
          />

          <ProfileMenu />

          <Menu
            className="cursor-pointer lg:hidden"
            size={25}
          />

        </div>

      </div>

    </header>

  );

}