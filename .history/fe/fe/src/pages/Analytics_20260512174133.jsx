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

      const res = await axios.get(
        "http://localhost:5000/api/members/all"
      );

      setMembers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const activeMembers = members.filter((m) => {
    return new Date(m.expiryDate) > new Date();
  }).length;

  const expiredMembers = members.filter((m) => {
    return new Date(m.expiryDate) < new Date();
  }).length;

  const totalRevenue = members
    .filter((m) => m.paymentStatus === "Paid")
    .reduce((acc, curr) => {
      return acc + curr.paymentAmount;
    }, 0);

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Analytics
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-green-500/20 border border-green-500/30 rounded-3xl p-8">
            <p className="text-xl text-green-300">
              Active Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {activeMembers}
            </h2>
          </div>

          <div className="bg-red-500/20 border border-red-500/30 rounded-3xl p-8">
            <p className="text-xl text-red-300">
              Expired Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              {expiredMembers}
            </h2>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-3xl p-8">
            <p className="text-xl text-blue-300">
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