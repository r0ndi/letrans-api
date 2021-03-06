import {  IsNotEmpty, IsString, IsUUID } from "class-validator";

class TranslateDto {
    @IsString()
    @IsNotEmpty()
    public phrase!: string;

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    public sourceLanguage!: string;

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    public targetLanguage!: string;
}

export default TranslateDto;
