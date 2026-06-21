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

    fetchPayments();

  }, []);

  const authHeaders = {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const fetchMember =
  async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:5000/api/members/${id}`,
          authHeaders
        );

      setMember(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchPayments =
  async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:5000/api/payments/member/${id}`,
          authHeaders
        );

      setPayments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!member) {

    return (

      <div className="min-h-screen bg-[#f4f4f5] flex items-center justify-center text-zinc-500 text-2xl">

        Loading...

      </div>

    );
  }

  const isExpired =
    new Date(
      member.expiryDate
    ) < new Date();

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

          <div className="bg-white border border-zinc-200 rounded-[40px] p-10 shadow-sm">

            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">

              <div className="w-24 h-24 rounded-[28px] bg-zinc-100 flex items-center justify-center text-4xl font-bold text-zinc-900">

                {member.name
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h1 className="text-5xl font-bold tracking-tight text-zinc-900">

                  {member.name}

                </h1>

                <p className="text-zinc-500 text-xl mt-3">

                  {member.plan}

                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-zinc-50 rounded-[28px] p-6">

                <p className="text-zinc-500 mb-2">

                  Phone Number

                </p>

                <h2 className="text-2xl font-semibold text-zinc-900">

                  {member.phone}

                </h2>

              </div>

              <div className="bg-zinc-50 rounded-[28px] p-6">

                <p className="text-zinc-500 mb-2">

                  Membership Plan

                </p>

                <h2 className="text-2xl font-semibold text-zinc-900">

                  {member.plan}

                </h2>

              </div>

              <div className="bg-zinc-50 rounded-[28px] p-6">

                <p className="text-zinc-500 mb-2">

                  Expiry Date

                </p>

                <h2 className="text-2xl font-semibold text-zinc-900">

                  {new Date(
                    member.expiryDate
                  ).toDateString()}

                </h2>

              </div>

              <div className="bg-zinc-50 rounded-[28px] p-6">

                <p className="text-zinc-500 mb-2">

                  Membership Status

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

          <div className="mt-14">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold text-zinc-900">

                Payment History

              </h2>

              <div className="bg-white border border-zinc-200 px-4 py-2 rounded-2xl text-zinc-700 font-medium shadow-sm">

                {payments.length}
                {" "}
                Payments

              </div>

            </div>

            <div className="space-y-4">

              {payments.length > 0 ? (

                payments.map(
                  (payment) => (

                  <div
                    key={
                      payment._id
                    }
                    className="bg-white border border-zinc-200 rounded-[28px] p-6 shadow-sm flex justify-between items-center"
                  >

                    <div>

                      <p className="text-2xl font-semibold text-zinc-900">

                        ₹
                        {
                          payment.amount
                        }

                      </p>

                      <p className="text-zinc-500 mt-2">

                        {
                          payment.plan
                        }

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-zinc-900 font-medium">

                        {new Date(
                          payment.paymentDate
                        ).toDateString()}

                      </p>

                      <p
                        className={`mt-2 text-sm font-medium ${
                          payment.paymentStatus
                          === "Paid"
                            ? "text-emerald-600"
                            : "text-yellow-600"
                        }`}
                      >

                        {
                          payment.paymentStatus
                        }

                      </p>

                    </div>

                  </div>

                ))

              ) : (

                <div className="bg-white border border-zinc-200 rounded-[28px] p-10 text-center text-zinc-500 shadow-sm">

                  No payment history found

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MemberProfile;