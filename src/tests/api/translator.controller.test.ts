import TranslatorController from "../../api/translator.controller";
import * as typeorm from "typeorm";
import request from "supertest";
import App from "../../app";
import translatorMock from "../mocks/translator.mock";
import { StatusCodes } from "http-status-codes";
import LanguageNotFoundException from "../../exceptions/language-not-found.exception";
import { isString, isUUID } from "class-validator";

(typeorm as any).getRepository = jest.fn();

describe("The TranslatorController", () => {

    describe("GET /translator/languages", () => {

        it("should return languages", async () => {
            (typeorm as any).getRepository.mockReturnValue({
                find: () => Promise.resolve(translatorMock.languages),
            });

            const app = new App([new TranslatorController()]);
            return request(app.getServer())
                .get(`/api/v1/translator/languages`)
                .expect(translatorMock.languages);
        });

    });

    describe("POST /translator/translate", () => {

        it("should return correct translation", async () => {
            (typeorm as any).getRepository.mockReturnValue({
                findOne: (
                    (condition: any) => {
                        return isUUID(condition)
                            ? Promise.resolve(translatorMock.languageEn)
                            : Promise.resolve(translatorMock.translatorResponse);
                    }
                ),
            });

            const app = new App([new TranslatorController()]);
            return request(app.getServer())
                .post(`/api/v1/translator/translate`)
                .send(translatorMock.translatorDto)
                .expect(translatorMock.translatorResponse);
        });

        it("should catch language not found exception", async () => {
            const exception = new LanguageNotFoundException();
            (typeorm as any).getRepository.mockReturnValue({
                findOne: () => Promise.resolve(undefined),
            });

            const app = new App([new TranslatorController()]);
            return request(app.getServer())
                .post(`/api/v1/translator/translate`)
                .send(translatorMock.translatorDto)
                .expect({ status: exception.status, message: exception.message });
        });

        it("should catch validation exception", async () => {
            const requestBody = translatorMock.translatorDto;
            delete requestBody.phrase;

            const app = new App([new TranslatorController()]);
            return request(app.getServer())
                .post(`/api/v1/translator/translate`)
                .send(requestBody)
                .expect({
                    status: StatusCodes.BAD_REQUEST,
                    message: "phrase should not be empty, phrase must be a string",
                });
        });

    });

});
