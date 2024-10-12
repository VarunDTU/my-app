import axios from "axios";
import { useEffect, useState } from "react";
import { Articlesperyear, PestlePieChart, SectorNumberPieChart } from "./chart";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
export default function Homepage() {
  const [gData, setGdata] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:8080/api/beta/getdata", {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/beta/getdata",
        headers: {},
      });

      setGdata(data.data);
    };
    fetchData();
    console.log(gData);
  }, []);
  return (
    <div className="w-full">
      <Navbar> </Navbar>

      {gData ? (
        <div className="flex flex-row">
          <Sidebar page={"dashboard"}></Sidebar>
          <div className="w-full">
            <div className="flex flex-row">
              <div className=" w-1/3 border-4 border-black p-2 m-2 rounded">
                <SectorNumberPieChart data={gData}></SectorNumberPieChart>
              </div>
              <div className="w-full border-4 border-black p-2 m-2 rounded">
                <Articlesperyear data={gData}></Articlesperyear>
              </div>
            </div>
            <div className="max-w-full border-4 border-black p-2 m-2 rounded">
              <PestlePieChart data={gData}></PestlePieChart>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-scree flex items-center justify-center">
          Loading
        </div>
      )}
    </div>
  );
}
