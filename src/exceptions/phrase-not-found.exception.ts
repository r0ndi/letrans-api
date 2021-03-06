import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class PhraseNotFoundException extends HttpException {
    constructor() {
        super(StatusCodes.NOT_FOUND, `Phrase not found`);
    }
}

export default PhraseNotFoundException;
