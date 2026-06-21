import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          FitTrack Dashboard
        </h1>

        <Link
          to="/add-member"
          className="bg-green-500 px-5 py-3 rounded-xl"
        >
          Add Member
        </Link>

      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Total Members
          </h2>

          <p className="text-4xl font-bold mt-3">
            {members.length}
          </p>
        </div>

        <div className="bg-green-600 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Active Members
          </h2>

          <p className="text-4xl font-bold mt-3">
            {activeMembers}
          </p>
        </div>

        <div className="bg-red-600 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Expired Members
          </h2>

          <p className="text-4xl font-bold mt-3">
            {expiredMembers}
          </p>
        </div>

      </div>

      <input
        type="text"
        placeholder="Search Members"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl bg-gray-800 mb-8"
      />

      <div className="grid gap-5">

        {filteredMembers.map((member) => {

          const expiryDate = new Date(member.expiryDate);
          const today = new Date();

          const isExpired = expiryDate < today;

          return (
            <div
              key={member._id}
              className={`p-5 rounded-2xl shadow-lg
              ${isExpired
                ? "bg-red-500"
                : "bg-green-600"
              }`}
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {member.name}
                  </h2>

                  <p className="mt-2">
                    Phone: {member.phone}
                  </p>

                  <p>
                    Email: {member.email}
                  </p>

                  <p>
                    Plan: {member.plan}
                  </p>

                  <p>
                    Expiry:
                    {" "}
                    {expiryDate.toDateString()}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => deleteMember(member._id)}
                    className="bg-black px-4 py-2 rounded-lg"
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
  );
}

export default Dashboard;