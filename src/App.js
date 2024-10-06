import './App.css'; 
import React, { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const api = {
    key: "0b39fab402623a3aea1ac2f7cbaa0a19",
    url: "https://api.openweathermap.org/data/2.5/weather",
  };
  const Data = () => {
    setLoading(true);
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then((x) => x.json())
      .then((res) => {
        setResponse(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setLoading(false);
      });
  };
  console.log(response);
  const KeyPress = (e) => {
    if (e.key === "Enter") {
      Data();
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name"
          onKeyPress={KeyPress}
        />
        <button onClick={Data}>Search</button>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : response.name ? (
            <>
              <p> {response.name}</p>
              {response.main && <p>{response.main.temp} C</p>}
            </>
          ) : (
            <p>No city found</p>
          )}
        </div>
      </div>
    </>
  );
};
export default App;

