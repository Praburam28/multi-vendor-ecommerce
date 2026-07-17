import { Pencil, Trash2 } from "lucide-react";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-3">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />
              </td>

              <td className="px-4 py-3">{product.name}</td>

              <td className="px-4 py-3">₹ {product.price}</td>

              <td className="px-4 py-3">{product.stock}</td>

              <td className="flex justify-center gap-3 px-4 py-3">
                <button
                  onClick={() => onEdit(product)}
                  className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(product.id)}
                  className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="py-10 text-center text-gray-500"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}