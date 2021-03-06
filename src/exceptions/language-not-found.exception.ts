import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class LanguageNotFoundException extends HttpException {
    constructor() {
        super(StatusCodes.NOT_FOUND, `Language not found`);
    }
}

export default LanguageNotFoundException;
