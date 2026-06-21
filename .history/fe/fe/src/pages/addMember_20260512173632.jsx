import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AddMember() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plan: "",
    startDate: "",
    expiryDate: "",
    paymentAmount: "",
    paymentStatus: "Paid",
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
        paymentAmount: "",
        paymentStatus: "Paid",
      });

    } catch (error) {

      console.log(error);

      alert("Error adding member");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full flex items-center justify-center p-10">

        <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">

          <h1 className="text-5xl font-black mb-10 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Add Member
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
            />

            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
              required
            >

              <option value="">
                Select Plan
              </option>

              <option value="1 Month">
                1 Month
              </option>

              <option value="3 Months">
                3 Months
              </option>

              <option value="6 Months">
                6 Months
              </option>

              <option value="1 Year">
                1 Year
              </option>

            </select>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="text-gray-400 block mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
                  required
                />

              </div>

              <div>

                <label className="text-gray-400 block mb-2">
                  Expiry Date
                </label>

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
                  required
                />

              </div>

            </div>

            <input
              type="number"
              name="paymentAmount"
              placeholder="Payment Amount"
              value={formData.paymentAmount}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
            />

            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl outline-none"
            >

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>

            </select>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-2xl"
            >
              Add Member
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddMember;