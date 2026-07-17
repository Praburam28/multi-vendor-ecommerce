export default function StatsSection() {
  const stats = [
    { title: "Products", value: "10,000+" },
    { title: "Vendors", value: "500+" },
    { title: "Customers", value: "25K+" },
    { title: "Orders", value: "1 Million+" },
  ];

  return (
    <section className="bg-white py-12">

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="text-center"
          >

            <h1 className="text-5xl font-bold text-indigo-600">

              {item.value}

            </h1>

            <p className="mt-3 text-gray-600">

              {item.title}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}