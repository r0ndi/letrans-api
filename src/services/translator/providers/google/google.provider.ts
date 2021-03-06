import TranslatorProviderInterface from "../../../../interfaces/translator-provider.interface";
import TranslateRequestType from "../../../../types/translate-request.type";
import GoogleApi from "./google-api";

class GoogleProvider implements TranslatorProviderInterface {
    public readonly name: string = "Google";
    public static readonly code: string = "google";

    public getName = (): string => {
        return GoogleProvider.name;
    }

    public getCode = (): string => {
        return GoogleProvider.code;
    }

    public translatePhrase = async (translateRequestData: TranslateRequestType): Promise<string | null> => {
        const googleApi = new GoogleApi();
        return googleApi.translate(
            translateRequestData.phrase,
            translateRequestData.sourceLanguage.code,
            translateRequestData.targetLanguage.code,
        );
    }
}

export default GoogleProvider;
