import TranslatorProviderInterface from "../../../../interfaces/translator-provider.interface";
import TranslateRequestType from "../../../../types/translate-request.type";

class MicrosoftProvider implements TranslatorProviderInterface {
    public readonly name: string = "Microsoft";
    public static readonly code: string = "ms";

    public getName = (): string => {
        return MicrosoftProvider.name;
    }

    public getCode = (): string => {
        return MicrosoftProvider.code;
    }

    public translatePhrase = async (translateRequestData: TranslateRequestType): Promise<string | null> => {
        return translateRequestData.phrase;
    }
}

export default MicrosoftProvider;
