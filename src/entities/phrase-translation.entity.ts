import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import LanguageEntity from "./language.entity";
import PhraseEntity from "./phrase.entity";

@Entity("phrase_translations")
class PhraseTranslationEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToOne(() => PhraseEntity, (phrase: PhraseEntity) => phrase.translations)
    public phrase!: PhraseEntity;

    @ManyToOne(() => LanguageEntity)
    public language!: LanguageEntity;

    @Column({
        type: "varchar",
        length: 64,
    })
    public translation!: string;
}

export default PhraseTranslationEntity;
