import { useParams } from "react-router-dom";

import CustomerLayout from "../layouts/customer/CustomerLayout";

import ProductGallery from "../components/customer/details/ProductGallery";
import ProductInfo from "../components/customer/details/ProductInfo";
import ProductDescription from "../components/customer/details/ProductDescription";
import ProductReviews from "../components/customer/details/ProductReviews";
import RelatedProducts from "../components/customer/details/RelatedProducts";

import useProduct from "../hooks/useProduct";

import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductDetails() {

  const { id } = useParams();

  const {
    product,
    loading,
  } = useProduct(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <CustomerLayout>

      <div className="mx-auto max-w-7xl px-8 py-16">

        <div className="grid gap-16 md:grid-cols-2">

          <ProductGallery
            image={product.image_url}
          />

          <ProductInfo
            product={product}
          />

        </div>

        <ProductDescription
          description={product.description}
        />

        <ProductReviews />

        <RelatedProducts />

      </div>

    </CustomerLayout>
  );
}