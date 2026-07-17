export default function ProductReviews() {
  return (
    <section className="mt-16 rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-8 text-3xl font-bold">
        Customer Reviews
      </h2>

      <div className="space-y-6">

        <div className="rounded-xl border p-5">

          ⭐⭐⭐⭐⭐

          <p className="mt-3">
            Excellent Product.
          </p>

        </div>

        <div className="rounded-xl border p-5">

          ⭐⭐⭐⭐☆

          <p className="mt-3">
            Worth Buying.
          </p>

        </div>

      </div>

    </section>
  );
}