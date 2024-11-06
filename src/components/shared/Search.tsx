import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useAppDispatch } from "@/redux/hooks";
import { setSearch } from "@/redux/slices/filterSlice";
import { useDebounceFn } from "ahooks";
import { useTranslation } from "react-i18next";
interface Props {
  className?: string;
}

const Search: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState("");
  const dispatch = useAppDispatch();
  const { run } = useDebounceFn(
    (value) => {
      dispatch(setSearch(value));
    },
    { wait: 300 }
  );

  React.useEffect(() => {
    if (value) {
      run(value.trim());
    } else {
      run("");
    }
  }, [value]);
  return (
    <div className={cn(className, "relative flex items-center")}>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        id="search"
        className="pr-10"
        placeholder={t("Search")}
      />
      <Label className=" absolute right-2" htmlFor="search">
        <SearchIcon color={"hsl(var(--primary))"} strokeWidth={1} />
      </Label>
    </div>
  );
};

export default Search;
