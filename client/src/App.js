import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const dragonsRoute = "http://localhost:3001/dragons";

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [dragonType, setDragonType] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");

  const [dragonsList, setDragonsList] = useState([])

  // Add dragon POST request
  const addDragon = () => {
    axios
      .post(dragonsRoute, {
        name: name,
        age: age,
        dragonType: dragonType,
        gender: gender,
        size: size,
      })
      .then(setDragonsList([...dragonsList, {
        name: name,
        age: age,
        dragonType: dragonType,
        gender: gender,
        size: size,
      }]));
  };

  // Get dragons GET request
  const getDragons = () => {
    axios.get(dragonsRoute).then((response) => {
      console.log(response);
      setDragonsList(response.data);
    })
  }

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
        <hr width="100%" height="1px"/>
        <div className="dragonButton" onClick={getDragons}><button>Show Dragons</button></div>
        <div className="dragonsList">
          <h2>Dragons</h2>
          {dragonsList.map((val, key) => {
            return <div className="dragonItem">
            <hr width="100%" height="1px"/>
            <h3>Name: {val.name}, Age: {val.age}, Dragon Type: {val.dragonType}, <br/> Gender: {val.gender}, Size: {val.size}</h3>
            <hr width="100%" height="1px"/>
            </div>
          })}
        </div>
        
      </div>
    </div>
  );
}

export default App;
