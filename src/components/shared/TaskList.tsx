import React from "react";
import NotFoundImageLight from "../../assets/not-found-tasks-light.png";
import NotFoundImageDark from "../../assets/not-found-tasks-dark.png";
import { useTheme } from "./ThemeProvider";
import { fetchTasks, selectStatus, selectTasks } from "@/redux/slices/todosSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFilter } from "@/redux/slices/filterSlice";
import { cn } from "@/lib/utils";
import { TaskItem } from '../shared'
import SkeletonTask from "./SkeletonTask";

interface Props {
  className?: string;
}

const TaskList: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { sortBy, search } = useAppSelector(selectFilter);
  const { theme } = useTheme();
  const tasks = useAppSelector(selectTasks);
  const status = useAppSelector(selectStatus)
  const sortedTasks = tasks
    .filter((task) => {
      switch (sortBy) {
        case "all":
          return task;
        case "complete":
          return task.isCompleted === true;
        case "incomplete":
          return task.isCompleted === false;
      }
    })
    .filter((item) => { return item.title.toLowerCase().includes(search) });

  React.useEffect(() => {
    dispatch(fetchTasks())
  }, []);

  if (status === 'loading') {
    return (
      <>
        {[...Array(5)].map(() => <SkeletonTask />)}
      </>
    )
  }
  if (status === 'error') {
    return (
      <div>
        {theme === "light" ? (
          <img className="m-auto" src={NotFoundImageLight} alt="" />
        ) : (
          <img className="m-auto" src={NotFoundImageDark} alt="" />
        )}
      </div>
    );
  }
  return (
    <>
      <div className={cn(className, "m-auto w-full max-w-[520px]")}>
        <div className="flex gap-10">
          <ul className="grow">
            {sortedTasks?.map((item, i) => (
              <li key={item.id}>
                <TaskItem
                  userId={item.userId}
                  id={item.id}
                  content={item.content}
                  title={item.title}
                  isCompleted={item.isCompleted}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default React.memo(TaskList);
