import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setSortBy, SortType } from "@/redux/slices/filterSlice";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

const CustomSelect: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleSort = (selected: SortType) => {
    dispatch(setSortBy(selected));
  };
  return (
    <div className={className}>
      <Select
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
        onValueChange={(e: SortType) => {
          handleSort(e);
        }}
      >
        <SelectTrigger className=" bg-[#5850DD] text-white uppercase w-min">
          <SelectValue placeholder={t("All")} />
          <ChevronDown
            className={cn(
              isOpen && " rotate-180",
              " transition-transform h-[16px] w-[16px]"
            )}
            strokeWidth={1}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("All")}</SelectItem>
          <SelectItem value="complete">{t("Complete")}</SelectItem>
          <SelectItem value="incomplete">{t("Incomplete")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
