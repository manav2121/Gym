import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

function Payments({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/payments/all",
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

      if (
        error.response &&
        error.response.status === 401
      ) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem("token");

        window.location.href = "/login";
      }
    }
  };

  const totalRevenue = payments
    .filter((p) =>
      p.paymentStatus === "Paid"
    )
    .reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);

  const pendingRevenue = payments
    .filter((p) =>
      p.paymentStatus === "Pending"
    )
    .reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Payments
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-green-500/20 border border-green-500/30 rounded-3xl p-8">

            <p className="text-xl text-green-300">
              Total Revenue
            </p>

            <h2 className="text-5xl font-bold mt-4">
              ₹{totalRevenue}
            </h2>

          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-3xl p-8">

            <p className="text-xl text-yellow-300">
              Pending Revenue
            </p>

            <h2 className="text-5xl font-bold mt-4">
              ₹{pendingRevenue}
            </h2>

          </div>

        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

          <table className="w-full">

            <thead className="bg-white/10">

              <tr className="text-left">

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

                <th className="p-5">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment._id}
                  className="border-t border-white/10"
                >

                  <td className="p-5">
                    {payment.memberName}
                  </td>

                  <td className="p-5">
                    {payment.plan}
                  </td>

                  <td className="p-5 font-bold text-green-300">
                    ₹{payment.amount}
                  </td>

                  <td className="p-5">
                    {new Date(
                      payment.paymentDate
                    ).toDateString()}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold
                      ${payment.paymentStatus === "Paid"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >

                      {payment.paymentStatus}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Payments;