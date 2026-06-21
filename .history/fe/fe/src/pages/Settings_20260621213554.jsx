import { useEffect, useState }
from "react";
import API_URL from "../config/api";
import axios from "axios";

import Sidebar
from "../components/Sidebar";

function Settings({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [settings, setSettings] =
    useState({

      oneMonthPrice: "",

      threeMonthPrice: "",

      sixMonthPrice: "",

      oneYearPrice: "",

    });

  useEffect(() => {

    fetchSettings();

  }, []);

  const fetchSettings =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          `${API_URL}/api/settings`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSettings(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const saveSettings =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `${API_URL}/api/settings`,
        settings,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Settings updated successfully"
      );

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

      <div className="w-full px-8 pt-28 pb-10">

        <div className="max-w-6xl mx-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">

              Settings

            </h1>

            <p className="text-zinc-500 mt-2 text-lg">

              Manage membership pricing and plans

            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white border border-zinc-200 rounded-[32px] p-7 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Membership Plan

                  </p>

                  <h2 className="text-2xl font-semibold text-zinc-900 mt-1">

                    1 Month

                  </h2>

                </div>

                <div className="bg-zinc-100 px-4 py-2 rounded-2xl text-zinc-600 text-sm font-medium">

                  Monthly

                </div>

              </div>

              <input
                type="number"
                value={
                  settings.oneMonthPrice
                }
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    oneMonthPrice:
                      e.target.value,
                  })
                }
                placeholder="Enter amount"
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-xl"
              />

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-7 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Membership Plan

                  </p>

                  <h2 className="text-2xl font-semibold text-zinc-900 mt-1">

                    3 Months

                  </h2>

                </div>

                <div className="bg-zinc-100 px-4 py-2 rounded-2xl text-zinc-600 text-sm font-medium">

                  Quarterly

                </div>

              </div>

              <input
                type="number"
                value={
                  settings.threeMonthPrice
                }
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    threeMonthPrice:
                      e.target.value,
                  })
                }
                placeholder="Enter amount"
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-xl"
              />

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-7 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Membership Plan

                  </p>

                  <h2 className="text-2xl font-semibold text-zinc-900 mt-1">

                    6 Months

                  </h2>

                </div>

                <div className="bg-zinc-100 px-4 py-2 rounded-2xl text-zinc-600 text-sm font-medium">

                  Half-Yearly

                </div>

              </div>

              <input
                type="number"
                value={
                  settings.sixMonthPrice
                }
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sixMonthPrice:
                      e.target.value,
                  })
                }
                placeholder="Enter amount"
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-xl"
              />

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-7 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-zinc-500 text-sm">

                    Membership Plan

                  </p>

                  <h2 className="text-2xl font-semibold text-zinc-900 mt-1">

                    1 Year

                  </h2>

                </div>

                <div className="bg-zinc-100 px-4 py-2 rounded-2xl text-zinc-600 text-sm font-medium">

                  Annual

                </div>

              </div>

              <input
                type="number"
                value={
                  settings.oneYearPrice
                }
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    oneYearPrice:
                      e.target.value,
                  })
                }
                placeholder="Enter amount"
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-zinc-300 text-xl"
              />

            </div>

          </div>

          <button
            onClick={saveSettings}
            className="mt-10 bg-zinc-900 hover:bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-sm"
          >

            Save Settings

          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;