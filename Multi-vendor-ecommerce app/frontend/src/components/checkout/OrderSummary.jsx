export default function OrderSummary({ cart, onCheckout }) {

    return (

        <div className="rounded-2xl bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-bold">
                Order Summary
            </h2>

            {

                cart.items.map(item => (

                    <div
                        key={item.cart_item_id}
                        className="mb-4 flex justify-between"
                    >

                        <span>
                            {item.product_name}
                        </span>

                        <span>
                            ₹ {item.subtotal}
                        </span>

                    </div>

                ))

            }

            <hr className="my-5" />

            <div className="flex justify-between">

                <span>
                    Total
                </span>

                <span className="font-bold">
                    ₹ {cart.total}
                </span>

            </div>

            <button
                onClick={onCheckout}
                className="mt-8 w-full rounded-xl bg-green-600 py-4 text-white"
            >
                Place Order
            </button>

        </div>

    );

}