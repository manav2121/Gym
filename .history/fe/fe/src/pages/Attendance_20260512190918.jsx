import Sidebar from "../components/Sidebar";

function Attendance() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Attendance
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-green-500/20 border border-green-500/30 rounded-3xl p-8">
            <p className="text-xl text-green-300">
              Present Today
            </p>

            <h2 className="text-5xl font-bold mt-4">
              24
            </h2>
          </div>

          <div className="bg-blue-500/20 border border-blue-500/30 rounded-3xl p-8">
            <p className="text-xl text-blue-300">
              Total Check-ins
            </p>

            <h2 className="text-5xl font-bold mt-4">
              412
            </h2>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/30 rounded-3xl p-8">
            <p className="text-xl text-purple-300">
              Peak Hour
            </p>

            <h2 className="text-5xl font-bold mt-4">
              6 PM
            </h2>
          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-2xl text-gray-300">
          QR Attendance System Coming Soon
        </div>

      </div>

    </div>
  );
}

export default Attendance;