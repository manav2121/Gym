import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Members() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/members/all"
      );

      setMembers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Members
        </h1>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <table className="w-full">

            <thead className="bg-white/10 text-left">

              <tr>

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

              {members.map((member) => {

                const isExpired =
                  new Date(member.expiryDate)
                  < new Date();

                return (
                  <tr
                    key={member._id}
                    className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
                  >

                    <td className="p-5 font-semibold">
                      {member.name}
                    </td>

                    <td className="p-5">
                      {member.phone}
                    </td>

                    <td className="p-5">
                      {member.plan}
                    </td>

                    <td className="p-5">
                      {new Date(
                        member.expiryDate
                      ).toDateString()}
                    </td>

                    <td className="p-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                        ${isExpired
                          ? "bg-red-500/20 text-red-300"
                          : "bg-green-500/20 text-green-300"
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

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Members;