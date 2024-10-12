import { MdAutoGraph, MdDashboard } from "react-icons/md";

export default function Sidebar(props) {
  return (
    <div className="w-20 min-h-screen border-black bg-gray-300 rounded-lg justify-center  p-2 ">
      <a href="/">
        <MdDashboard
          size={40}
          className={`text-blue-600 hover:text-blue-300 transition-all cursor-pointer rounded-lg w-full items-center flex my-2 ${
            props.page === "dashboard"
              ? "border-black border-2"
              : "bg-transparent"
          } `}
          title="Dashboard"
        />
      </a>
      <a href="/analysis">
        <MdAutoGraph
          size={40}
          className={`text-blue-600 hover:text-blue-300 transition-all cursor-pointer rounded-lg w-full items-center flex my-2 ${
            props.page === "analysis"
              ? "border-black border-2"
              : "bg-transparent"
          } `}
          title="Analysis"
        />
      </a>
    </div>
  );
}
