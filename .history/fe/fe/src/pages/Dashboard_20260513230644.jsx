import Sidebar from "../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [renewPlans, setRenewPlans] = useState({});

  const [paymentStats, setPaymentStats] =
    useState({});

  const [attendanceStats, setAttendanceStats] =
    useState({});

  const [recentPayments, setRecentPayments] =
    useState([]);

  useEffect(() => {

    fetchMembers();

    fetchPaymentStats();

    fetchAttendanceStats();

    fetchRecentPayments();

  }, []);

  const fetchMembers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/members/all",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
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

        localStorage.removeItem("token");

        window.location.href = "/login";
      }
    }
  };

  const fetchPaymentStats =
  async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/payments/stats",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setPaymentStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchAttendanceStats =
  async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/attendance/stats",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setAttendanceStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchRecentPayments =
  async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/payments/recent",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setRecentPayments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteMember = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/members/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchMembers();

    } catch (error) {

      console.log(error);
    }
  };

  const renewMembership = async (id) => {

    try {

      const selectedPlan =
        renewPlans[id];

      if (!selectedPlan) {

        alert("Please select a plan");

        return;
      }

      let amount = 0;

      if (selectedPlan === "1 Month") {
        amount = 1000;
      }

      else if (
        selectedPlan === "3 Months"
      ) {
        amount = 2500;
      }

      else if (
        selectedPlan === "6 Months"
      ) {
        amount = 4500;
      }

      else if (
        selectedPlan === "1 Year"
      ) {
        amount = 8000;
      }

      await axios.put(
        `http://localhost:5000/api/members/renew/${id}`,
        {
          plan: selectedPlan,
          amount,
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchMembers();

      fetchPaymentStats();

      fetchRecentPayments();

    } catch (error) {

      console.log(error);
    }
  };

  const filteredMembers = useMemo(() => {

    return members.filter((member) =>
      member.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [members, search]);

  const activeMembers = members.filter((member) => {
    return new Date(member.expiryDate) > new Date();
  }).length;

  const expiredMembers = members.filter((member) => {
    return new Date(member.expiryDate) < new Date();
  }).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white overflow-hidden flex">

      <Sidebar />

      <div className="ml-[280px] w-full px-8 py-8">

        <div className="max-w-7xl mx-auto relative">

          <div className="relative z-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

              <div>

                <h1 className="text-6xl font-black leading-relaxed bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  रामेष्ट Fitness Zone
                </h1>

                <p className="text-gray-400 text-xl mt-2">
                  Smart Gym Management System
                </p>

              </div>

              <Link
                to="/add-member"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl text-lg"
              >
                + Add Member
              </Link>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

              <div className="bg-gray-900 p-7 rounded-3xl">

                <p>Total Members</p>

                <h2 className="text-5xl font-bold mt-4">
                  {members.length}
                </h2>

              </div>

              <div className="bg-green-600 p-7 rounded-3xl">

                <p>Active Members</p>

                <h2 className="text-5xl font-bold mt-4">
                  {activeMembers}
                </h2>

              </div>

              <div className="bg-red-600 p-7 rounded-3xl">

                <p>Expired Members</p>

                <h2 className="text-5xl font-bold mt-4">
                  {expiredMembers}
                </h2>

              </div>

              <div className="bg-blue-600 p-7 rounded-3xl">

                <p>Monthly Revenue</p>

                <h2 className="text-4xl font-bold mt-4">
                  ₹{paymentStats.monthlyRevenue || 0}
                </h2>

              </div>

              <div className="bg-purple-600 p-7 rounded-3xl">

                <p>Today Attendance</p>

                <h2 className="text-4xl font-bold mt-4">
                  {attendanceStats.todayAttendance || 0}
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;