import * as typeorm from "typeorm";
import LanguageEntity from "../../entities/language.entity";
import TranslatorService from "../../services/translator/translator.service";
import TranslateResponseType from "../../types/translate-response.type";
import translatorMock from "../mocks/translator.mock";

(typeorm as any).getRepository = jest.fn();

describe("The TranslatorService", () => {

    describe("test getter correct provider", () => {

        it("should return a default provider", () => {
            const translatorService: TranslatorService = new TranslatorService();
            expect(translatorService.getProviderName()).toEqual("OfflineProvider");
        });

        it("should return a google provider", () => {
            const translatorService: TranslatorService = new TranslatorService("google");
            expect(translatorService.getProviderName()).toEqual("GoogleProvider");
        });

        it("should return a ms provider", () => {
            const translatorService: TranslatorService = new TranslatorService("ms");
            expect(translatorService.getProviderName()).toEqual("MicrosoftProvider");
        });

    });

    describe("test translator", () => {

        it("should return the same phrase", async () => {
            (typeorm as any).getRepository.mockReturnValue({
                findOne: () => Promise.resolve(translatorMock.translatorResponse),
            });

            const translatorService: TranslatorService = new TranslatorService();
            const translatedPhrase: TranslateResponseType = await translatorService.translate(translatorMock.translatorRequest);

            expect(translatedPhrase).toBeTruthy();
            expect(translatedPhrase.translation).toContain(translatorMock.translatorResponse.translation);
        });

    });

});
