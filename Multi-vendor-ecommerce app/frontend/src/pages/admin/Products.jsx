import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/admin/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/adminProductService";

export default function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {

    const data = await getAllProducts();

    setProducts(data);

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete Product?")) {
      return;
    }

    await deleteProduct(id);

    loadProducts();

  }

  return (

    <AdminLayout>

      <h1 className="mb-8 text-4xl font-bold dark:text-white">

        Product Management

      </h1>

      <ProductTable
        products={products}
        onDelete={handleDelete}
      />

    </AdminLayout>

  );
}