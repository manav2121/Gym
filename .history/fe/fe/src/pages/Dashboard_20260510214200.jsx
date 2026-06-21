import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/members/all"
    );

    setMembers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Gym Dashboard
      </h1>

      <div className="grid gap-4">

        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">
              {member.name}
            </h2>

            <p>Phone: {member.phone}</p>
            <p>Email: {member.email}</p>
            <p>Plan: {member.plan}</p>

            <p>
              Expiry:
              {" "}
              {new Date(
                member.expiryDate
              ).toDateString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;