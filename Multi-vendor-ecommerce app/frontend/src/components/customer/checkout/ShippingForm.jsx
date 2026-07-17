import { useState } from "react";

export default function ShippingForm({ onContinue }) {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onContinue(form);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl bg-white p-8 shadow"
    >
      <h2 className="text-2xl font-bold">
        Shipping Address
      </h2>

      <input
        name="fullName"
        placeholder="Full Name"
        className="w-full rounded-lg border p-3"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        className="w-full rounded-lg border p-3"
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        className="w-full rounded-lg border p-3"
        onChange={handleChange}
      />

      <input
        name="state"
        placeholder="State"
        className="w-full rounded-lg border p-3"
        onChange={handleChange}
      />

      <input
        name="pincode"
        placeholder="Pincode"
        className="w-full rounded-lg border p-3"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full rounded-lg border p-3"
        onChange={handleChange}
      />

      <button className="w-full rounded-xl bg-indigo-600 py-3 text-white">
        Continue
      </button>
    </form>
  );
}