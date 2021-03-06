import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import StatusCodes from "http-status-codes";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction): void {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Something went wrong";
    const errorCode = message.toLowerCase().replace(/ /g, "_");

    response.status(status).send({
        status, message, errorCode,
    });
}

export default errorMiddleware;
