import LanguageEntity from "../entities/language.entity";

type TranslateRequestType = {
    phrase: string;
    sourceLanguage: LanguageEntity;
    targetLanguage: LanguageEntity;
};

export default TranslateRequestType;
