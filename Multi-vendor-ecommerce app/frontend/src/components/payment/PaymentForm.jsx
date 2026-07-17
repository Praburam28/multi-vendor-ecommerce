import { useState } from "react";

export default function PaymentForm({ total, onPay }) {

    const [method, setMethod] = useState("card");

    return (

        <div className="rounded-2xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-3xl font-bold">

                Payment

            </h2>

            <div className="space-y-3">

                <label className="flex gap-3">

                    <input
                        type="radio"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                    />

                    Credit / Debit Card

                </label>

                <label className="flex gap-3">

                    <input
                        type="radio"
                        checked={method === "upi"}
                        onChange={() => setMethod("upi")}
                    />

                    UPI

                </label>

                <label className="flex gap-3">

                    <input
                        type="radio"
                        checked={method === "netbanking"}
                        onChange={() => setMethod("netbanking")}
                    />

                    Net Banking

                </label>

                <label className="flex gap-3">

                    <input
                        type="radio"
                        checked={method === "cod"}
                        onChange={() => setMethod("cod")}
                    />

                    Cash On Delivery

                </label>

            </div>

            <div className="mt-8 space-y-4">

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Card Number"
                />

                <div className="grid grid-cols-2 gap-4">

                    <input
                        className="rounded-xl border p-3"
                        placeholder="MM/YY"
                    />

                    <input
                        className="rounded-xl border p-3"
                        placeholder="CVV"
                    />

                </div>

                <input
                    className="w-full rounded-xl border p-3"
                    placeholder="Card Holder Name"
                />

            </div>

            <button
                onClick={onPay}
                className="mt-8 w-full rounded-xl bg-green-600 py-4 text-white"
            >

                Pay ₹ {total}

            </button>

        </div>

    );

}