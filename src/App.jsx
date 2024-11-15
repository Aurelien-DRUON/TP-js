import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [countdown, setCountdown] = useState(10);

  const [persons, setPersons] = useState([
    { name: "Angele Decamps", age: 28 },
    { name: "Renekton Lux", age: 18 },
    { name: "Vladimir Zeri", age: 8 },
  ]);

  const handlePlusClick = useCallback(() => setCount(count + 1), [count]);
  const handleMinusClick = useCallback(() => setCount(count - 1), [count]);

  const handleTimeout = useCallback(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  }, [countdown]);

  const handleNameSort = useCallback(() => {
    setPersons([...persons].sort((a, b) => a.name.localeCompare(b.name)));
  }, [persons, setPersons]);

  const handleAgeSort = useCallback(() => {
    setPersons([...persons].sort((a, b) => a.age - b.age));
  }, [persons, setPersons]);

  return (
    <>
      <h1>{count}</h1>
      <div className="card">
        <button
          style={{ cursor: count >= 10 ? "not-allowed" : "pointer" }}
          disabled={count >= 10 ? true : false}
          onClick={handlePlusClick}
        >
          +
        </button>
        <button
          style={{ cursor: count <= -10 ? "not-allowed" : "pointer" }}
          disabled={count <= -10 ? true : false}
          onClick={handleMinusClick}
        >
          -
        </button>
      </div>
      <div>
        <button disabled={countdown <= 0} onClick={handleTimeout}>
          Heheheha
        </button>
        <p>{countdown}</p>
      </div>
      <div>
        <button onClick={handleNameSort}>Tri Nom</button>
        <button onClick={handleAgeSort}>Tri Age</button>
        {persons.map((person, index) => (
          <div key={index}>
            <p>
              {person.name} {person.age}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
