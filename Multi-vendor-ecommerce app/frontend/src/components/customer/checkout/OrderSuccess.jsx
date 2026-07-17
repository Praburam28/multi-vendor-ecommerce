export default function OrderSuccess({ orderId }) {
  return (
    <div className="rounded-2xl bg-green-100 p-10 text-center">

      <h1 className="text-4xl font-bold text-green-700">
        Order Placed Successfully
      </h1>

      <p className="mt-4 text-lg">
        Order ID: {orderId}
      </p>

    </div>
  );
}