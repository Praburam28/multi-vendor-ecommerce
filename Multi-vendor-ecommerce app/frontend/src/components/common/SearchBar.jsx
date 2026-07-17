import { Search } from "lucide-react";

export default function SearchBar() {

  return (

    <div className="relative">

      <Search
        className="absolute left-4 top-3 text-gray-400"
        size={18}
      />

     <input
  placeholder="Search Products..."
  className="
    w-96
    rounded-full
    border
    bg-slate-50
    py-3
    pl-12
    pr-4
    outline-none
    transition-all
    focus:border-indigo-600

    dark:border-slate-700
    dark:bg-slate-800
    dark:text-white
    dark:placeholder:text-gray-400
  "
/>

    </div>

  );

}