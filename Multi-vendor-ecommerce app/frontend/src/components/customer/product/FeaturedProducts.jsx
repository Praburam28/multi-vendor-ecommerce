import useProducts from "../../../hooks/useProducts";

import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

import LoadingSpinner from "../../LoadingSpinner";
import ErrorMessage from "../../ErrorMessage";

export default function FeaturedProducts() {
  const {
    products,
    loading,
    error,
  } = useProducts();

  return (
    <section className="bg-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-8">

        <SectionTitle
          title="Featured Products"
          subtitle="Discover our latest and most popular products"
        />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}