import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

function Attendance() {

  const [members, setMembers] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {

    fetchMembers();

    fetchAttendance();

  }, []);

  const fetchMembers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/members/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMembers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchAttendance = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/attendance/all",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setAttendance(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const markAttendance = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/attendance/checkin/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Attendance marked successfully"
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Attendance
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Members
            </h2>

            <div className="space-y-4">

              {members.map((member) => (

                <div
                  key={member._id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-2xl font-bold">
                      {member.name}
                    </h3>

                    <p className="text-gray-400">
                      {member.phone}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      markAttendance(member._id)
                    }
                    className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
                  >
                    Check In
                  </button>

                </div>

              ))}

            </div>

          </div>

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Today Attendance
            </h2>

            <div className="space-y-4">

              {attendance.map((item) => (

                <div
                  key={item._id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >

                  <div className="flex justify-between">

                    <h3 className="text-2xl font-bold">
                      {item.memberName}
                    </h3>

                    <span className="text-green-300">
                      Present
                    </span>

                  </div>

                  <div className="mt-3 text-gray-400">

                    <p>
                      Date: {item.date}
                    </p>

                    <p>
                      Time:
                      {" "}
                      {item.checkInTime}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Attendance;