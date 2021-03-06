import LanguageEntity from "../../entities/language.entity";
import TranslateRequestType from "../../types/translate-request.type";
import TranslateResponseType from "../../types/translate-response.type";
import TranslateDto from "../../validations/translate.dto";

const languageEn: LanguageEntity = {
    id: "10000000-0000-0000-0000-000000000000",
    name: "English",
    code: "en",
};

const languagePl: LanguageEntity = {
    id: "20000000-0000-0000-0000-000000000000",
    name: "Polish",
    code: "pl",
};

const translatorDto: TranslateDto = {
    sourceLanguage: languageEn.id,
    targetLanguage: languagePl.id,
    phrase: "sentence",
};

const translatorRequest: TranslateRequestType = {
    sourceLanguage: languageEn,
    targetLanguage: languageEn,
    phrase: "sentence",
};

const translatorResponse: TranslateResponseType = {
    sourceLanguage: languageEn,
    targetLanguage: languageEn,
    translation: "sentence",
    phrase: "sentence",
};

const translatorMock = {
    languages: [languageEn, languagePl],
    translatorResponse,
    translatorRequest,
    translatorDto,
    languageEn,
    languagePl,
};

export default translatorMock;
