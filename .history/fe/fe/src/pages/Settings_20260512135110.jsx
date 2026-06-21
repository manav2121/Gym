import Sidebar from "../components/Sidebar";

function Settings() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Settings
        </h1>

        <div className="space-y-8 max-w-3xl">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Gym Details
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Gym Name"
                className="w-full bg-black/40 p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-black/40 p-4 rounded-2xl"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-black/40 p-4 rounded-2xl"
              />

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Notifications
            </h2>

            <button className="bg-green-500 px-6 py-3 rounded-2xl font-bold">
              WhatsApp Notifications Enabled
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;