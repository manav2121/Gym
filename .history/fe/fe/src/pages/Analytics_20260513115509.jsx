import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

function Analytics() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/members/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMembers(res.data);

    } catch (error) {

      console.log(error);

      if (
        error.response &&
        error.response.status === 401
      ) {

        alert("Session expired. Please login again.");

        localStorage.removeItem("token");

        window.location.href = "/login";
      }
    }
  };

  const activeMembers = members.filter(
    (member) =>
      new Date(member.expiryDate)
      > new Date()
  ).length;

  const expiredMembers = members.filter(
    (member) =>
      new Date(member.expiryDate)
      < new Date()
  ).length;

  const paidMembers = members.filter(
    (member) =>
      member.paymentStatus === "Paid"
  ).length;

  const totalRevenue = members
    .filter((member) =>
      member.paymentStatus === "Paid"
    )
    .reduce((acc, curr) => {
      return acc + Number(curr.paymentAmount);
    }, 0);

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Analytics
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-green-500/20 border border-green-500/30 rounded-3xl p-8">

            <p className="text-green-300 text-xl">
              Active Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {activeMembers}
            </h2>

          </div>

          <div className="bg-red-500/20 border border-red-500/30 rounded-3xl p-8">

            <p className="text-red-300 text-xl">
              Expired Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {expiredMembers}
            </h2>

          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-3xl p-8">

            <p className="text-blue-300 text-xl">
              Paid Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {paidMembers}
            </h2>

          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-3xl p-8">

            <p className="text-yellow-300 text-xl">
              Total Revenue
            </p>

            <h2 className="text-5xl font-bold mt-4">
              ₹{totalRevenue}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;