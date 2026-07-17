import { useState } from "react";

export default function ShippingForm({ onSubmit }) {

    const [address, setAddress] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        onSubmit(address);
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
                className="w-full rounded-lg border p-3"
                placeholder="Full Name"
                name="fullName"
                onChange={handleChange}
            />

            <input
                className="w-full rounded-lg border p-3"
                placeholder="Address"
                name="address"
                onChange={handleChange}
            />

            <input
                className="w-full rounded-lg border p-3"
                placeholder="City"
                name="city"
                onChange={handleChange}
            />

            <input
                className="w-full rounded-lg border p-3"
                placeholder="State"
                name="state"
                onChange={handleChange}
            />

            <input
                className="w-full rounded-lg border p-3"
                placeholder="Pincode"
                name="pincode"
                onChange={handleChange}
            />

            <input
                className="w-full rounded-lg border p-3"
                placeholder="Phone Number"
                name="phone"
                onChange={handleChange}
            />

            <button className="w-full rounded-xl bg-indigo-600 py-4 text-white">
                Continue
            </button>

        </form>

    );

}