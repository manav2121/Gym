import Sidebar from "../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

  const [members, setMembers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [renewPlans, setRenewPlans] =
    useState({});

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

  const authHeaders = {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchMembers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/members/all",
        authHeaders
      );

      setMembers(res.data);

    } catch (error) {

      console.log(error);

      if (
        error.response?.status === 401
      ) {

        localStorage.removeItem("token");

        window.location.href =
          "/login";
      }
    }
  };

  const fetchPaymentStats =
  async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/payments/stats",
        authHeaders
      );

      setPaymentStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchAttendanceStats =
  async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/attendance/stats",
        authHeaders
      );

      setAttendanceStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchRecentPayments =
  async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/payments/recent",
        authHeaders
      );

      setRecentPayments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteMember =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this member?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/members/delete/${id}`,
        authHeaders
      );

      fetchMembers();

    } catch (error) {

      console.log(error);
    }
  };

  const renewMembership =
  async (id) => {

    try {

      const selectedPlan =
        renewPlans[id];

      if (!selectedPlan) {

        alert(
          "Please select a plan"
        );

        return;
      }

      let amount = 0;

      if (
        selectedPlan === "1 Month"
      ) {
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
        authHeaders
      );

      fetchMembers();

      fetchPaymentStats();

      fetchRecentPayments();

      alert(
        "Membership renewed"
      );

    } catch (error) {

      console.log(error);
    }
  };

  const filteredMembers =
  useMemo(() => {

    return members.filter(
      (member) =>
        member.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  }, [members, search]);

  const activeMembers =
    members.filter((member) =>
      new Date(member.expiryDate)
      > new Date()
    ).length;

  const expiredMembers =
    members.filter((member) =>
      new Date(member.expiryDate)
      < new Date()
    ).length;

  return (

    <div className="min-h-screen bg-[#050816] text-white flex relative overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      <Sidebar />

      <div className="ml-[240px] w-full p-8 relative z-10">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">

            <div>

              <h1 className="text-5x2 font-black bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                रामेष्ट Fitness Zone
              </h1>

              

            </div>

            <Link
              to="/add-member"
              className="bg-gradient-to-r from-rose-700 to-red-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl"
            >
              + Add Member
            </Link>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">

              <p className="text-gray-400">
                Total Members
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {members.length}
              </h2>

            </div>

            <div className="bg-gradient-to-br from-emerald-700 to-green-500 p-6 rounded-3xl shadow-2xl">

              <p>
                Active Members
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {activeMembers}
              </h2>

            </div>

            <div className="bg-gradient-to-br from-rose-700 to-red-500 p-6 rounded-3xl shadow-2xl">

              <p>
                Expired Members
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {expiredMembers}
              </h2>

            </div>

            <div className="bg-gradient-to-br from-sky-700 to-cyan-500 p-6 rounded-3xl shadow-2xl">

              <p>
                Monthly Revenue
              </p>

              <h2 className="text-4xl font-bold mt-4">
                ₹
                {paymentStats.monthlyRevenue || 0}
              </h2>

            </div>

            <div className="bg-gradient-to-br from-violet-700 to-fuchsia-500 p-6 rounded-3xl shadow-2xl">

              <p>
                Today Attendance
              </p>

              <h2 className="text-4xl font-bold mt-4">
                {attendanceStats.todayAttendance || 0}
              </h2>

            </div>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 mb-10 shadow-2xl">

            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent outline-none text-lg placeholder:text-gray-500 focus:placeholder:text-gray-700 transition-all duration-300"
            />

          </div>

          <div className="grid lg:grid-cols-2 gap-5">

            {filteredMembers.map((member) => {

              const expiryDate =
                new Date(
                  member.expiryDate
                );

              const isExpired =
                expiryDate < new Date();

              return (

                <div
                  key={member._id}
                  className={`rounded-[32px] p-6 border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]
                  ${
                    isExpired
                    ? "bg-gradient-to-br from-rose-800/90 to-red-600/90 border-red-400"
                    : "bg-gradient-to-br from-emerald-800/90 to-green-600/90 border-green-400"
                  }`}
                >

                  <div className="flex justify-between items-start gap-5">

                    <div>

                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold mb-4 backdrop-blur-xl">
                        {member.name.charAt(0).toUpperCase()}
                      </div>

                      <h2 className="text-2xl font-bold">
                        {member.name}
                      </h2>

                      <div className="space-y-2 mt-4 text-base">

                        <p>
                          📞 {member.phone}
                        </p>

                        <p>
                          📦 {member.plan}
                        </p>

                        <p>
                          📅{" "}
                          {expiryDate.toDateString()}
                        </p>

                        <p className="font-bold">

                          {isExpired
                            ? "🔴 Expired"
                            : "🟢 Active"}

                        </p>

                      </div>

                    </div>

                    <div className="flex flex-col gap-3">

                      <select
                        value={
                          renewPlans[
                            member._id
                          ] || ""
                        }
                        onChange={(e) =>
                          setRenewPlans({
                            ...renewPlans,
                            [member._id]:
                              e.target.value,
                          })
                        }
                        className="bg-black/30 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10"
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

                      <button
                        onClick={() =>
                          renewMembership(
                            member._id
                          )
                        }
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-xl px-5 py-2 rounded-2xl transition-all duration-300"
                      >
                        Renew
                      </button>

                      <button
                        onClick={() =>
                          deleteMember(
                            member._id
                          )
                        }
                        className="bg-rose-500/20 text-white hover:bg-rose-500/30 border border-rose-500/20 px-5 py-2 rounded-2xl font-semibold transition-all duration-300"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

            {filteredMembers.length === 0 && (

              <div className="col-span-full text-center py-20 text-gray-500 text-2xl">

                No members found

              </div>

            )}

          </div>

          <div className="mt-14">

            <h2 className="text-4xl font-bold mb-6">
              Recent Transactions
            </h2>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

              <table className="w-full">

                <thead className="bg-white/10">

                  <tr className="text-left">

                    <th className="p-5">
                      Member
                    </th>

                    <th className="p-5">
                      Plan
                    </th>

                    <th className="p-5">
                      Amount
                    </th>

                    <th className="p-5">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentPayments.map(
                    (payment) => (

                    <tr
                      key={payment._id}
                      className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                    >

                      <td className="p-5">
                        {payment.memberName}
                      </td>

                      <td className="p-5">
                        {payment.plan}
                      </td>

                      <td className="p-5 text-green-300 font-bold">
                        ₹{payment.amount}
                      </td>

                      <td className="p-5">
                        {new Date(
                          payment.paymentDate
                        ).toDateString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;