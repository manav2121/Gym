import { useState } from "react";
import axios from "axios";

function AddMember() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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

    try {

      await axios.post(
        "http://localhost:5000/api/members/add",
        formData
      );

      alert("Member Added Successfully");

      setFormData({
        name: "",
        phone: "",
        email: "",
        plan: "",
        startDate: "",
        expiryDate: "",
      });

    } catch (error) {
      console.log(error);
      alert("Error adding member");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Member
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="plan"
            placeholder="Plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Add Member
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddMember;