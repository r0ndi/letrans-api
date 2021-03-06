import { Entity, Index, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";
import PhraseTranslationEntity from "./phrase-translation.entity";

@Entity("phrases")
class PhraseEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @OneToMany(() => PhraseTranslationEntity, (phraseTranslation: PhraseTranslationEntity) => phraseTranslation.phrase)
    public translations!: PhraseTranslationEntity[];
}

export default PhraseEntity;
