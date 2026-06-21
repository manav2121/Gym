import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

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

  const fetchSettings = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/settings",
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
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/settings",
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
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="w-full px-8 pt-28 pb-10">

        <div className="max-w-5xl mx-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight">
              Settings
            </h1>

            <p className="text-zinc-500 mt-2 text-lg">
              Manage membership pricing
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">

              <p className="text-zinc-500 mb-3">
                1 Month Price
              </p>

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
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none text-xl"
              />

            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">

              <p className="text-zinc-500 mb-3">
                3 Months Price
              </p>

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
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none text-xl"
              />

            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">

              <p className="text-zinc-500 mb-3">
                6 Months Price
              </p>

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
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none text-xl"
              />

            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">

              <p className="text-zinc-500 mb-3">
                1 Year Price
              </p>

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
                className="w-full bg-zinc-100 rounded-2xl px-5 py-4 outline-none text-xl"
              />

            </div>

          </div>

          <button
            onClick={saveSettings}
            className="mt-10 bg-zinc-900 hover:bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
          >
            Save Settings
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;