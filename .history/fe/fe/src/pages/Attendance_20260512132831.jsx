import Sidebar from "../components/Sidebar";

function Attendance() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-8">
          Attendance
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <p className="text-2xl text-gray-300">
            QR attendance system coming soon.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Attendance;