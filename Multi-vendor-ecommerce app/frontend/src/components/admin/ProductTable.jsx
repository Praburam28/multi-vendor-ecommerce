import { Trash2 } from "lucide-react";

export default function ProductTable({
  products,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow">

      <table className="min-w-full">

        <thead className="bg-indigo-600 text-white">

          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-b dark:border-slate-700"
            >

              <td className="px-4 py-3">

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-16 w-16 rounded object-cover"
                />

              </td>

              <td className="px-4 py-3 dark:text-white">
                {product.name}
              </td>

              <td className="px-4 py-3 dark:text-white">
                ₹ {product.price}
              </td>

              <td className="px-4 py-3 dark:text-white">
                {product.stock}
              </td>

              <td className="text-center">

                <button
                  onClick={() => onDelete(product.id)}
                  className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}