import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
  Wallet,
  IndianRupee,
  CreditCard,
} from "lucide-react";

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

  const revenueData = [

    {
      name: "Revenue",
      amount:
        stats.totalRevenue || 0,
    },

    {
      name: "Pending",
      amount:
        stats.pendingRevenue || 0,
    },

    {
      name: "Monthly",
      amount:
        stats.monthlyRevenue || 0,
    },

  ];

  const distributionData = [

    {
      name: "Revenue",
      value:
        stats.totalRevenue || 0,
    },

    {
      name: "Pending",
      value:
        stats.pendingRevenue || 0,
    },

  ];

  const COLORS = [
    "#18181b",
    "#facc15",
  ];

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

      <div className="w-full px-8 pt-14 pb-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight">

              Analytics

            </h1>

            <p className="text-zinc-500 mt-3 text-lg">

              Monitor gym revenue and business performance

            </p>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <div className="bg-white border border-zinc-200 rounded-[30px] p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Total Revenue

                  </p>

                  <h2 className="text-4xl font-bold mt-3">

                    ₹
                    {stats.totalRevenue || 0}

                  </h2>

                </div>

                <div className="bg-zinc-100 p-4 rounded-2xl">

                  <IndianRupee size={28} />

                </div>

              </div>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[30px] p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Pending Revenue

                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-yellow-600">

                    ₹
                    {stats.pendingRevenue || 0}

                  </h2>

                </div>

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <Wallet size={28} />

                </div>

              </div>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[30px] p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Monthly Revenue

                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-emerald-600">

                    ₹
                    {stats.monthlyRevenue || 0}

                  </h2>

                </div>

                <div className="bg-emerald-100 p-4 rounded-2xl">

                  <TrendingUp size={28} />

                </div>

              </div>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[30px] p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Transactions

                  </p>

                  <h2 className="text-4xl font-bold mt-3">

                    {stats.totalTransactions || 0}

                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <CreditCard size={28} />

                </div>

              </div>

            </div>

          </div>

          {/* CHARTS */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* BAR CHART */}

            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

              <div className="mb-6">

                <h2 className="text-3xl font-bold">

                  Revenue Overview

                </h2>

                <p className="text-zinc-500 mt-2">

                  Compare revenue performance

                </p>

              </div>

              <div className="h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={revenueData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e4e4e7"
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="amount"
                      radius={[
                        12,
                        12,
                        0,
                        0,
                      ]}
                      fill="#18181b"
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* PIE CHART */}

            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

              <div className="mb-6">

                <h2 className="text-3xl font-bold">

                  Revenue Distribution

                </h2>

                <p className="text-zinc-500 mt-2">

                  Paid vs pending comparison

                </p>

              </div>

              <div className="h-[380px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={
                        distributionData
                      }
                      dataKey="value"
                      outerRadius={130}
                      innerRadius={70}
                      paddingAngle={5}
                      label
                    >

                      {distributionData.map(
                        (
                          _,
                          index
                        ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;