import Sidebar from "../components/Sidebar";

function Analytics() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-8">
          Analytics
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-2xl text-gray-300">
          Charts & analytics coming soon.
        </div>

      </div>

    </div>
  );
}

export default Analytics;