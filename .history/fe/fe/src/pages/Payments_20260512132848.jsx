import Sidebar from "../components/Sidebar";

function Payments() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-8">
          Payments
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

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

      </div>

    </div>
  );
}

export default Payments;