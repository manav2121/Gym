import Sidebar from "../components/Sidebar";

function Payments() {

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="ml-[280px] p-10 w-full">

        <h1 className="text-5xl font-bold">
          Payments Page
        </h1>

      </div>

    </div>
  );
}

export default Payments;