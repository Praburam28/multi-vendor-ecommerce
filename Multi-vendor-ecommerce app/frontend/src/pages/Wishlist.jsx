import CustomerLayout from "../layouts/customer/CustomerLayout";

export default function Wishlist() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-8 py-16">
        <h1 className="text-5xl font-bold">
          Wishlist
        </h1>

        <div className="mt-8 rounded-xl bg-white p-10 shadow">
          <p className="text-gray-600">
            Your wishlist is empty.
          </p>
        </div>
      </div>
    </CustomerLayout>
  );
}