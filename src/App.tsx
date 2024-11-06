import React from "react";
import { useTranslation } from "react-i18next";
import Container from "./components/ui/container";
import { Search, CustomSelect, ToogleLang, ToogleTheme, TaskList, AddTask, UndoContainer, } from "./components/shared";

function App() {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    navigator.language === "ru"
      ? i18n.changeLanguage("ru")
      : i18n.changeLanguage("en");
  }, []);

  return (
    <>
      <Container className="py-5 relative grow ">
        <h1 className={"pb-5 text-center uppercase text-xl font-bold"}>
          {t("Todo List")}
        </h1>
        <div className={"flex gap-5 mb-8"}>
          <Search className=" grow" />
          <CustomSelect />
          <ToogleTheme />
          <ToogleLang />
        </div>
        <TaskList className="relative z-20" />
        <AddTask className="sticky bottom-7 flex justify-end z-10" />
      </Container>
      <UndoContainer />
    </>
  );
}

export default App;
