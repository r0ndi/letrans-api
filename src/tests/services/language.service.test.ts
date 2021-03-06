import * as typeorm from "typeorm";
import LanguageEntity from "../../entities/language.entity";
import LanguageService from "../../services/language.service";
import translatorMock from "../mocks/translator.mock";

(typeorm as any).getRepository = jest.fn();

describe("The LanguageService", () => {

    describe("test getter languages", () => {

        it("should return languages list", async () => {
            (typeorm as any).getRepository.mockReturnValue({
                find: () => Promise.resolve(translatorMock.languages),
            });

            const languageService: LanguageService = new LanguageService();
            const languages: LanguageEntity[] = await languageService.getLanguages();

            expect(languages.length === translatorMock.languages.length).toBeTruthy();
        });

    });

});
