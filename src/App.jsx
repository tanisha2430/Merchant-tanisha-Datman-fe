import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/home/Home";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const currentTime = Date.now();

      storedTasks.forEach((task) => {
        if (!task.reminderDate) return;

        const reminderTime = new Date(task.reminderDate).getTime();

        if (reminderTime <= currentTime && !task.alertShown) {
          alert(` Reminder: ${task.title}\n ${task.description}`);

          task.alertShown = true;
          localStorage.setItem("tasks", JSON.stringify(storedTasks));
        }
      });
    };

    const interval = setInterval(checkReminders, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;