import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Bar = ({ page }) => {
  const [data, setData] = useState([]);
  const [crash, setCrash] = useState(false);

  const crashButton = () => {
    setCrash((crash) => !crash);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();

      data.forEach(
        (data) => (data.bytes_used = (data.bytes_used / 1048576).toFixed(2))
      );

      data.forEach(
        (data) =>
          (data.timestamp = new Date(data.timestamp * 1000).toISOString())
      );

      const pageData = data.filter((d) => d.current_page === `/${page}`);
      const crashedData = pageData.filter((d) => d.did_aww_snap === crash);

      setData(crashedData);
    };

    fetchData();
  }, [crash, page]);

  const d = [
    {
      x: data.map((item) => item.timestamp),
      y: data.map((item) => item.bytes_used),
      hoverinfo: "x+y",
      type: "scatter",
      fill: "tozeroy",
      mode: "markers",
      marker: {
        size: 5,
      },
    },
  ];

  return (
    <div className="container">
      {data && (
        <Plot
          data={d}
          layout={{
            hovermode: "closest",
            title: `<em>www.tulip.com/${page}</em>`,
            xaxis: {
              autorange: true,
              type: "date",
              title: "<b>Date & Time</b>",
            },
            yaxis: {
              autorange: true,
              title: "<b>Megabytes Used (MB)</b>",
              tickformat: ".1f",
            },
          }}
        />
      )}

      <div className="info">
        <button
          onClick={crashButton}
          type="button"
          className={`btn ${crash === false ? "error" : "good"}`}
        >
          {`set crash to ${!crash}`}
        </button>
        {crash === true && (
          <>
            <h3># of crashes: {data.length}</h3>

            <h3>
              Total Memory Leak:{" "}
              {(
                data
                  .map((item) => parseInt(item.bytes_used))
                  .reduce((prev, next) => prev + next) / 1000
              ).toFixed(2)}
              GB
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Bar;
