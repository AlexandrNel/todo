import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn(className, "max-w-[720px] w-full m-auto")}>
      {children}
    </div>
  );
};

export default Container;
