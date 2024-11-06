import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Todo List": "ToDo List",
            "Search": "Search note...",
            "All": "All",
            "Complete": "Complete",
            "Incomplete": "Incomplete",
            "Form": {
                "h2": "New note",
                "input": "Input your note...",
                "Cancel": "Cancel",
                "Apply": "Apply",
                "Save": "Save",
            },
            "Light": "Light",
            "Dark": "Dark",
            "System": "System",
            "Do you really want to remove the task?": "Do you really want to remove the task?",
            "Undo": "Undo"
        }
    },
    ru: {
        translation: {
            "Todo List": "Список задач",
            "Search": "Найти заметку...",
            "All": "Все",
            "Complete": "Выполненные",
            "Incomplete": "Невыполненные",
            "Form": {
                "h2": "Новая заметка",
                "input": "Введите свою заметку",
                "Cancel": "Отмена",
                "Apply": "Применить",
                "Save": "Сохранить",
            },
            "Light": "Светлая",
            "Dark": "Тёмная",
            "System": "Системная",
            "Do you really want to remove the task?": "Вы действительно хотите удалить задачу?",
            "Undo": "Отменить"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;