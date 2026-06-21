import Sidebar from "../components/Sidebar";

function Members() {

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] p-10 w-full">

        <h1 className="text-5xl font-bold">
          Members Page
        </h1>

      </div>

    </div>
  );
}

export default Members;