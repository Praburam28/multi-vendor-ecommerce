export default function VendorOrderTable({
  orders,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow">

      <table className="min-w-full">

        <thead className="bg-indigo-600 text-white">

          <tr>

            <th className="px-4 py-3">
              Order
            </th>

            <th className="px-4 py-3">
              Customer
            </th>

            <th className="px-4 py-3">
              Amount
            </th>

            <th className="px-4 py-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr
              key={order.id}
              className="border-b dark:border-slate-700"
            >

              <td className="px-4 py-4 dark:text-white">
                #{order.id}
              </td>

              <td className="px-4 py-4 dark:text-white">
                Customer
              </td>

              <td className="px-4 py-4 dark:text-white">
                ₹{order.total_amount}
              </td>

              <td className="px-4 py-4">

                <span className="rounded-full bg-green-100 px-3 py-1">
                  {order.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}