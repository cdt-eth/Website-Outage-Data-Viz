import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Chart = ({ page, data }) => {
  const [isCrashed, setIsCrashed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState([]);

  const crashButton = () => {
    setIsCrashed((isCrashed) => !isCrashed);
  };

  useEffect(() => {
    const pageData = data
      .filter((d) => d.current_page === `/${page}`)
      .filter((d) => d.did_aww_snap === isCrashed);

    setPageData(pageData);
    setIsLoading(false);
  }, [data, isCrashed, page]);

  const d = [
    {
      x: pageData.map((item) => item.timestamp),
      y: pageData.map((item) => item.bytes_used),
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
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
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
          className={`btn ${isCrashed === false ? "error" : "good"}`}
        >
          {`set crash to ${!isCrashed}`}
        </button>
        {isCrashed === true && (
          <>
            <h3># of crashes: {data.length}</h3>

            <h3>
              Total Memory Leak:{" "}
              {(
                data
                  // .map((item) => parseInt(item.bytes_used))
                  .map((item) => +item.bytes_used)
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

export default Chart;
