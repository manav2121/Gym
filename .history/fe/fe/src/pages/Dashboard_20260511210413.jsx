import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

function Dashboard() {

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

const [renewPlans, setRenewPlans] = useState({});
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

  const deleteMember = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/members/delete/${id}`
      );

      fetchMembers();

    } catch (error) {
      console.log(error);
    }
  };
const renewMembership = async (id) => {

  try {

    const selectedPlan =
      renewPlans[id];

    if (!selectedPlan) {
      alert("Please select a plan");
      return;
    }

    await axios.put(
      `http://localhost:5000/api/members/renew/${id}`,
      {
        plan: selectedPlan,
      }
    );

    fetchMembers();

  } catch (error) {
    console.log(error);
  }

  
};
  const filteredMembers = useMemo(() => {

    return members.filter((member) =>
      member.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [members, search]);

  const activeMembers = members.filter((member) => {
    return new Date(member.expiryDate) > new Date();
  }).length;

  const expiredMembers = members.filter((member) => {
    return new Date(member.expiryDate) < new Date();
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-6 py-8 overflow-hidden">

      <div className="max-w-7xl mx-auto relative">

        <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

        <div className="relative z-10">

         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

  <div>

    <h1 className="text-6xl font-black leading-relaxed bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
      रामेष्ट Fitness Zone
    </h1>

    <p className="text-gray-400 text-xl mt-2">
      Smart Gym Management System
    </p>

  </div>

  <Link
    to="/add-member"
    className="bg-gradient-to-r from-green-400 to-emerald-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold shadow-2xl text-lg"
  >
    + Add Member
  </Link>

</div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-7 rounded-3xl shadow-2xl backdrop-blur-xl">

              <p className="text-gray-400 text-lg">
                Total Members
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {members.length}
              </h2>

            </div>

            <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-lime-400 p-7 rounded-3xl shadow-2xl">

              <p className="text-lg font-medium">
                Active Members
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {activeMembers}
              </h2>

            </div>

            <div className="bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 p-7 rounded-3xl shadow-2xl">

              <p className="text-lg font-medium">
                Expired Members
              </p>

              <h2 className="text-5xl font-bold mt-4">
                {expiredMembers}
              </h2>

            </div>

          </div>

          <div className="bg-black/30 border border-gray-800 rounded-3xl p-6 mb-10 shadow-2xl backdrop-blur-xl">
            <input
              type="text"
              placeholder="Search members by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-lg placeholder:text-gray-500"
            />

          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {filteredMembers.map((member) => {

              const expiryDate = new Date(member.expiryDate);
              const today = new Date();

              const isExpired = expiryDate < today;

              return (
                <div
                  key={member._id}
                 className={`rounded-3xl p-8 shadow-2xl border transition-all duration-300 hover:scale-[1.02]
                  ${isExpired
                    ? "bg-gradient-to-br from-red-700 to-red-500 border-red-400"
                    : "bg-gradient-to-br from-green-700 to-green-500 border-green-400"
                  }`}
                >

                  <div className="flex justify-between items-start gap-4">

                    <div>

                      <h2 className="text-3xl font-bold">
                        {member.name}
                      </h2>

                      <div className="space-y-2 mt-4 text-lg">

                        <p>
                          📞 {member.phone}
                        </p>

                        <p>
                          📧 {member.email}
                        </p>

                        <p>
                          🏋️ Plan: {member.plan}
                        </p>

                        <p>
                          ⏳ Expiry:
                          {" "}
                          {expiryDate.toDateString()}
                        </p>

                      </div>

                    </div>

                    <div className="flex flex-col gap-3">
<select
  value={renewMonths}
  onChange={(e) =>
    setRenewMonths(Number(e.target.value))
  }
  className="bg-black/40 px-4 py-2 rounded-xl"
>

  <option value={1}>
    1 Month
  </option>

  <option value={3}>
    3 Months
  </option>

  <option value={6}>
    6 Months
  </option>

  <option value={12}>
    12 Months
  </option>

</select>
                      <button
  onClick={() =>
    renewMembership(member._id)
  }
  className="bg-black/40 hover:bg-black/60 px-5 py-2 rounded-xl backdrop-blur-lg"
>
  Renew
</button>

                      <button
                        onClick={() => deleteMember(member._id)}
                        className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-xl font-semibold"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;