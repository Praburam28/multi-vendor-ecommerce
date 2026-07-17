export default function CartSummary({

    total

}) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">

                Order Summary

            </h2>

            <div className="flex justify-between">

                <span>Subtotal</span>

                <span>

                    ₹ {total}

                </span>

            </div>

            <div className="mt-3 flex justify-between">

                <span>Shipping</span>

                <span className="text-green-600">

                    FREE

                </span>

            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span>

                    ₹ {total}

                </span>

            </div>

            <button className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-white">

                Proceed To Checkout

            </button>

        </div>

    );

}