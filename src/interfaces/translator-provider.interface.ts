import TranslateRequestType from "../types/translate-request.type";

interface TranslatorProviderInterface {
    name: string;
    getName(): string;
    getCode(): string;
    translatePhrase(translateRequestData: TranslateRequestType): Promise<string | null>;
}

export default TranslatorProviderInterface;
