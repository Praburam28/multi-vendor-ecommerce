const steps = [
  "Pending",
  "Paid",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderTimeline({ status }) {
  const current = steps.indexOf(status);

  return (
    <div className="mt-6 flex justify-between">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex flex-col items-center"
        >
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
              index <= current
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>

          <p className="mt-2 text-sm text-center">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}