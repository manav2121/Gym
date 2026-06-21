import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  IndianRupee,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const navigate =
    useNavigate();

  const menuItems = [

    {
      icon:
        <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/",
    },

    {
      icon:
        <Users size={20} />,
      label: "Members",
      path: "/members",
    },

    {
      icon:
        <CalendarCheck size={20} />,
      label: "Attendance",
      path: "/attendance",
    },

    {
      icon:
        <IndianRupee size={20} />,
      label: "Payments",
      path: "/payments",
    },

    {
      icon:
        <BarChart3 size={20} />,
      label: "Analytics",
      path: "/analytics",
    },

    {
      icon:
        <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },

  ];

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <>

      <button
        onClick={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
        className="fixed top-5 left-5 z-50 bg-white/10 backdrop-blur-xl border border-white/10 p-3 rounded-2xl hover:bg-white/20 transition-all duration-300"
      >

        {sidebarOpen
          ? <X size={24} />
          : <Menu size={24} />
        }

      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-[220px] bg-black/60 backdrop-blur-2xl border-r border-white/10 p-6 z-40 transition-all duration-500
        ${
          sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }`}
      >

        <div className="mt-20 space-y-3">

          {menuItems.map(
            (item, index) => (

            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all duration-300"
            >

              <div className="text-emerald-400">
                {item.icon}
              </div>

              <span className="text-base font-medium">
                {item.label}
              </span>

            </Link>

          ))}

        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 right-6 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/20 text-white flex items-center justify-center gap-3 py-3 rounded-2xl transition-all duration-300"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </>
  );
}

export default Sidebar;