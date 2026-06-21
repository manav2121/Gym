import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,

} from "recharts";
import { useNavigate }
from "react-router-dom";
import { motion, AnimatePresence }
from "framer-motion";
import Sidebar from "../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const navigate =
  useNavigate();

  const [members, setMembers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [renewPlans, setRenewPlans] =
    useState({});

  const [paymentStats, setPaymentStats] =
    useState({});
const [settings, setSettings] =
  useState({});
  const [attendanceStats, setAttendanceStats] =
    useState({});

  const [recentPayments, setRecentPayments] =
    useState([]);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {

    fetchMembers();

    fetchPaymentStats();

    fetchAttendanceStats();

    fetchRecentPayments();
fetchSettings();
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

  amount =
    settings.oneMonthPrice;
}

else if (
  selectedPlan === "3 Months"
) {

  amount =
    settings.threeMonthPrice;
}

else if (
  selectedPlan === "6 Months"
) {

  amount =
    settings.sixMonthPrice;
}

else if (
  selectedPlan === "1 Year"
) {

  amount =
    settings.oneYearPrice;
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
const fetchSettings =
async () => {

  try {

    const res = await axios.get(
      "http://localhost:5000/api/settings",
      authHeaders
    );

    setSettings(res.data);

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
const expiringSoon =
  members.filter((member) => {

    const expiry =
      new Date(
        member.expiryDate
      );

    const today =
      new Date();

    const diffDays =
      Math.ceil(
        (expiry - today)
        /
        (1000 * 60 * 60 * 24)
      );

    return (
      diffDays >= 0 &&
      diffDays <= 3
    );

  }).length;
  const expiredMembers =
    members.filter((member) =>
      new Date(member.expiryDate)
      < new Date()
    ).length;

  return (

    <div className="min-h-screen bg-[#f4f4f5] text-zinc-900">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="w-full px-8 pt-28 pb-10">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">

            <div>

              <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
                रामेष्ट Fitness Zone
              </h1>

              <p className="text-zinc-500 mt-2 text-lg">
                Smart Gym Management Dashboard
              </p>

            </div>

            <Link
              to="/add-member"
              className="bg-zinc-900 hover:bg-black text-white transition-all duration-300 px-7 py-3 rounded-2xl font-semibold shadow-sm"
            >
              Add Member
            </Link>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">

            <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-sm">

              <p className="text-zinc-500 text-sm">
                Total Members
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {members.length}
              </h2>

            </div>

            <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-sm">

              <p className="text-zinc-500 text-sm">
                Active Members
              </p>

              <h2 className="text-4xl font-bold mt-3 text-emerald-600">
                {activeMembers}
              </h2>

            </div>

            <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-sm">

              <p className="text-zinc-500 text-sm">
                Expired Members
              </p>

              <h2 className="text-4xl font-bold mt-3 text-rose-500">
                {expiredMembers}
              </h2>

            </div>

            <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-sm">

              <p className="text-zinc-500 text-sm">
                Monthly Revenue
              </p>

              <h2 className="text-4xl font-bold mt-3">
                ₹
                {paymentStats.monthlyRevenue || 0}
              </h2>

            </div>

            <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-sm">

              <p className="text-zinc-500 text-sm">
                Today Attendance
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {attendanceStats.todayAttendance || 0}
              </h2>

            </div>

          </div>
<div className="mb-10">

  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-[32px] p-6">

    <div className="flex items-center justify-between mb-5">

      <div>

        <p className="text-yellow-700 text-lg font-medium">

          Membership Renewal Alert

        </p>

        <h2 className="text-4xl font-bold text-yellow-900 mt-2">

          {expiringSoon}

        </h2>

        <p className="text-yellow-700 mt-2">

          memberships expiring within 3 days

        </p>

      </div>

      <div className="text-6xl">
        ⚠️
      </div>

    </div>

    <div className="space-y-3">

      {members
        .filter((member) => {

          const expiry =
            new Date(
              member.expiryDate
            );

          const today =
            new Date();

          const diffDays =
            Math.ceil(
              (expiry - today)
              /
              (1000 * 60 * 60 * 24)
            );

          return (
            diffDays >= 0 &&
            diffDays <= 3
          );
        })
        .map((member) => {

          const expiry =
            new Date(
              member.expiryDate
            );

          const today =
            new Date();

          const diffDays =
            Math.ceil(
              (expiry - today)
              /
              (1000 * 60 * 60 * 24)
            );

          return (

            <div
              key={member._id}
              className="bg-white/70 border border-yellow-200 rounded-2xl px-5 py-4 flex justify-between items-center"
            >

              <div>

                <h3 className="font-semibold text-zinc-900">

                  {member.name}

                </h3>

                <p className="text-sm text-zinc-500 mt-1">

                  {member.plan}

                </p>

              </div>

              <div className="text-right">

                <p className="font-medium text-yellow-700">

                  {diffDays === 0
                    ? "Expires today"
                    : diffDays === 1
                    ? "Expires tomorrow"
                    : `${diffDays} days left`}

                </p>

                <p className="text-sm text-zinc-500 mt-1">

                  {expiry.toDateString()}

                </p>

              </div>

            </div>

          );
        })}

      {expiringSoon === 0 && (

        <div className="bg-white/70 border border-yellow-200 rounded-2xl px-5 py-6 text-center text-zinc-500">

          No memberships expiring soon

        </div>

      )}

    </div>

  </div>

</div>
          <div className="bg-white border border-zinc-200 rounded-3xl p-5 mb-10 shadow-sm">

            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-400"
            />

          </div>

          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">

            {filteredMembers.map((member) => {

              const expiryDate =
                new Date(
                  member.expiryDate
                );

              const isExpired =
                expiryDate < new Date();
const today =
  new Date();

const diffTime =
  expiryDate - today;

const daysLeft =
  Math.ceil(
    diffTime /
    (1000 * 60 * 60 * 24)
  );

  const revenueData =
  recentPayments.map(
    (payment) => ({

      name:
        new Date(
          payment.paymentDate
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
          }
        ),

      revenue:
        payment.amount,

    })
  );
              return (

                <div
                  key={member._id}
                  onClick={() =>
  navigate(`/member/${member._id}`)
}
                  className="bg-white border border-zinc-200 rounded-[30px] p-6 transition-all duration-300 hover:shadow-md cursor-pointer"
                >

                  <div className="flex justify-between items-start gap-5">

                    <div>

                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-lg font-bold mb-4">
                        {member.name.charAt(0).toUpperCase()}
                      </div>

                      <h2 className="text-2xl font-semibold text-zinc-900">
                        {member.name}
                      </h2>

                     
<div className="mt-4">

  <div className="flex items-center gap-2">

    <div
      className={`w-2.5 h-2.5 rounded-full ${
        isExpired
        ? "bg-rose-500"
        : daysLeft <= 3
        ? "bg-yellow-500"
        : "bg-emerald-500"
      }`}
    ></div>

    <p
      className={`font-medium ${
        isExpired
        ? "text-rose-500"
        : daysLeft <= 3
        ? "text-yellow-600"
        : "text-emerald-600"
      }`}
    >

      {isExpired
        ? "Expired"
        : daysLeft <= 3
        ? "Expiring Soon"
        : "Active"}

    </p>

  </div>

  <p className="text-sm text-zinc-500 mt-2">

    {isExpired
      ? `Expired ${
          Math.abs(daysLeft)
        } days ago`
      : daysLeft === 0
      ? "Expires today"
      : daysLeft === 1
      ? "Expires tomorrow"
      : `${daysLeft} days left`}

  </p>

</div>


                    </div>

                    <div className="flex flex-col gap-3 min-w-[140px]">

                     <div className="grid grid-cols-2 gap-2">

  {[
    "1 Month",
    "3 Months",
    "6 Months",
    "1 Year",
  ].map((plan) => (

    <button
      key={plan}
      onClick={(e) => {

        e.stopPropagation();

        setRenewPlans({
          ...renewPlans,
          [member._id]: plan,
        });
      }}
      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        renewPlans[member._id]
        === plan
          ? "bg-zinc-900 text-white"
          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
      }`}
    >

      {plan === "1 Month"
        ? "1M"
        : plan === "3 Months"
        ? "3M"
        : plan === "6 Months"
        ? "6M"
        : "1Y"}

    </button>

  ))}

</div>

                      <button
                        onClick={(e) => {

  e.stopPropagation();
                          renewMembership(
                            member._id
                          )
                        }}
                        className="bg-zinc-900 hover:bg-black text-white px-5 py-2 rounded-2xl transition-all duration-300"
                      >
                        Renew
                      </button>

                      <button
                        onClick={(e) => {

  e.stopPropagation();
                          deleteMember(
                            member._id
                          )
                        }}
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-5 py-2 rounded-2xl transition-all duration-300"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

            {filteredMembers.length === 0 && (

              <div className="col-span-full text-center py-20 text-zinc-400 text-2xl">

                No members found

              </div>

            )}

          </div>

          <div className="mt-14">

            <h2 className="text-3xl font-semibold mb-6 text-zinc-900">
              Recent Transactions
            </h2>

            <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">

              <table className="w-full">

                <thead className="bg-zinc-100">

                  <tr className="text-left text-zinc-600">

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
                      className="border-t border-zinc-100 hover:bg-zinc-50 transition-all duration-300"
                    >

                      <td className="p-5">
                        {payment.memberName}
                      </td>

                      <td className="p-5">
                        {payment.plan}
                      </td>

                      <td className="p-5 font-semibold">
                        ₹{payment.amount}
                      </td>

                      <td className="p-5 text-zinc-500">
                        {new Date(
                          payment.paymentDate
                        ).toDateString()}
                      </td>

                    </tr>

                  ))}
<div className="mt-14">

  <h2 className="text-3xl font-semibold mb-6 text-zinc-900">

    Revenue Analytics

  </h2>

  <div className="bg-white border border-zinc-200 rounded-[32px] p-6 shadow-sm">

    <div className="h-[350px]">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart
          data={revenueData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#18181b"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>
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