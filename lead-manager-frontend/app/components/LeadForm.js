"use client";
import { useState } from "react";

export default function LeadForm({ onLeadCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
  });

  const [errors, setErrors] = useState({});

  // 🔍 Validation function
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const res = await fetch("http://localhost:5000/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    onLeadCreated(data);
    setForm({ name: "", email: "", status: "New" });
  };

  return (
    <div className="flex flex-col gap-5 p-5 border border-[#e4e4e4] rounded-2xl mb-4 shadow-sm bg-white">
      <h2 className="text-[#282828] font-semibold text-lg">Add Lead</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        {/* Name */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-sm text-gray-600">Name</label>
          <input
            placeholder="Enter name*"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className={`bg-[#f5f5f5] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border border-red-500 focus:ring-red-400"
                : "focus:ring-[#5E3996]"
            }`}
          />

          {/* Tooltip */}
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-sm text-gray-600">Email</label>
          <input
            placeholder="Enter email*"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className={`bg-[#f5f5f5] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border border-red-500 focus:ring-red-400"
                : "focus:ring-[#5E3996]"
            }`}
          />

          {/* Tooltip */}
          {errors.email && (
            <span className="text-xs text-red-500 mt-1">
              {errors.email}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            className="bg-[#f5f5f5] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E3996]"
          >
            <option>New</option>
            <option>Engaged</option>
            <option>Proposal Sent</option>
            <option>Closed-Won</option>
            <option>Closed-Lost</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-[#5E3996] text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Add Lead
        </button>
      </form>
    </div>
  );
}