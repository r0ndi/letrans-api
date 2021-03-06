import { getRepository, Repository } from "typeorm";
import PhraseEntity from "../entities/phrase.entity";
import UserTranslationEntity from "../entities/user-translation.entity";
import UserEntity from "../entities/user.entity";
import ObjectUndefinedType from "../types/object-undefined.type";
import UserTranslateStatusEnum from "../utils/user-translate-status.enum";
import LanguageEntity from "../entities/language.entity";
import UserTranslationLanguageEntity from "../entities/user-translation-language.entity";
import UserTranslationNotFoundException from "../exceptions/user-translation-not-found.exception";
import UserService from "./user.service";

class UserTranslationService {
    private userService: UserService = new UserService();
    private userTranslationRepository: Repository<UserTranslationEntity> = getRepository(UserTranslationEntity);
    private userTranslationLanguageRepository: Repository<UserTranslationLanguageEntity> = getRepository(UserTranslationLanguageEntity);

    public deleteById = async (userTranslationId: string, user: UserEntity): Promise<void> => {
        const userTranslation = await this.userTranslationRepository.findOne({where: {id: userTranslationId, user}, relations: ["user"]});
        if (!(userTranslation instanceof UserTranslationEntity)) {
            throw new UserTranslationNotFoundException();
        }

        await this.userService.getMatchedUser(user, userTranslation.user.id);

        this.deleteLanguages(userTranslation);
        await this.userTranslationRepository.delete(userTranslation);
    }

    public getByUser = async (user: UserEntity): Promise<UserTranslationEntity[]> => {
        return await this.userTranslationRepository.find({where: {user}, relations: ["languages", "languages.language",  "phrase", "phrase.translations"]});
    }

    public putPhrase = async (phrase: PhraseEntity, user: UserEntity, status: UserTranslateStatusEnum, languages: LanguageEntity[] = []): Promise<UserTranslationEntity> => {
        const userTranslation: ObjectUndefinedType<UserTranslationEntity> = await this.userTranslationRepository.findOne({user, phrase});
        return userTranslation ? await this.update(userTranslation, status, languages) : this.create(phrase, user, status, languages);
    }

    public create = async (phrase: PhraseEntity, user: UserEntity, status: UserTranslateStatusEnum, languages: LanguageEntity[] = []): Promise<UserTranslationEntity> => {
        const userTranslation: UserTranslationEntity = this.userTranslationRepository.create({user, phrase, status});
        await this.userTranslationRepository.save(userTranslation);
        await this.setLanguages(userTranslation, languages);

        return userTranslation;
    }

    public update = async (userTranslation: UserTranslationEntity, status: UserTranslateStatusEnum, languages: LanguageEntity[] = []): Promise<UserTranslationEntity> => {
        await this.userTranslationRepository.update(userTranslation.id, {...userTranslation, status});
        await this.setLanguages(userTranslation, languages);

        return {...userTranslation, status};
    }

    public setLanguages = async (userTranslation: UserTranslationEntity, languages: LanguageEntity[] = []): Promise<void> => {
        this.deleteLanguages(userTranslation);

        languages.forEach(async (language: LanguageEntity) => {
            const userTranslationLanguage = this.userTranslationLanguageRepository.create({userTranslation, language});
            await this.userTranslationLanguageRepository.save(userTranslationLanguage);
        });
    }

    public deleteLanguages = async (userTranslation: UserTranslationEntity): Promise<void> => {
        await this.userTranslationLanguageRepository.delete({userTranslation});
    }
}

export default UserTranslationService;
