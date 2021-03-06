import TranslatorProviderInterface from "../../../../interfaces/translator-provider.interface";
import TranslateRequestType from "../../../../types/translate-request.type";
import GoogleRapidApi from "./google-rapid-api";

class GoogleRapidProvider implements TranslatorProviderInterface {
    public readonly name: string = "Google rapid";
    public static readonly code: string = "google_rapid";

    public getName = (): string => {
        return GoogleRapidProvider.name;
    }

    public getCode = (): string => {
        return GoogleRapidProvider.code;
    }

    public translatePhrase = async (translateRequestData: TranslateRequestType): Promise<string | null> => {
        const googleRapidApi = new GoogleRapidApi();
        return googleRapidApi.translate(
            translateRequestData.phrase,
            translateRequestData.sourceLanguage.code,
            translateRequestData.targetLanguage.code,
        );
    }
}

export default GoogleRapidProvider;
