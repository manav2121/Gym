import { useEffect, useState }
from "react";

import axios from "axios";

import {
  useParams,
} from "react-router-dom";

import Sidebar
from "../components/Sidebar";

function MemberProfile({
  sidebarOpen,
  setSidebarOpen,
}) {

  const { id } = useParams();

  const [member, setMember] =
    useState(null);
const [payments, setPayments] =
  useState([]);
  
  useEffect(() => {

    fetchMember();
    const fetchPayments =
async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/payments/member/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setPayments(res.data);

  } catch (error) {

    console.log(error);
  }
};
    fetchPayments();

  }, []);

  const fetchMember =
  async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/members/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMember(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!member) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const isExpired =
    new Date(member.expiryDate)
    < new Date();

  return (

    <div className="min-h-screen bg-[#f4f4f5]">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="w-full px-8 pt-28 pb-10">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white border border-zinc-200 rounded-[40px] p-10 shadow-sm">

            <div className="flex items-center gap-6 mb-10">

              <div className="w-24 h-24 rounded-[28px] bg-zinc-100 flex items-center justify-center text-4xl font-bold">

                {member.name
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h1 className="text-5xl font-bold text-zinc-900">

                  {member.name}

                </h1>

                <p className="text-zinc-500 text-xl mt-2">

                  {member.plan}

                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-zinc-50 rounded-3xl p-6">

                <p className="text-zinc-500 mb-2">
                  Phone
                </p>

                <h2 className="text-2xl font-semibold">
                  {member.phone}
                </h2>

              </div>

              <div className="bg-zinc-50 rounded-3xl p-6">

                <p className="text-zinc-500 mb-2">
                  Membership
                </p>

                <h2 className="text-2xl font-semibold">
                  {member.plan}
                </h2>

              </div>

              <div className="bg-zinc-50 rounded-3xl p-6">

                <p className="text-zinc-500 mb-2">
                  Expiry Date
                </p>

                <h2 className="text-2xl font-semibold">

                  {new Date(
                    member.expiryDate
                  ).toDateString()}

                </h2>

              </div>

              <div className="bg-zinc-50 rounded-3xl p-6">

                <p className="text-zinc-500 mb-2">
                  Status
                </p>

                <h2
                  className={`text-2xl font-semibold ${
                    isExpired
                    ? "text-rose-500"
                    : "text-emerald-600"
                  }`}
                >

                  {isExpired
                    ? "Expired"
                    : "Active"}

                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MemberProfile;