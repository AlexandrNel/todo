import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    className?: string;
}

const ToogleLang: React.FC<Props> = ({ className }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const onClick = () => {
        lang === "ru" ? i18n.changeLanguage("en") : i18n.changeLanguage("ru");
    };

    return (
        <div
            className={cn(
                className,
                "relative w-[72px] h-9 rounded-full bg-[#2b2b2b]  flex justify-between items-center"
            )}
        >
            <div
                onClick={onClick}
                className={cn(
                    lang === "ru" ? "translate-x-0" : "translate-x-9",
                    " transition-all cursor-pointer h-9 w-9 absolute z-10 left-0 rounded-full opacity-25 bg-white"
                )}
            ></div>
            <span className=" text-white absolute left-[11px]  ">ru</span>
            <span className=" text-white absolute right-[9px] ">en</span>
        </div>
    );
};

export default ToogleLang;
