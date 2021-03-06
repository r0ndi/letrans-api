import LanguageEntity from "../entities/language.entity";
import NullableType from "./nullable.type";

type TranslateResponseType = {
    phrase: string;
    translation: string;
    phraseId?: NullableType<string>;
    sourceLanguage: LanguageEntity;
    targetLanguage: LanguageEntity;
};

export default TranslateResponseType;
