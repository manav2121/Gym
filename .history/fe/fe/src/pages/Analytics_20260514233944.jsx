import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar
from "../components/Sidebar";

function Analytics({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [stats, setStats] =
    useState({});

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "http://localhost:5000/api/payments/stats",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);
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

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">

              Analytics

            </h1>

            <p className="text-zinc-500 mt-2 text-lg">

              Revenue and payment insights

            </p>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white border border-zinc-200 rounded-[32px] p-6 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Total Revenue

              </p>

              <h2 className="text-4xl font-bold mt-4 text-emerald-600">

                ₹
                {stats.totalRevenue || 0}

              </h2>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-6 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Pending Revenue

              </p>

              <h2 className="text-4xl font-bold mt-4 text-yellow-600">

                ₹
                {stats.pendingRevenue || 0}

              </h2>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-6 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Monthly Revenue

              </p>

              <h2 className="text-4xl font-bold mt-4 text-zinc-900">

                ₹
                {stats.monthlyRevenue || 0}

              </h2>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-6 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Total Transactions

              </p>

              <h2 className="text-4xl font-bold mt-4 text-zinc-900">

                {stats.totalTransactions || 0}

              </h2>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="mt-10 bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-zinc-900 mb-6">

              Business Summary

            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">

                <p className="text-zinc-600">

                  Revenue Collected

                </p>

                <p className="text-xl font-semibold text-emerald-600">

                  ₹
                  {stats.totalRevenue || 0}

                </p>

              </div>

              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">

                <p className="text-zinc-600">

                  Revenue Pending

                </p>

                <p className="text-xl font-semibold text-yellow-600">

                  ₹
                  {stats.pendingRevenue || 0}

                </p>

              </div>

              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">

                <p className="text-zinc-600">

                  Revenue This Month

                </p>

                <p className="text-xl font-semibold">

                  ₹
                  {stats.monthlyRevenue || 0}

                </p>

              </div>

              <div className="flex items-center justify-between">

                <p className="text-zinc-600">

                  Total Transactions

                </p>

                <p className="text-xl font-semibold">

                  {stats.totalTransactions || 0}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;