import React from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCreatedTask } from "@/redux/slices/todosSlice";
import { useTranslation } from "react-i18next";
import { nanoid } from "@reduxjs/toolkit";

interface Props {
  className?: string;
}

const AddTask: React.FC<Props> = ({ className }) => {


  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    const newTask = {
      id: nanoid(),
      userId: "",
      title: value,
      content: "",
      isCompleted: false,
    };
    dispatch(fetchCreatedTask(newTask));
    setValue("");
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(!isOpen);
    setValue("");
  };
  return (
    <div className={cn(className)} onKeyDown={(e) => {
      if (isOpen && e.key === 'Enter') {
        handleSubmit()
      }
    }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "text-white w-[50px] h-[50px] rounded-full hover:scale-105 transition-transform hover:bg-[hsl(var(--custom-color))]  bg-[hsl(var(--custom-color))] "
            )}
            size={"icon"}
          >
            <Plus color="#fff" className="h-4 w-4" size={30} strokeWidth={2} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className=" uppercase text-center">
              {t("Form.h2")}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription hidden></DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 mb-20">
              <Input
                id="name"
                placeholder={t("Form.input")}
                value={value}
                onChange={(e) => {
                  onChangeInput(e);
                }}
                className="col-span-full"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button onClick={handleCancel} variant={"outline"}>
                {t("Form.Cancel")}
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                {t("Form.Apply")}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
