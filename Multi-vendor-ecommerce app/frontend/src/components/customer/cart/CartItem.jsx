import { Minus, Plus, Trash2 } from "lucide-react";
import { getImageUrl } from "../../../utils/image";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">

      <div className="flex items-center gap-5">

        <img
  src={getImageUrl(item.image_url)}
  alt={item.product_name}
  className="h-24 w-24 rounded-xl object-cover"
  onError={(e) => {
    e.currentTarget.src =
      "https://placehold.co/120x120?text=No+Image";
  }}
/>

        <div>

          <h2 className="text-xl font-bold">
            {item.product_name}
          </h2>

          <p className="text-gray-500">
            ₹ {item.price}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button onClick={onDecrease}>
          <Minus size={18} />
        </button>

        <span>{item.quantity}</span>

        <button onClick={onIncrease}>
          <Plus size={18} />
        </button>

      </div>

      <div className="font-bold">
        ₹ {item.subtotal}
      </div>

      <button
        onClick={onRemove}
        className="text-red-600"
      >
        <Trash2 size={20} />
      </button>

    </div>
  );
}