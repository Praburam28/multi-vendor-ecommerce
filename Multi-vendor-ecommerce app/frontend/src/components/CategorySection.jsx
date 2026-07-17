import {
  Smartphone,
  Shirt,
  BookOpen,
  House,
  Dumbbell,
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Books", icon: BookOpen },
  { name: "Home", icon: House },
  { name: "Sports", icon: Dumbbell },
];

export default function CategorySection() {
  return (
    <section className="px-10 py-12">
      <h2 className="text-3xl font-bold mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 flex flex-col items-center cursor-pointer"
          >
            <cat.icon size={40} />

            <p className="mt-4 font-semibold">
              {cat.name}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}