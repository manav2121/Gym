import Sidebar from "../components/Sidebar";

function Analytics() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Analytics
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

            <h2 className="text-3xl font-bold mb-6">
              Membership Growth
            </h2>

            <div className="h-[300px] flex items-end gap-6">

              <div className="bg-green-500 w-16 h-40 rounded-t-2xl"></div>

              <div className="bg-green-500 w-16 h-52 rounded-t-2xl"></div>

              <div className="bg-green-500 w-16 h-28 rounded-t-2xl"></div>

              <div className="bg-green-500 w-16 h-64 rounded-t-2xl"></div>

              <div className="bg-green-500 w-16 h-48 rounded-t-2xl"></div>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

            <h2 className="text-3xl font-bold mb-6">
              Revenue Analytics
            </h2>

            <div className="space-y-6">

              <div>
                <p className="text-gray-400 mb-2">
                  Monthly Revenue
                </p>

                <div className="w-full bg-white/10 rounded-full h-5">
                  <div className="bg-green-500 h-5 rounded-full w-[80%]"></div>
                </div>
              </div>

              <div>
                <p className="text-gray-400 mb-2">
                  Member Retention
                </p>

                <div className="w-full bg-white/10 rounded-full h-5">
                  <div className="bg-blue-500 h-5 rounded-full w-[65%]"></div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;