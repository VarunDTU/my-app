import axios from "axios";
import { useEffect, useState } from "react";
import { DynamicAnalysisByYearLine } from "../components/chart";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
export default function Analysis() {
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
  const [Choice, setChoice] = useState({
    lineAxis: "sector",
    yAxis: "intensity",
  });
  return (
    <div className="">
      <Navbar> </Navbar>
      <div className="flex flex-row">
        <Sidebar page={"analysis"}></Sidebar>
        {gData ? (
          <div className="w-full">
            <div className="text-center text-2xl font-bold">
              Analysis via year sector{" "}
              <div className="text-base font-medium">
                <div>
                  <label for="cars">Line Axis</label>

                  <select
                    name="LineAxis"
                    className="mx-2 border-1 border-black rounded bg-blue-200"
                    onChange={(e) => {
                      setChoice({ ...Choice, lineAxis: e.target.value });
                    }}
                  >
                    <option value="pestle" className="mx-2 border-1">
                      Pestle
                    </option>
                    <option value="sector" className="mx-2 border-1">
                      Sector
                    </option>
                    {/* <option value="topic">Source</option> */}
                    <option value="region" className="mx-2 border-1">
                      Region
                    </option>
                  </select>
                </div>
                <div>
                  <label for="cars">Y- Axis</label>

                  <select
                    name="LineAxis"
                    onChange={(e) => {
                      setChoice({ ...Choice, yAxis: e.target.value });
                    }}
                    className="mx-2 border-1 border-black rounded bg-blue-200"
                  >
                    <option value="intensity">intensity</option>
                    <option value="relevance">relevance</option>
                    {/* <option value="relevance">relevance</option> */}
                    <option value="likelihood">likelihood</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full">
              <DynamicAnalysisByYearLine
                data={gData}
                lineAxis={Choice.lineAxis}
                yAxis={Choice.yAxis}
              ></DynamicAnalysisByYearLine>
            </div>
            {/* <div className="w-full">
            <DynamicAnalysisByYearLine
              lineAxis={"topic"}
              data={Data}
            ></DynamicAnalysisByYearLine>
          </div> */}
          </div>
        ) : (
          <div className="w-screen h-scree flex items-center justify-center">
            Loading
          </div>
        )}
      </div>
    </div>
  );
}
