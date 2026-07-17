import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import VendorLayout from "../../layouts/vendor/VendorLayout";
import ProductTable from "../../components/vendor/ProductTable";

import {
  getVendorProducts,
  deleteProduct,
} from "../../services/vendorService";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const data = await getVendorProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <VendorLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Products
        </h2>

        <Link
          to="/vendor/products/add"
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Add Product
        </Link>
      </div>

      <ProductTable
        products={products}
        onEdit={(product) =>
          navigate(`/vendor/products/edit/${product.id}`)
        }
        onDelete={handleDelete}
      />
    </VendorLayout>
  );
}