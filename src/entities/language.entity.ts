import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("languages")
class LanguageEntity {
    @Index()
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    public code!: string;

    @Column({
        type: "varchar",
        length: 64,
    })
    public name!: string;
}

export default LanguageEntity;
