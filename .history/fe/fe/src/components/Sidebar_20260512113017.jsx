import {
  return (
    <div className="w-[280px] min-h-screen bg-black/40 border-r border-white/10 backdrop-blur-xl p-6 fixed left-0 top-0">

      <div className="mb-12">

        <h1 className="text-4xl font-black leading-relaxed bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
          रामेष्ट
        </h1>

        <p className="text-gray-400 mt-2">
          Fitness Zone
        </p>

      </div>

      <div className="space-y-3">

        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 text-left"
          >

            <div className="text-green-400">
              {item.icon}
            </div>

            <span className="text-lg font-medium">
              {item.label}
            </span>

          </button>
        ))}

      </div>

      <button className="absolute bottom-8 left-6 right-6 bg-red-500/20 hover:bg-red-500/30 text-red-300 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all duration-300">

        <LogOut size={20} />

        Logout

      </button>

    </div>
  );
}

export default Sidebar;