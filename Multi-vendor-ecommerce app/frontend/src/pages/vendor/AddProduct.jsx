import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VendorLayout from "../../layouts/vendor/VendorLayout";
import { addProduct } from "../../services/vendorService";
import { uploadImage } from "../../services/uploadService";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleImageUpload(e) {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const data = await uploadImage(file);

    setPreview(`http://127.0.0.1:8000${data.image_url}`);

    setForm({
      ...form,
      image_url: data.image_url,
    });

  } catch (err) {
    console.error(err);
    alert("Image upload failed");
  } finally {
    setUploading(false);
  }
}

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await addProduct({
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        stock: Number(form.stock),
      });

      alert("Product Added Successfully");

      navigate("/vendor/products");
    } catch (err) {
      console.error(err);
      alert("Unable to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <VendorLayout>
      <h1 className="mb-8 text-3xl font-bold">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-8 shadow"
      >
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Product Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Category ID
            </label>

            <input
              type="number"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full rounded border p-3"
              required
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Image URL
          </label>

          <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="w-full rounded border p-3"
/>

{uploading && (
  <p className="mt-2 text-blue-600">
    Uploading image...
  </p>
)}

{preview && (
  <img
    src={preview}
    alt="Preview"
    className="mt-4 h-48 rounded-lg border object-cover"
  />
)}
        </div>

        <div className="mt-6">
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <button
          disabled={loading}
          className="mt-8 rounded-lg bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </VendorLayout>
  );
}