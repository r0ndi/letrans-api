import {IsArray, IsEnum, IsInt, IsNotEmpty, IsString, IsUUID} from "class-validator";
import UserTranslateStatusEnum from "../utils/user-translate-status.enum";

class TranslateSaveDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    public phraseId!: string;

    @IsArray()
    @IsNotEmpty()
    public languages!: string[];

    @IsString()
    @IsEnum(UserTranslateStatusEnum)
    public status: UserTranslateStatusEnum = UserTranslateStatusEnum.NEW;
}

export default TranslateSaveDto;
