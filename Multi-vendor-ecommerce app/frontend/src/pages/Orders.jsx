import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Orders() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-8 text-4xl font-bold">
            My Orders
          </h1>

          <div className="rounded-2xl bg-white p-10 shadow">

            <h2 className="text-2xl font-semibold">
              No Orders Found
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't placed any orders yet.
            </p>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}