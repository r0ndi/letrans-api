import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import Controller from "./controller";
import validationMiddleware from "../middlewares/validation.middleware";
import TranslateDto from "../validations/translate.dto";
import LanguageEntity from "../entities/language.entity";
import { Repository } from "typeorm/repository/Repository";
import TranslateResponseType from "../types/translate-response.type";
import TranslatorService from "../services/translator/translator.service";
import LanguageNotFoundException from "../exceptions/language-not-found.exception";
import ObjectUndefinedType from "../types/object-undefined.type";
import LanguageService from "../services/language.service";

class TranslatorController extends Controller {
    private languageRepository: Repository<LanguageEntity> = getRepository(LanguageEntity);
    private translatorService: TranslatorService = new TranslatorService();
    private languageService: LanguageService = new LanguageService();
    protected path: string = "/translator";

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.get(`${this.path}/languages`, this.getLanguages);
        this.router.post(`${this.path}/translate`, validationMiddleware(TranslateDto), this.translate);
    }

    private getLanguages = async (request: Request, response: Response) => {
        const languages = await this.languageService.getLanguages();
        response.send(languages);
    }

    private translate = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const requestData: TranslateDto = request.body;
            const sourceLanguage: ObjectUndefinedType<LanguageEntity> = await this.languageRepository.findOne(requestData.sourceLanguage);
            const targetLanguage: ObjectUndefinedType<LanguageEntity> = await this.languageRepository.findOne(requestData.targetLanguage);

            if (sourceLanguage === undefined || targetLanguage === undefined) {
                throw new LanguageNotFoundException();
            }

            const translate: TranslateResponseType = await this.translatorService.translate({
                phrase: requestData.phrase,
                sourceLanguage,
                targetLanguage,
            });

            response.send(translate);
        } catch (error) {
            next(error);
        }
    }
}

export default TranslatorController;
