import { Search } from "lucide-react";

export default function CatalogToolbar({
  search,
  setSearch,
  sort,
  setSort,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:w-96">

        <Search
          size={18}
          className="absolute left-4 top-3 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-xl border p-3"
      >
        <option value="id">Newest</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

    </div>
  );
}