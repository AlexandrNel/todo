import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUpdatedTask, removeTask, Task } from "@/redux/slices/todosSlice";

import React from "react";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

interface Props extends Task {
  className?: string;
}

const TaskItem: React.FC<Props> = ({ className, isCompleted, title, id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [checkboxValue, setCheckboxValue] = React.useState(isCompleted);
  const [isEditingStatus, setIsEditingStatus] = React.useState(false);
  const [editingTitleValue, setEditingTitleValue] = React.useState(title);
  const handleRemoveTask = (id: string) => { window.confirm(`${t("Do you really want to remove the task?")}`) && dispatch(removeTask(id)) };
  const handleEditingMode = () => { setIsEditingStatus(!isEditingStatus); };
  const handleSwitchTaskStatus = (id: string, e: boolean) => {
    dispatch(fetchUpdatedTask({ id, task: { isCompleted: e }, }))
  };
  const onClickCancel = () => {
    setIsEditingStatus(false);
    setEditingTitleValue(title);
  };
  const onClickSave = () => {
    setIsEditingStatus(false);
    setEditingTitleValue(editingTitleValue);
    dispatch(fetchUpdatedTask({ id, task: { title: editingTitleValue }, }))
  };
  return (
    <div className={cn(className, "flex items-center gap-4 py-4 border-b justify-between")}>
      <div className="flex items-center gap-2  grow">
        <Checkbox defaultChecked={isCompleted}
          checked={checkboxValue}
          onCheckedChange={(e: boolean) => {
            handleSwitchTaskStatus(id, e);
            setCheckboxValue(e);
          }}
          id="checkbox"
          className="w-[26px] h-[26px]"
        />
        <Label className={cn(checkboxValue && "text-gray-500", `w-full  font-medium text-xl `)}>
          {isEditingStatus && (
            <Input
              className="flex w-full"
              value={editingTitleValue}
              onChange={(e) => {
                setEditingTitleValue(e.target.value);
              }}
            />
          )}
          <div className="relative w-max flex items-center">
            {!isEditingStatus && (
              <>
                <span className="leading-[36px] w-full">{title}</span>
                <span className={cn(checkboxValue ? "block" : "hidden", `absolute translate-y-[2px]  w-[calc(100%+1px)] h-[1px] bg-gray-500`)}></span>
              </>
            )}
          </div>
        </Label>
      </div>
      <div className="flex gap-2">
        {isEditingStatus ? (
          <div className=" text-[14px] flex items-center gap-2">
            <span
              onClick={onClickCancel}
              className="h-full  opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
            >
              {t("Form.Cancel")}
            </span>
            <span
              onClick={onClickSave}
              className="h-full  opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
            >
              {t("Form.Save")}
            </span>
          </div>
        ) : (
          <Pencil
            onClick={handleEditingMode}
            className=" cursor-pointer hover:stroke-[#5850DD]  transition-colors"
            color="#CDCDCD"
            strokeWidth={1}
          />
        )}
        <Trash2
          onClick={() => {
            handleRemoveTask(id);
          }}
          className="cursor-pointer hover:stroke-[#E50000] transition-colors"
          color="#CDCDCD"
          strokeWidth={1}
        />
      </div>
    </div>
  );
};

export default TaskItem;
