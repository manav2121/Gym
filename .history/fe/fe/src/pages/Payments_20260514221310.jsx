import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import { useEffect, useState }
from "react";

import axios from "axios";

import Sidebar
from "../components/Sidebar";

function Payments({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  const fetchPayments =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
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
        error.response.status
        === 401
      ) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem(
          "token"
        );

        window.location.href =
          "/login";
      }
    }
  };

  const totalRevenue =
    payments
    .filter(
      (p) =>
        p.paymentStatus
        === "Paid"
    )
    .reduce(
      (acc, curr) => {
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import { useEffect, useState }
from "react";

import axios from "axios";

import Sidebar
from "../components/Sidebar";

function Payments({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  const fetchPayments =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
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
        error.response.status
        === 401
      ) {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem(
          "token"
        );

        window.location.href =
          "/login";
      }
    }
  };

  const totalRevenue =
    payments
    .filter(
      (p) =>
        p.paymentStatus
        === "Paid"
    )
    .reduce(
      (acc, curr) => {

        return (
          acc +
          Number(curr.amount)
        );
      },
      0
    );

  const pendingRevenue =
    payments
    .filter(
      (p) =>
        p.paymentStatus
        === "Pending"
    )
    .reduce(
      (acc, curr) => {

        return (
          acc +
          Number(curr.amount)
        );
      },
      0
    );

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

              Payments

            </h1>

            <p className="text-zinc-500 mt-2 text-lg">

              Manage gym revenue and transactions

            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Total Revenue

              </p>

              <h2 className="text-5xl font-bold mt-4 text-zinc-900">

                ₹{totalRevenue}

              </h2>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Pending Revenue

              </p>

              <h2 className="text-5xl font-bold mt-4 text-yellow-600">

                ₹{pendingRevenue}

              </h2>

            </div>

          </div>

          <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">

            <table className="w-full">

              <thead className="bg-zinc-100">

                <tr className="text-left text-zinc-600">
<th className="p-5">
  Receipt
</th>
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

                {payments.map(
                  (payment) => (

                  <tr
                    key={
                      payment._id
                    }
                    className="border-t border-zinc-100 hover:bg-zinc-50 transition-all duration-300"
                  >

                    <td className="p-5 font-medium text-zinc-900">

                      {
                        payment.memberName
                      }

                    </td>

                    <td className="p-5 text-zinc-600">

                      {
                        payment.plan
                      }

                    </td>

                    <td className="p-5 font-semibold text-zinc-900">

                      ₹
                      {
                        payment.amount
                      }

                    </td>

                    <td className="p-5 text-zinc-500">

                      {new Date(
                        payment.paymentDate
                      ).toDateString()}

                    </td>

                    <td className="p-5">
<td className="p-5">

  <button
    onClick={() =>
      generateReceipt(payment)
    }
    className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
  >

    Download

  </button>

</td>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          payment.paymentStatus
                          === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {
                          payment.paymentStatus
                        }

                      </span>

                    </td>

                  </tr>

                ))}

                {payments.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-14 text-zinc-400 text-lg"
                    >

                      No payment records found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payments;
        return (
          acc +
          Number(curr.amount)
        );
      },
      0
    );

  const pendingRevenue =
    payments
    .filter(
      (p) =>
        p.paymentStatus
        === "Pending"
    )
    .reduce(
      (acc, curr) => {

        return (
          acc +
          Number(curr.amount)
        );
      },
      0
    );

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

              Payments

            </h1>

            <p className="text-zinc-500 mt-2 text-lg">

              Manage gym revenue and transactions

            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Total Revenue

              </p>

              <h2 className="text-5xl font-bold mt-4 text-zinc-900">

                ₹{totalRevenue}

              </h2>

            </div>

            <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">

              <p className="text-zinc-500 text-sm">

                Pending Revenue

              </p>

              <h2 className="text-5xl font-bold mt-4 text-yellow-600">

                ₹{pendingRevenue}

              </h2>

            </div>

          </div>

          <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">

            <table className="w-full">

              <thead className="bg-zinc-100">

                <tr className="text-left text-zinc-600">
<th className="p-5">
  Receipt
</th>
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

                {payments.map(
                  (payment) => (

                  <tr
                    key={
                      payment._id
                    }
                    className="border-t border-zinc-100 hover:bg-zinc-50 transition-all duration-300"
                  >

                    <td className="p-5 font-medium text-zinc-900">

                      {
                        payment.memberName
                      }

                    </td>

                    <td className="p-5 text-zinc-600">

                      {
                        payment.plan
                      }

                    </td>

                    <td className="p-5 font-semibold text-zinc-900">

                      ₹
                      {
                        payment.amount
                      }

                    </td>

                    <td className="p-5 text-zinc-500">

                      {new Date(
                        payment.paymentDate
                      ).toDateString()}

                    </td>

                    <td className="p-5">
<td className="p-5">

  <button
    onClick={() =>
      generateReceipt(payment)
    }
    className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
  >

    Download

  </button>

</td>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          payment.paymentStatus
                          === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {
                          payment.paymentStatus
                        }

                      </span>

                    </td>

                  </tr>

                ))}

                {payments.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-14 text-zinc-400 text-lg"
                    >

                      No payment records found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payments;