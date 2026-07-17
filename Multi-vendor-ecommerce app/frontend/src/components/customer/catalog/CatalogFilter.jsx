export default function CatalogFilter({
  categories,
  category,
  setCategory,
}) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="rounded-xl border p-3"
    >
      <option value="">All Categories</option>

      {categories.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
}