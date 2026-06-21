import { useState } from "react";
    email: "",
    plan: "",
    startDate: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/members/add",
      formData
    );

    alert("Member Added Successfully");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Member</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="plan"
          placeholder="Plan"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          name="expiryDate"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="bg-black text-white px-5 py-3 rounded-lg">
          Add Member
        </button>
      </form>
    </div>
  );
}

export default AddMember;