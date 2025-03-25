import { Request, NextFunction, Response } from "express";
import { CustomErr } from "./custom-err";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomErr) {
        res.status(err.statusCode).send({ errors: err.serializeError() });
    }
    console.log(err)
    res.status(400).send({
        errors: [
            {
                message: "something went wrong",
            },
        ],
    });
};