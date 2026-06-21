import Sidebar from "../components/Sidebar";

function Payments() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Payments
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-green-500/20 border border-green-500/30 rounded-3xl p-8">
            <p className="text-xl text-green-300">
              Monthly Revenue
            </p>

            <h2 className="text-5xl font-bold mt-4">
              ₹25,000
            </h2>
          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-3xl p-8">
            <p className="text-xl text-yellow-300">
              Pending Payments
            </p>

            <h2 className="text-5xl font-bold mt-4">
              ₹8,000
            </h2>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-3xl p-8">
            <p className="text-xl text-blue-300">
              Paid Members
            </p>

            <h2 className="text-5xl font-bold mt-4">
              18
            </h2>
          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <table className="w-full">

            <thead className="text-left border-b border-white/10">

              <tr>

                <th className="p-4">
                  Member
                </th>

                <th className="p-4">
                  Amount
                </th>

                <th className="p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b border-white/10">

                <td className="p-4">
                  Rahul
                </td>

                <td className="p-4">
                  ₹1500
                </td>

                <td className="p-4 text-green-400">
                  Paid
                </td>

              </tr>

              <tr>

                <td className="p-4">
                  Aman
                </td>

                <td className="p-4">
                  ₹2000
                </td>

                <td className="p-4 text-yellow-400">
                  Pending
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Payments;