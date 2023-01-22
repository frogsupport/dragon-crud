import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [dragonType, setDragonType] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");

  const displayDragonInformation = () => {
    console.log(
      "Dragon Information\n" +
        "Name: " +
        name +
        "\nAge: " +
        age +
        "\nDragon Type: " +
        dragonType +
        "\nGender: " +
        gender +
        "\nSize: " +
        size
    );
  };

  const addDragon = () => {
    axios
      .post("http://localhost:3001/dragons", {
        name: name,
        age: age,
        dragonType: dragonType,
        gender: gender,
        size: size,
      })
      .then(() => console.log("Success!\n" + Response.toString()));
    console.log("Request sent successfully");
    displayDragonInformation();
  };

  return (
    <div className="App">
      <div className="title">
        <h2>Dragon Database Application</h2>
        <p>Dragon Information</p>
      </div>
      <div className="input-information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(parseInt(event.target.value));
          }}
        />
        <label>Dragon Type:</label>
        <input
          type="text"
          onChange={(event) => {
            setDragonType(event.target.value);
          }}
        />
        <label>Gender:</label>
        <input
          type="text"
          onChange={(event) => {
            setGender(event.target.value);
          }}
        />
        <label>Size:</label>
        <input
          type="text"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <button onClick={addDragon}>Add Dragon</button>
      </div>
    </div>
  );
}

export default App;
