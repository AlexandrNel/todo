import React from "react";
import { cn } from "@/lib/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useTranslation } from "react-i18next";
import UndoIcon from "../../assets/undo-icon.svg";

interface Props {
  className?: string;
  onUndo: () => void;
  seconds: number,
  isStartAnimation: boolean
}

const Undo: React.FC<Props> = ({ seconds, isStartAnimation, onUndo, className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        className,
        " transition-transform absolute overflow-hidden p-4 bottom-0 right-[-200px] translate-x-0  flex justify-end items-center text-white",
        isStartAnimation && 'translate-x-[-200px]'
      )}
    >
      <button
        onClick={onUndo}
        className={cn("flex justify-center items-center p-3 text-center transition-all cursor-pointer rounded-sm bg-[#5850DD] hover:bg-[hsl(var(--custom-color))] ",
        )}
      >
        <div className="relative mr-3 flex items-center justify-center">
          <span className="absolute font-medium text-sm">{seconds}</span>
          <CircularProgressbar
            className="h-7 w-7 "
            styles={buildStyles({
              pathColor: "white",
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "30px",
              pathTransitionDuration: 0.5,
              textColor: "#fff",
              backgroundColor: "#3e98c7",
            })}
            value={seconds}
            maxValue={3}
          />
        </div>
        <span className=" leading-7 uppercase mr-1 ">{t('Undo')}</span>
        <img className="pb-1" src={UndoIcon} alt="" />
      </button>
    </div>
  );
};

export default Undo;
