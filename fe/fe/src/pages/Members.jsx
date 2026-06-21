import * as XLSX from "xlsx";

import { saveAs }
from "file-saver";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar
from "../components/Sidebar";

function Members({
  sidebarOpen,
  setSidebarOpen,
}) {

  const [members, setMembers] =
    useState([]);

  useEffect(() => {

    fetchMembers();

  }, []);

  const fetchMembers =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
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

  const exportMembers = () => {

    const exportData =
      members.map(
        (member) => ({

          Name:
            member.name,

          Phone:
            member.phone,

          Plan:
            member.plan,

          Expiry:
            new Date(
              member.expiryDate
            ).toDateString(),

          Status:
            new Date(
              member.expiryDate
            ) < new Date()
              ? "Expired"
              : "Active",

        })
      );

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Members"
    );

    const excelBuffer =
      XLSX.write(
        workbook,
        {
          bookType: "xlsx",
          type: "array",
        }
      );

    const fileData =
      new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

    saveAs(
      fileData,
      "Members_Report.xlsx"
    );
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

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

            <div>

              <h1 className="text-5xl font-bold tracking-tight text-zinc-900">

                Members

              </h1>

              <p className="text-zinc-500 mt-2 text-lg">

                Manage all gym members

              </p>

            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={
                  exportMembers
                }
                className="bg-zinc-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-sm"
              >

                Export Excel

              </button>

              <div className="bg-white border border-zinc-200 px-6 py-3 rounded-2xl text-zinc-700 font-semibold shadow-sm">

                {
                  members.length
                }
                {" "}
                Members

              </div>

            </div>

          </div>

          <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">

            <table className="w-full">

              <thead className="bg-zinc-100">

                <tr className="text-left text-zinc-600">

                  <th className="p-5">
                    Name
                  </th>

                  <th className="p-5">
                    Phone
                  </th>

                  <th className="p-5">
                    Plan
                  </th>

                  <th className="p-5">
                    Expiry
                  </th>

                  <th className="p-5">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {members.map(
                  (member) => {

                  const isExpired =
                    new Date(
                      member.expiryDate
                    ) < new Date();

                  return (

                    <tr
                      key={
                        member._id
                      }
                      className="border-t border-zinc-100 hover:bg-zinc-50 transition-all duration-300"
                    >

                      <td className="p-5 font-semibold text-zinc-900">

                        {
                          member.name
                        }

                      </td>

                      <td className="p-5 text-zinc-600">

                        {
                          member.phone
                        }

                      </td>

                      <td className="p-5 text-zinc-600">

                        {
                          member.plan
                        }

                      </td>

                      <td className="p-5 text-zinc-500">

                        {new Date(
                          member.expiryDate
                        ).toDateString()}

                      </td>

                      <td className="p-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            isExpired
                              ? "bg-rose-100 text-rose-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >

                          {isExpired
                            ? "Expired"
                            : "Active"}

                        </span>

                      </td>

                    </tr>

                  );
                })}

                {members.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-14 text-zinc-400 text-lg"
                    >

                      No members found

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

export default Members;