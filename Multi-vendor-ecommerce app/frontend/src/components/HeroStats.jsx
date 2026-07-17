export default function HeroStats() {
  return (
    <section className="bg-white py-10 shadow">

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-indigo-600">10K+</h2>
          <p className="mt-2 text-gray-600">Products</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-indigo-600">500+</h2>
          <p className="mt-2 text-gray-600">Vendors</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-indigo-600">25K+</h2>
          <p className="mt-2 text-gray-600">Customers</p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-indigo-600">99%</h2>
          <p className="mt-2 text-gray-600">Happy Buyers</p>
        </div>

      </div>

    </section>
  );
}