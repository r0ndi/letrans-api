import TranslatorProviderInterface from "../../../../interfaces/translator-provider.interface";
import TranslateRequestType from "../../../../types/translate-request.type";

class OfflineProvider implements TranslatorProviderInterface {
    public readonly name: string = "Offline";
    public static readonly code: string = "offline";

    public getName = (): string => {
        return OfflineProvider.name;
    }

    public getCode = (): string => {
        return OfflineProvider.code;
    }

    public translatePhrase = async (translateRequestData: TranslateRequestType): Promise<string | null> => {
        return translateRequestData.phrase;
    }
}

export default OfflineProvider;
