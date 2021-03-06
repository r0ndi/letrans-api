import {Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import UserTranslationLanguageEntity from "./user-translation-language.entity";
import UserTranslateStatusEnum from "../utils/user-translate-status.enum";
import PhraseEntity from "./phrase.entity";
import UserEntity from "./user.entity";

@Entity("user_translations")
class UserTranslationEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToOne(() => PhraseEntity)
    public phrase!: PhraseEntity;

    @ManyToOne(() => UserEntity)
    public user!: UserEntity;

    @Column({
        type: "varchar",
        enum: UserTranslateStatusEnum,
        default: UserTranslateStatusEnum.NEW,
    })
    public status!: UserTranslateStatusEnum;

    @OneToMany(() => UserTranslationLanguageEntity, (userTranslationLanguage: UserTranslationLanguageEntity) => userTranslationLanguage.userTranslation)
    public languages!: UserTranslationLanguageEntity[];
}

export default UserTranslationEntity;
