import generateReceipt
from "../utils/generateReceipt";

import { useEffect, useState }
from "react";
import API_URL from "../config/api";
import axios from "axios";

import jsPDF from "jspdf";

import autoTable
from "jspdf-autotable";

import Sidebar
from "../components/Sidebar";

function AddMember({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [pricing, setPricing] =
    useState({});

  const [formData, setFormData] =
    useState({

      name: "",
      phone: "",
      email: "",
      plan: "",
      startDate: "",
      expiryDate: "",
      paymentAmount: "",
      paymentStatus: "Paid",

    });

  useEffect(() => {

    fetchPricing();

  }, []);

  const fetchPricing =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `${API_URL}/api/settings`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setPricing(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    let updatedData = {

      ...formData,

      [name]: value,

    };

    // AUTO PRICE
    if (name === "plan") {

      if (value === "1 Month") {

        updatedData.paymentAmount =
          pricing.oneMonthPrice || "";
      }

      else if (
        value === "3 Months"
      ) {

        updatedData.paymentAmount =
          pricing.threeMonthPrice || "";
      }

      else if (
        value === "6 Months"
      ) {

        updatedData.paymentAmount =
          pricing.sixMonthPrice || "";
      }

      else if (
        value === "1 Year"
      ) {

        updatedData.paymentAmount =
          pricing.oneYearPrice || "";
      }
    }

    // AUTO EXPIRY DATE
    if (
      name === "startDate" ||
      name === "plan"
    ) {

      const start =
        new Date(
          name === "startDate"
            ? value
            : updatedData.startDate
        );

      if (
        updatedData.plan &&
        updatedData.startDate
      ) {

        let expiry =
          new Date(start);

        if (
          updatedData.plan
          === "1 Month"
        ) {

          expiry.setMonth(
            expiry.getMonth() + 1
          );
        }

        else if (
          updatedData.plan
          === "3 Months"
        ) {

          expiry.setMonth(
            expiry.getMonth() + 3
          );
        }

        else if (
          updatedData.plan
          === "6 Months"
        ) {

          expiry.setMonth(
            expiry.getMonth() + 6
          );
        }

        else if (
          updatedData.plan
          === "1 Year"
        ) {

          expiry.setFullYear(
            expiry.getFullYear() + 1
          );
        }

        updatedData.expiryDate =
          expiry
          .toISOString()
          .split("T")[0];
      }
    }

    setFormData(updatedData);
  };

  

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        `${API_URL}/api/members/add`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      generateReceipt({

  memberName: formData.name,

  plan: formData.plan,

  amount: Number(
    formData.paymentAmount
  ),

  paymentStatus:
    formData.paymentStatus ||
    "Paid",

  paymentDate:
    new Date(),

});

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="min-h-screen bg-[#f4f4f5] text-zinc-900">

      <Sidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      <div className="w-full px-8 pt-16 pb-10">

        <div className="max-w-4xl mx-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">

              Add Member

            </h1>

            <p className="text-zinc-500 mt-2 text-lg">

              Register a new gym member

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-medium text-zinc-600 mb-3">

                  Member Name

                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter member name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-zinc-600 mb-3">

                  Phone Number

                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium text-zinc-600 mb-3">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-medium text-zinc-600 mb-3">

                  Membership Plan

                </label>

                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300"
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

              </div>

              <div>

                <label className="block text-sm font-medium text-zinc-600 mb-3">

                  Payment Status

                </label>

                <select
                  name="paymentStatus"
                  value={
                    formData.paymentStatus
                  }
                  onChange={handleChange}
                  className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300"
                >

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-medium text-zinc-600 mb-3">

                  Start Date

                </label>

                <input
                  type="date"
                  name="startDate"
                  value={
                    formData.startDate
                  }
                  onChange={handleChange}
                  className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-zinc-600 mb-3">

                  Expiry Date

                </label>

                <input
                  type="date"
                  name="expiryDate"
                  value={
                    formData.expiryDate
                  }
                  readOnly
                  className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium text-zinc-600 mb-3">

                Payment Amount

              </label>

              <input
                type="number"
                name="paymentAmount"
                value={
                  formData.paymentAmount
                }
                readOnly
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-black text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
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