export default function PaymentMethods({
  method,
  setMethod,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Payment Method
      </h2>

      <div className="space-y-4">

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

    </div>
  );
}