import "./App.css";
import Chart from "./components/Chart";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Chart page={""} />
        <Chart page={"data"} />
        <Chart page={"player"} />
        <Chart page={"analytics"} />
        <Chart page={"processes"} />
        <Chart page={"processes/editor"} />
      </main>
    </div>
  );
}

export default App;
