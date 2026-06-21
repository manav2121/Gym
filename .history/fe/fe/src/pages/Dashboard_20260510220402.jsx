import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
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
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Gym Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold">
            Total Members
          </h2>

          <p className="text-3xl font-bold mt-3">
            {members.length}
          </p>
        </div>

      </div>

      <div className="grid gap-5">

        {members.map((member) => {

          const expiryDate = new Date(member.expiryDate);
          const today = new Date();

          const isExpired = expiryDate < today;

          return (
            <div
              key={member._id}
              className={`p-5 rounded-2xl shadow text-white
              ${isExpired ? "bg-red-500" : "bg-green-600"}`}
            >

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

              <p className="font-bold mt-2">
                {isExpired ? "Expired" : "Active"}
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Dashboard;