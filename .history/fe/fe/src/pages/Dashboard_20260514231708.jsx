
import { useNavigate }
from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const navigate =
  useNavigate();
const [currentTime, setCurrentTime] =
  useState(new Date());
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
  

  

  const [sidebarOpen, setSidebarOpen] =
    useState(false);
useEffect(() => {

  fetchMembers();

  fetchPaymentStats();


  fetchSettings();

  const timer =
    setInterval(() => {

      setCurrentTime(
        new Date()
      );

    }, 1000);

  return () =>
    clearInterval(timer);

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


const currentHour =
  currentTime.getHours();

let greeting =
  "Good Evening";

if (currentHour < 12) {

  greeting =
    "Good Morning";
}

else if (
  currentHour < 18
) {

  greeting =
    "Good Afternoon";
}
  return (

    <div className="min-h-screen bg-[#f4f4f5] text-zinc-900">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="w-full px-8 pt-14 pb-10">

        <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 mb-12">

  <div className="flex-1"></div>

  <h1 className="text-5xl font-bold tracking-tight text-orange-500 text-center">

    रामेष्ट Fitness Zone

  </h1>

  <div className="flex-1 flex justify-end">

    <Link
      to="/add-member"
      className="bg-zinc-900 hover:bg-zinc-700 text-white transition-all duration-300 px-7 py-3 rounded-2xl font-semibold shadow-sm"
    >

      Add Member

    </Link>

  </div>
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
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-10 mb-10">

            

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

         {search && (

  <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm mb-10">

    {filteredMembers.length > 0 ? (

      filteredMembers.map((member) => (

        <Link
          key={member._id}
          to={`/member/${member._id}`}
          className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 hover:bg-zinc-50 transition-all duration-300"
        >

          <div>

            <h2 className="text-lg font-semibold text-zinc-900">

              {member.name}

            </h2>

            <p className="text-zinc-500 mt-1">

              {member.phone}

            </p>

          </div>

          <div className="text-zinc-400">

            View Profile →

          </div>

        </Link>

      ))

    ) : (

      <div className="p-8 text-center text-zinc-500">

        No members found

      </div>

    )}

  </div>

)}
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

                </tbody>

              </table>

            </div>
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
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;