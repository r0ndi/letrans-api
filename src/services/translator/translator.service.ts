import { getRepository, Repository } from "typeorm";
import appConfig from "../../configs/app.config";
import LanguageEntity from "../../entities/language.entity";
import TranslateRequestType from "../../types/translate-request.type";
import TranslateResponseType from "../../types/translate-response.type";
import PhraseTranslationService from "../phrase-translation.service";
import GoogleRapidProvider from "./providers/google-rapid/google-rapid.provider";
import MicrosoftProvider from "./providers/microsoft/microsoft.provider";
import TranslatorProviderInterface from "../../interfaces/translator-provider.interface";
import GoogleProvider from "./providers/google/google.provider";
import OfflineProvider from "./providers/offline/offline.provider";

class TranslatorService {
    private translatorProvider: TranslatorProviderInterface;
    private languageRepository: Repository<LanguageEntity> = getRepository(LanguageEntity);
    private phraseTranslationService: PhraseTranslationService = new PhraseTranslationService();

    constructor(provider: string = appConfig.DEFAULT_TRANSLATOR_PROVIDER) {
        this.translatorProvider = this.getTranslatorProvider(provider);
    }

    public getLanguages = async (): Promise<LanguageEntity[]> => {
        return await this.languageRepository.find();
    }

    public getProviderName = (): string => {
        return this.translatorProvider.getName();
    }

    public translate = async (translateRequestData: TranslateRequestType): Promise<TranslateResponseType> => {
        const savedTranslation = await this.phraseTranslationService.getTranslation(translateRequestData);
        if (savedTranslation !== null) {
            return {...translateRequestData, translation: savedTranslation.translation, phraseId: savedTranslation.phrase.id};
        }

        const translationFromProvider = await this.translatorProvider.translatePhrase(translateRequestData);
        if (translationFromProvider !== null) {
            const savedTranslation = await this.phraseTranslationService.saveTranslation(translateRequestData, translationFromProvider);
            return {...translateRequestData, translation: translationFromProvider, phraseId: savedTranslation.id};
        }

        return {...translateRequestData, translation: "", phraseId: null};
    }

    private getTranslatorProvider = (provider: string): TranslatorProviderInterface => {
        switch (provider ) {
            case GoogleProvider.code:
                return new GoogleProvider();
            case GoogleRapidProvider.code:
                return new GoogleRapidProvider();
            case MicrosoftProvider.code:
                return new MicrosoftProvider();
        }

        return new OfflineProvider();
    }
}

export default TranslatorService;
