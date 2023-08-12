"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

interface TaskProps {
  task: ITask;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, text: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, deleteTask, toggleComplete, editTask }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleEditTask: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editTask(task.id, taskToEdit);
    setOpenModalEdit(false);
  };

  return (
    <tr>
      <td>
        <div
          className={`flex items-center gap-4 ${task.completed ? "line-through opacity-70" : ""}`}
        >
          <input
            type="checkbox"
            name="radio-1"
            className="radio"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          {task.text}
        </div>
      </td>
      <td className="flex gap-5">
        <FiEdit
          className="text-blue-500"
          size={25}
          cursor={"pointer"}
          onClick={() => setOpenModalEdit(true)}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleEditTask}>
            <h3 className="font-bold text-lg">Mettre à jour la tâche</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder="Entrez une tâche"
                className="input input-bordered w-full"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
              />
              <button type="submit" className="btn">
                Ajouter
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          className="text-red-500"
          size={25}
          cursor={"pointer"}
          onClick={() => setOpenModalDelete(true)}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Êtes vous sur de vouloir supprimer cette tâche ?</h3>
          <div className="modal-action">
            <button className="btn" onClick={() => deleteTask(task.id)}>
              Oui
            </button>
            <button className="btn" onClick={() => setOpenModalDelete(false)}>
              Non
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
