import { useState } from "react";

import CustomerLayout from "../layouts/customer/CustomerLayout";

import CatalogToolbar from "../components/customer/catalog/CatalogToolbar";
import CatalogFilter from "../components/customer/catalog/CatalogFilter";
import PriceFilter from "../components/customer/catalog/PriceFilter";
import Pagination from "../components/customer/catalog/Pagination";

import ProductCard from "../components/customer/product/ProductCard";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("id");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useCategories();

  // Build filters without empty values
 const filters = {
   search,
   sort,
   page,
    size: 8,
 }; 

  if (category !== "") {
    filters.category_id = Number(category);
  }

  if (minPrice !== "") {
    filters.min_price = Number(minPrice);
  }

  if (maxPrice !== "") {
    filters.max_price = Number(maxPrice);
  }


  const {
  products,
  loading,
  error,
} = useProducts(filters);

console.log("Loading:", loading);
console.log("Error:", error);
console.log("Products:", products);


  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-8 py-16 transition-all duration-300">
        <h1 className="mb-10 text-5xl font-bold text-slate-900 dark:text-white">
          Products
        </h1>

        <CatalogToolbar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        <div className="mb-10 flex flex-wrap gap-5">
          <CatalogFilter
            categories={categories}
            category={category}
            setCategory={setCategory}
          />

          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="rounded-lg bg-white p-10 text-center shadow">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No products found
                </h2>
                <p className="mt-2 text-gray-500">
                  There are currently no products available.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-10">
          <Pagination
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </CustomerLayout>
  );
}