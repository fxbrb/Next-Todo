"use client";

import { ITask } from "@/types/tasks";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import FilterTask from "./components/FilterTask";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filtered, setFiltered] = useState<ITask[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    setFiltered(tasks);
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask = [...tasks, { id: uuidv4(), text: text, completed: false }];
    setTasks(newTask);
  };

  const editTask = (id: string, text: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: text } : task)));
    toast.success("Tâche modifiée!");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Tâche supprimé!");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const completedFilter = () => {
    const completed = tasks.filter((task) => task.completed === true);
    if (tasks.length === 0) {
      toast.error('Aucune tâche disponible')
      return
    }
    if (!completed.length) {
      toast.error("Aucune tâche a été complèter");
      return
    }

    setFiltered(completed);
  };

  const uncompletedFilter = () => {
    const uncompleted = tasks.filter((task) => task.completed === false);
    if (tasks.length === 0) {
      toast.error('Aucune tâche disponible')
      return
    }
    if (!uncompleted.length) {
      toast.error("Toute les tâches ont été complèter");
      return
    }

    setFiltered(uncompleted);
  };

  return (
    <div>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask addTask={addTask} />
      </div>
      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
        filtered={filtered}
      />

      <FilterTask
        completedFilter={completedFilter}
        setFiltered={setFiltered}
        tasks={tasks}
        uncompletedFilter={uncompletedFilter}
      />
    </div>
  );
}
