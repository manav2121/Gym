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

import {

  Link,
  useLocation,
  useNavigate,

} from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

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
        className="fixed top-5 left-5 z-50 bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm hover:bg-zinc-100 transition-all duration-300"
      >

        {sidebarOpen
          ? <X size={22} />
          : <Menu size={22} />
        }

      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-[240px] bg-white border-r border-zinc-200 p-6 z-40 transition-all duration-500 shadow-sm
        ${
          sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }`}
      >

        <div className="mt-24">

         

          <div className="space-y-2">

            {menuItems.map(
              (item, index) => {

              const active =
                location.pathname
                === item.path;

              return (

                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >

                  <div>

                    {item.icon}

                  </div>

                  <span className="font-medium">

                    {item.label}

                  </span>

                </Link>

              );
            })}

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 right-6 bg-zinc-900 hover:bg-black text-white flex items-center justify-center gap-3 py-3 rounded-2xl transition-all duration-300"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </>
  );
}

export default Sidebar;