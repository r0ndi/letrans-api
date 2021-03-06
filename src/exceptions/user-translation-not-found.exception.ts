import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class UserTranslationNotFoundException extends HttpException {
    constructor() {
        super(StatusCodes.NOT_FOUND, `User translation not found`);
    }
}

export default UserTranslationNotFoundException;
