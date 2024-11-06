import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRemovedTask, selectDeletedTask, undoRemove } from "@/redux/slices/todosSlice";

import React from "react";
import { Undo } from ".";

interface Props {
    className?: string;
}

const UndoContainer: React.FC<Props> = ({ className }) => {
    const [seconds, setSeconds] = React.useState(3);
    const [isStartAnimation, setStartAnimation] = React.useState(false);
    const deletedTask = useAppSelector(selectDeletedTask)
    const dispatch = useAppDispatch();
    const onUndo = () => {
        dispatch(undoRemove())
    };
    React.useEffect(() => {
        if (deletedTask === null) return
        setStartAnimation(true);
        const timer = setInterval(() => {
            setSeconds((seconds) => {
                if (seconds <= 1) {
                    deletedTask && dispatch(fetchRemovedTask(deletedTask.id))
                    return 0
                }
                return seconds - 1;
            });
        }, 1000);
        return () => {
            console.log('render');
            setStartAnimation(false)
            setSeconds(3)
            clearInterval(timer);
        };
    }, [deletedTask]);

    return (
        <div className={cn(className)}>
            <Undo seconds={seconds} isStartAnimation={isStartAnimation} onUndo={onUndo} />
        </div>
    )
}

export default UndoContainer;
