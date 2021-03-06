import { Repository, getRepository } from "typeorm";
import LanguageEntity from "../entities/language.entity";
import ObjectUndefinedType from "../types/object-undefined.type";

class LanguageService {
    private languageRepository: Repository<LanguageEntity> = getRepository(LanguageEntity);

    public getLanguages = async (): Promise<LanguageEntity[]> => {
        return await this.languageRepository.find();
    }

    public getLanguagesByIds = async (languageIds: string[]): Promise<LanguageEntity[]> => {
        const languages: LanguageEntity[] = [];

        for (const languageId of languageIds) {
            const language: ObjectUndefinedType<LanguageEntity> = await this.languageRepository.findOne(languageId);
            if (language instanceof LanguageEntity) {
                languages.push(language);
            }
        }

        return languages;
    }
}

export default LanguageService;
