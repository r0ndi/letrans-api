import LanguageType from "../types/language.type";

const getSupportedLanguages = (): LanguageType[] => {
    return [
        {name: "English", code: "en"},
        {name: "Spanish", code: "es"},
        {name: "Polish", code: "pl"},
        {name: "German", code: "de"},
        {name: "French", code: "fr"},
        {name: "Russia", code: "ru"},
    ];
};

export default getSupportedLanguages;
