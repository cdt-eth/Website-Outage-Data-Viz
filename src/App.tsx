import "./App.css";
import Chart from "./components/Chart";
import Header from "./components/Header";
import { useState, useEffect } from "react";

export interface Item {
  bytes_used: number | any;
  timestamp: number | any;
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();

      const convertBytesAndTime = data.map((item: Item) => {
        item = {
          ...item,
          bytes_used: (item.bytes_used / 1048576).toFixed(2),
          timestamp: new Date(item.timestamp * 1000).toISOString(),
        };
        return item;
      });

      setData(convertBytesAndTime);
    };

    fetchData();
  }, []);

  const pages = [
    "",
    "data",
    "player",
    "analytics",
    "processes",
    "processes/editor",
  ];

  return (
    <div className="App">
      <Header />
      <main>
        {pages.map((page) => (
          <Chart key={page} data={data} page={page} />
        ))}
      </main>
    </div>
  );
}

export default App;
