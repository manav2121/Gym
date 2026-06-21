import { useEffect, useState }
from "react";

import axios from "axios";

import Sidebar
from "../components/Sidebar";

function Attendance({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [members, setMembers] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {

    fetchMembers();

    fetchAttendance();

  }, []);

  const authHeaders = {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchMembers =
  async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/members/all",
          authHeaders
        );

      setMembers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchAttendance =
  async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/attendance/all",
          authHeaders
        );

      setAttendance(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const markAttendance =
  async (id) => {

    try {

      await axios.post(
        `http://localhost:5000/api/attendance/checkin/${id}`,
        {},
        authHeaders
      );

      alert(
        "Attendance marked successfully"
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message
      );
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

        <div className="max-w-7xl mx-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">

              Attendance

            </h1>

            <p className="text-zinc-500 mt-2 text-lg">

              Manage daily member check-ins

            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div>

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-3xl font-semibold text-zinc-900">

                  Members

                </h2>

                <div className="bg-white border border-zinc-200 px-4 py-2 rounded-2xl text-zinc-600 shadow-sm">

                  {members.length}
                  {" "}
                  Members

                </div>

              </div>

              <div className="space-y-4">

                {members.map(
                  (member) => (

                  <div
                    key={
                      member._id
                    }
                    className="bg-white border border-zinc-200 rounded-[28px] p-5 shadow-sm flex justify-between items-center"
                  >

                    <div>

                      <h3 className="text-2xl font-semibold text-zinc-900">

                        {
                          member.name
                        }

                      </h3>

                      <p className="text-zinc-500 mt-1">

                        {
                          member.phone
                        }

                      </p>

                    </div>

                    <button
                      onClick={() =>
                        markAttendance(
                          member._id
                        )
                      }
                      className="bg-zinc-900 hover:bg-black text-white px-5 py-3 rounded-2xl font-medium transition-all duration-300"
                    >

                      Check In

                    </button>

                  </div>

                ))}

                {members.length === 0 && (

                  <div className="bg-white border border-zinc-200 rounded-[28px] p-10 text-center text-zinc-400 shadow-sm">

                    No members found

                  </div>

                )}

              </div>

            </div>

            <div>

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-3xl font-semibold text-zinc-900">

                  Today Attendance

                </h2>

                <div className="bg-white border border-zinc-200 px-4 py-2 rounded-2xl text-zinc-600 shadow-sm">

                  {attendance.length}
                  {" "}
                  Present

                </div>

              </div>

              <div className="space-y-4">

                {attendance.map(
                  (item) => (

                  <div
                    key={item._id}
                    className="bg-white border border-zinc-200 rounded-[28px] p-5 shadow-sm"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="text-2xl font-semibold text-zinc-900">

                        {
                          item.memberName
                        }

                      </h3>

                      <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">

                        Present

                      </span>

                    </div>

                    <div className="mt-4 text-zinc-500 space-y-1">

                      <p>

                        Date:
                        {" "}
                        {item.date}

                      </p>

                      <p>

                        Time:
                        {" "}
                        {
                          item.checkInTime
                        }

                      </p>

                    </div>

                  </div>

                ))}

                {attendance.length === 0 && (

                  <div className="bg-white border border-zinc-200 rounded-[28px] p-10 text-center text-zinc-400 shadow-sm">

                    No attendance records found

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Attendance;