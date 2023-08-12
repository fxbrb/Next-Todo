"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

type AddTaskProps = {
  addTask: (task: string) => void;
};

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (taskValue.trim() === "") {
      toast.error("Le champ ne peut pas être vide.");
    } else {
      addTask(taskValue);
      setTaskValue("");
      setModalOpen(false);
      toast.success(`${taskValue} ajouté avec succès!`);
    }
  };
  return (
    <div className="mt-5">
      <button className="btn w-full" onClick={() => setModalOpen(true)}>
        Ajouter une tâche <AiOutlinePlus size={18} className="ml-2" />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Ajouter une nouvelle tâche</h3>
          <div className="modal-action">
            <input
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              type="text"
              placeholder="Entrez une tâche"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
