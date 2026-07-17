export default function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) {
  return (
    <div className="flex gap-3">

      <input
        type="number"
        value={minPrice}
        placeholder="Min"
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-28 rounded-lg border p-2"
      />

      <input
        type="number"
        value={maxPrice}
        placeholder="Max"
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-28 rounded-lg border p-2"
      />

    </div>
  );
}