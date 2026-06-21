import Sidebar from "../components/Sidebar";

function Settings() {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] w-full p-10">

        <h1 className="text-5xl font-bold mb-8">
          Settings
        </h1>

        <div className="space-y-6 max-w-2xl">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-2">
              Gym Name
            </h2>

            <input
              type="text"
              placeholder="रामेष्ट Fitness Zone"
              className="w-full bg-black/40 p-4 rounded-2xl"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-2">
              WhatsApp Notifications
            </h2>

            <button className="bg-green-500 px-6 py-3 rounded-2xl font-semibold">
              Enabled
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;