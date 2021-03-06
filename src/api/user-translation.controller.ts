import { NextFunction, Response } from "express";
import Controller from "./controller";
import validationMiddleware from "../middlewares/validation.middleware";
import ObjectUndefinedType from "../types/object-undefined.type";
import RequestWithUser from "../interfaces/request-with-user.interface";
import authMiddleware from "../middlewares/auth.middleware";
import TranslateSaveDto from "../validations/translate-save.dto";
import UserEntity from "../entities/user.entity";
import PhraseTranslationService from "../services/phrase-translation.service";
import PhraseNotFoundException from "../exceptions/phrase-not-found.exception";
import UserTranslationService from "../services/user-translation.service";
import UserNotFoundException from "../exceptions/user-not-found.exception";
import LanguageEntity from "../entities/language.entity";
import LanguageService from "../services/language.service";
import PhraseEntity from "../entities/phrase.entity";

class UserTranslationController extends Controller {
    private phraseTranslationService: PhraseTranslationService = new PhraseTranslationService();
    private userTranslationService: UserTranslationService = new UserTranslationService();
    private languageService: LanguageService = new LanguageService();
    protected path: string = "/translator/user-translation";

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.get(`${this.path}`, authMiddleware, this.getTranslations);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteTranslation);
        this.router.put(`${this.path}`, validationMiddleware(TranslateSaveDto), authMiddleware, this.updateTranslation);
    }

    private getTranslations = async (request: RequestWithUser, response: Response) => {
        const user: ObjectUndefinedType<UserEntity> = request.user;
        if (!(user instanceof UserEntity)) {
            throw new UserNotFoundException();
        }

        const userTranslations = await this.userTranslationService.getByUser(user);
        response.send(userTranslations);
    }

    private deleteTranslation = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const userTranslationId: string = request.params.id ?? "";
        const user: ObjectUndefinedType<UserEntity> = request.user;
        if (!(user instanceof UserEntity)) {
            throw new UserNotFoundException();
        }

        try {
            await this.userTranslationService.deleteById(userTranslationId, user);
            response.send();
        } catch (error) {
            next(error);
        }
    }

    private updateTranslation = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            const translateData: TranslateSaveDto = request.body;
            const user: ObjectUndefinedType<UserEntity> = request.user;
            const phrase = await this.phraseTranslationService.getPhraseById(translateData.phraseId);
            const languages: LanguageEntity[] = await this.languageService.getLanguagesByIds(translateData.languages);

            if (!(phrase instanceof PhraseEntity)) {
                throw new PhraseNotFoundException();
            }

            if (!(user instanceof UserEntity)) {
                throw new UserNotFoundException();
            }

            const userTranslation = await this.userTranslationService.putPhrase(phrase, user, translateData.status, languages);
            response.send(userTranslation);
        } catch (error) {
            next(error);
        }
    }
}

export default UserTranslationController;
