import { useState, useEffect } from 'react';
import axios from 'axios';

const url = "http://localhost:3001";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Hae tehtävät palvelimelta kun komponentti latautuu
  useEffect(() => {
    axios.get(url)
      .then(response => setTasks(response.data))
      .catch(error => alert(error.message));
  }, []);

  // Lisää uusi tehtävä
  const addTask = () => {
    const newTask = { description: task };
    axios.post(url + "/create", { task: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTask("");
      })
      .catch(error => alert(error.message));
  };

  // Poista tehtävä
  const deleteTask = (id) => {
    axios.delete(url + "/delete/" + id)
      .then(() => {
        setTasks(tasks.filter(item => item.id !== id));
      })
      .catch(error => alert(error.message));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tehtävälista</h1>
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
        placeholder="Kirjoita tehtävä"
      />
      <button onClick={addTask}>Lisää</button>

      <ul>
        {tasks.map(item => (
          <li key={item.id}>
            {item.description}
            <button onClick={() => deleteTask(item.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;