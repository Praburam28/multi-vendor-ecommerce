import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import useProducts from "../hooks/useProducts";

export default function ProductGrid() {

  const {
    products,
    loading,
    error,
  } = useProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="px-10 py-12">

      <h2 className="mb-8 text-3xl font-bold">
        Featured Products
      </h2>

      <div className="grid gap-8 md:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}