import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line, Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  BarElement,
  ArcElement,
  Filler
);
export function SectorNumberPieChart(props) {
  const GraphData = props.data;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  let empSal = {};
  let empAge = {};
  GraphData.filter((el) => el.intensity && el.title && el.sector).map((els) => {
    // const dateComponents = els.published.split(/[, ]+/);
    // const month = dateComponents[0]; // "January"
    // const day = parseInt(dateComponents[1], 10); // 19
    // const year = parseInt(dateComponents[2], 10);
    // console.log(year); // 2017
    // const time = dateComponents[3];
    if (empAge[els.sector]) {
      empAge[els.sector].push({ x: els.title, y: els.intensity });
    } else {
      empAge[els.sector] = [{ x: els.title, y: els.intensity }];
    }
  });

  const tempData = {
    labels: Object.entries(empAge).map((el) => el[0]),

    // datasets: [
    //   {
    //     label: "intensity trends",
    //     data: [],
    //   },
    // ],
    datasets: [
      {
        label: "reports per sector",
        data: Object.entries(empAge).map((el) => {
          return el[1].length;
        }),
      },
    ],
  };
  //console.log(tempData);
  return (
    <div className="">
      <h1>Chart</h1>
      {/* <Line options={options} data={tempData}></Line> */}
      <div className="">
        <Doughnut options={options} data={tempData}></Doughnut>
      </div>
    </div>
  );
}
export function PestlePieChart(props) {
  const GraphData = props.data;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        type: "logarithmic",
      },
    },
  };
  let empSal = {};
  let empAge = {};
  GraphData.filter((el) => el.pestle && el.published).map((els) => {
    const dateComponents = els.published.split(/[, ]+/);
    const month = dateComponents[0]; // "January"
    const day = parseInt(dateComponents[1], 10); // 19
    const year = parseInt(dateComponents[2], 10);
    // 2017
    const time = dateComponents[3];
    if (empAge[els.pestle]) {
      empAge[els.pestle].push({ year: year, intensity: els.intensity });
    } else {
      empAge[els.pestle] = [{ year: year, intensity: els.intensity }];
    }
  });

  const tempData = {
    labels: Object.entries(empAge).map((el) => el[1].year),

    // datasets: [
    //   {
    //     label: "intensity trends",
    //     data: [],
    //   },
    // ],
    datasets: Object.entries(empAge).map((el) => {
      return {
        label: el[0],
        data: Object.entries(el[1]).map((els) => {
          return { y: els[1].intensity, x: els[1].year };
        }),
      };
    }),
  };

  return (
    <div className="">
      <h1>Chart</h1>
      {/* <Line options={options} data={tempData}></Line> */}
      <div className="">
        <Scatter options={options} data={tempData}></Scatter>
      </div>
    </div>
  );
}
export function Articlesperyear(props) {
  const GraphData = props.data;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        type: "logarithmic",
        ticks: {
          minTicksLimit: 1, //minimum tick
          maxTicksLimit: 100, //maximum tick
        },
      },
    },
  };
  console.log(options);
  let empyears = {};
  let empAge = {};
  GraphData.filter((el) => el.published && el.title && el.sector).map((els) => {
    const dateComponents = els.published.split(/[, ]+/);
    // const month = dateComponents[0]; // "January"
    // const day = parseInt(dateComponents[1], 10); // 19
    const year = parseInt(dateComponents[2], 10).toString();
    if (year === "2007") {
      console.log(els.sector);
    }
    // const time = dateComponents[3];
    if (!empyears[year]) {
      empyears[year] = 1;
    }
    if (!empAge[els.sector]) {
      empAge[els.sector] = { [year]: 1 };
    } else if (!empAge[els.sector][year]) {
      empAge[els.sector][year] = 1;
    } else {
      empAge[els.sector][year] += 1;
    }
  });
  console.log(empAge);

  const tempData = {
    labels: Object.entries(empyears).map((el) => el[0]),
    //labels: "",

    // datasets: [
    //   {
    //     label: "intensity trends",
    //     data: [],
    //   },
    // ],
    datasets: Object.entries(empAge).map((el) => {
      const tempData = Object.entries(empyears).map((els) => {
        if (el[1][els[0]] != null && el[0] === "2007")
          console.log(el[1][els[0]]);
        return el[1][els[0]] != null ? el[1][els[0]] : 0;
      });
      return { label: el[0], data: tempData };
    }),
  };
  console.log(tempData);

  return (
    <div className="">
      <h1>Chart</h1>
      {/* <Line options={options} data={tempData}></Line> */}
      <div className="">
        <Bar options={options} data={tempData}></Bar>
      </div>
    </div>
  );
}

export function DynamicAnalysisByYearLine(props) {
  const lineAxis = props.lineAxis || "sector";
  const yAxis = props.yAxis || "intensity";
  console.log(lineAxis, yAxis);
  if (!lineAxis || !yAxis) {
    return <div>wrong props given</div>;
  }
  const GraphData = props.data;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `${lineAxis.toUpperCase()} vs ${yAxis.toUpperCase()}`,
      },
    },
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //     type: "logarithmic",
    //     ticks: {
    //       minTicksLimit: 1, //minimum tick
    //       maxTicksLimit: 100, //maximum tick
    //     },
    //   },
    // },
  };
  console.log(options);
  let empyears = {};
  let empAge = {};
  GraphData.filter((el) => el.published && el.title && el.sector).map((els) => {
    const dateComponents = els.published.split(/[, ]+/);
    // const month = dateComponents[0]; // "January"
    // const day = parseInt(dateComponents[1], 10); // 19
    const year = parseInt(dateComponents[2], 10).toString();

    // const time = dateComponents[3];
    if (!empyears[year]) {
      empyears[year] = 1;
    }
    if (!empAge[els[lineAxis]]) {
      empAge[els[lineAxis]] = { [year]: els[yAxis] };
    } else if (!empAge[els[lineAxis]][year]) {
      empAge[els[lineAxis]][year] = els[yAxis];
    }
  });

  const tempData = {
    labels: Object.entries(empyears).map((el) => el[0]),
    //labels: "",

    // datasets: [
    //   {
    //     label: "intensity trends",
    //     data: [],
    //   },
    // ],
    datasets: Object.entries(empAge).map((el) => {
      const tempData = Object.entries(empyears).map((els) => {
        if (el[1][els[0]] != null && el[0] === "2007")
          console.log(el[1][els[0]]);
        return el[1][els[0]] != null ? el[1][els[0]] : 0;
      });
      return { label: el[0], data: tempData, fill: true, tension: 0.2 };
    }),
  };
  console.log(tempData);

  return (
    <div className="">
      {/* <Line options={options} data={tempData}></Line> */}
      <div className="">
        <Line options={options} data={tempData}></Line>
      </div>
    </div>
  );
}
