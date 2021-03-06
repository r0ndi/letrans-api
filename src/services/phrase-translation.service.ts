import { getRepository, Repository } from "typeorm";
import PhraseTranslationEntity from "../entities/phrase-translation.entity";
import PhraseEntity from "../entities/phrase.entity";
import TranslateRequestType from "../types/translate-request.type";
import LanguageEntity from "../entities/language.entity";
import ObjectUndefinedType from "../types/object-undefined.type";
import NullableType from "../types/nullable.type";

class PhraseTranslationService {
    private phraseRepository: Repository<PhraseEntity> = getRepository(PhraseEntity);
    private phraseTranslationRepository: Repository<PhraseTranslationEntity> = getRepository(PhraseTranslationEntity);

    public getPhraseById = async (id: string): Promise<ObjectUndefinedType<PhraseEntity>> => {
        return await this.phraseRepository.findOne(id);
    }

    public saveTranslation = async (translateRequestData: TranslateRequestType, translateFromProvider: string): Promise<PhraseEntity> => {
        const phrase = this.phraseRepository.create();
        const savedPhrase = await this.phraseRepository.save(phrase);

        await this.createTranslation(phrase, translateRequestData.targetLanguage, translateFromProvider);
        if (translateRequestData.targetLanguage.id !== translateRequestData.sourceLanguage.id) {
            await this.createTranslation(phrase, translateRequestData.sourceLanguage, translateRequestData.phrase);
        }

        return savedPhrase;
    }

    public getTranslation = async (translateRequestData: TranslateRequestType): Promise<NullableType<PhraseTranslationEntity>> => {
        const sourcePhraseTranslation: ObjectUndefinedType<PhraseTranslationEntity> = await this.phraseTranslationRepository.findOne({ where: {
            language: translateRequestData.sourceLanguage,
            translation: translateRequestData.phrase,
        }, relations: ["phrase"]});

        if (sourcePhraseTranslation === undefined) {
            return null;
        }

        const targetPhraseTranslation: ObjectUndefinedType<PhraseTranslationEntity> = await this.phraseTranslationRepository.findOne({ where: {
            language: translateRequestData.targetLanguage,
            phrase: sourcePhraseTranslation.phrase,
        }, relations: ["phrase"]});

        return targetPhraseTranslation !== undefined ? targetPhraseTranslation : null;
    }

    private createTranslation = async (phrase: PhraseEntity, language: LanguageEntity, translation: string): Promise<void> => {
        const phraseTranslation = this.phraseTranslationRepository.create({phrase, translation, language});
        await this.phraseTranslationRepository.save(phraseTranslation);
    }
}

export default PhraseTranslationService;
