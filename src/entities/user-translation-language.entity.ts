import { Entity, Index, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import LanguageEntity from "./language.entity";
import UserTranslationEntity from "./user-translation.entity";

@Entity("user_translation_languages")
class UserTranslationLanguageEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToOne(() => LanguageEntity)
    public language!: LanguageEntity;

    @ManyToOne(() => UserTranslationEntity, (userTranslation: UserTranslationEntity) => userTranslation.languages)
    public userTranslation!: UserTranslationEntity;
}

export default UserTranslationLanguageEntity;
