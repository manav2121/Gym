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
} from "recharts";

import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

function Analytics({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [stats, setStats] =
    useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

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

  const memberData = [

    {
      name: "Transactions",
      value:
        stats.totalTransactions || 0,
    },

    {
      name: "Revenue",
      value:
        stats.totalRevenue || 0,
    },

  ];

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Analytics
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Revenue Overview
            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={revenueData}
                >

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="amount" />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Business Distribution
            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={memberData}
                    dataKey="value"
                    outerRadius={140}
                    label
                  >

                    {memberData.map(
                      (_, index) => (

                      <Cell
                        key={index}
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
  );
}

export default Analytics;