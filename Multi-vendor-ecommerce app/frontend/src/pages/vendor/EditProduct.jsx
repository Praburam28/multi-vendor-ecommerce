import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VendorLayout from "../../layouts/vendor/VendorLayout";
import {
  getProduct,
  updateProduct,
} from "../../services/vendorService";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const product = await getProduct(id);

      setForm({
        category_id: product.category_id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image_url: product.image_url,
      });
    } catch (err) {
      console.error(err);
      alert("Unable to load product");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateProduct(id, {
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        stock: Number(form.stock),
      });

      alert("Product Updated Successfully");
      navigate("/vendor/products");
    } catch (err) {
      console.error(err);
      alert("Unable to update product");
    }
  }

  if (loading) {
    return (
      <VendorLayout>
        <p>Loading...</p>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-8 shadow"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block">Product Name</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block">Category ID</label>

            <input
              type="number"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block">Price</label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block">Stock</label>

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full rounded border p-3"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block">Image URL</label>

          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block">Description</label>

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <button
          className="mt-8 rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </VendorLayout>
  );
}