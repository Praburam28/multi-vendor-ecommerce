export default function ProductDescription({
  description,
}) {
  return (
    <section className="mt-16 rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-5 text-3xl font-bold">
        Description
      </h2>

      <p className="leading-8 text-gray-600">
        {description}
      </p>

    </section>
  );
}