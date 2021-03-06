import {getRepository, MigrationInterface, QueryRunner, Repository} from "typeorm";
import getSupportedLanguages from "../utils/supported-languages";
import LanguageEntity from "../entities/language.entity";
import LanguageType from "../types/language.type";

export class SetAvailableLanguages1612300525726 implements MigrationInterface {
    private languageRepository: Repository<LanguageEntity> = getRepository(LanguageEntity);

    public async up(queryRunner: QueryRunner): Promise<void> {
        const languages: LanguageType[] = getSupportedLanguages();
        languages.forEach(async (langInfo: LanguageType) => {
            const language: LanguageEntity = this.languageRepository.create(langInfo);
            await this.languageRepository.save(language);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const languages: LanguageEntity[] = await this.languageRepository.find();
        languages.forEach(async (language: LanguageEntity) => {
            await this.languageRepository.delete(language);
        });
    }

}
