export default function CardPayment({
  total,
  onPay,
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">

        Card Details

      </h2>

      <input
        placeholder="Card Number"
        className="mb-4 w-full rounded-xl border p-3"
      />

      <div className="grid grid-cols-2 gap-4">

        <input
          placeholder="MM/YY"
          className="rounded-xl border p-3"
        />

        <input
          placeholder="CVV"
          className="rounded-xl border p-3"
        />

      </div>

      <input
        placeholder="Card Holder Name"
        className="mt-4 w-full rounded-xl border p-3"
      />

      <button
        onClick={onPay}
        className="mt-8 w-full rounded-xl bg-green-600 py-4 text-white hover:bg-green-700"
      >
        Pay ₹ {total}
      </button>

    </div>
  );
}