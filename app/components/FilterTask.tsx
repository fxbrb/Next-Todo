import { ITask } from "@/types/tasks";
import { Dispatch, SetStateAction, useState } from "react";

interface FilterTask {
  tasks: ITask[];
  completedFilter: () => void;
  uncompletedFilter: () => void;
  setFiltered: Dispatch<SetStateAction<ITask[]>>;
}

const FilterTask: React.FC<FilterTask> = ({
  completedFilter,
  setFiltered,
  tasks,
  uncompletedFilter,
}) => {
  const [selected, setSelected] = useState<string>("all");
  return (
    <div className="flex gap-3 mt-3">
      <p
        className={`cursor-pointer ${selected === "all" ? "text-white font-bold" : ""}`}
        onClick={() => {
          setFiltered(tasks);
          setSelected("all");
        }}
      >
        All
      </p>
      <p
        className={`cursor-pointer ${selected === "complete" ? "text-white font-bold" : ""}`}
        onClick={() => {
          completedFilter();
          setSelected("complete");
        }}
      >
        complete
      </p>
      <p
        className={`cursor-pointer ${selected === "uncomplete" ? "text-white font-bold" : ""}`}
        onClick={() => {
          uncompletedFilter();
          setSelected("uncomplete");
        }}
      >
        uncomplete
      </p>
    </div>
  );
};

export default FilterTask;
