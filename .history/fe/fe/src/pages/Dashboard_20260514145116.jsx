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

              return (

                <div
                  key={member._id}
                  className="bg-white border border-zinc-200 rounded-[30px] p-6 transition-all duration-300 hover:shadow-md"
                >

                  <div className="flex justify-between items-start gap-5">

                    <div>

                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-lg font-bold mb-4">
                        {member.name.charAt(0).toUpperCase()}
                      </div>

                      <h2 className="text-2xl font-semibold text-zinc-900">
                        {member.name}
                      </h2>

                      <div className="space-y-2 mt-4 text-zinc-600">

                        <p>
                          {member.phone}
                        </p>

                        <p>
                          {member.plan}
                        </p>

                        <p>
                          {expiryDate.toDateString()}
                        </p>

                        <p
                          className={`font-medium ${
                            isExpired
                            ? "text-rose-500"
                            : "text-emerald-600"
                          }`}
                        >

                          {isExpired
                            ? "Expired"
                            : "Active"}

                        </p>

                      </div>

                    </div>

                    <div className="flex flex-col gap-3 min-w-[140px]">

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
                        className="bg-zinc-100 px-4 py-2 rounded-2xl outline-none"
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
                        className="bg-zinc-900 hover:bg-black text-white px-5 py-2 rounded-2xl transition-all duration-300"
                      >
                        Renew
                      </button>

                      <button
                        onClick={() =>
                          deleteMember(
                            member._id
                          )
                        }
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