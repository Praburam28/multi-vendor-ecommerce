import {
    Minus,
    Plus,
    Trash2
} from "lucide-react";

export default function CartItem({

    item,

    onIncrease,

    onDecrease,

    onRemove

}) {

    return (

        <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow">

            <div className="flex items-center gap-5">

                <img

                    src="https://placehold.co/150x150"

                    className="h-28 w-28 rounded-xl"

                />

                <div>

                    <h2 className="text-xl font-bold">

                        {item.product}

                    </h2>

                    <p className="mt-2">

                        ₹ {item.price}

                    </p>

                </div>

            </div>

            <div className="flex items-center gap-3">

                <button onClick={onDecrease}>

                    <Minus />

                </button>

                <span>

                    {item.quantity}

                </span>

                <button onClick={onIncrease}>

                    <Plus />

                </button>

            </div>

            <h2 className="text-xl font-bold">

                ₹ {item.subtotal}

            </h2>

            <button

                onClick={onRemove}

                className="text-red-600"

            >

                <Trash2 />

            </button>

        </div>

    );

}