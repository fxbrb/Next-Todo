import { ITask } from "@/types/tasks";
import Task from "./Task";
import { Dispatch, SetStateAction } from "react";

interface TodoListProps {
  tasks: ITask[];
  filtered: ITask[];
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  deleteTask,
  toggleComplete,
  editTask,
  filtered,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-full">Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
