import { NextFunction, Request, Response } from "express";
import { CustomErr } from "./custom-err";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isCustomError(err)) {
        console.log(`Handling ${err.constructor.name}`);
        res.status(err.statusCode).json({ errors: err.serializeError() });
    }

    console.error('Unhandled error:', err);
    res.status(500).json({
        errors: [{ message: 'Something went wrong' }]
    });
};

function isCustomError(error: any): error is CustomErr {
    return error instanceof Error &&
        'statusCode' in error &&
        'serializeError' in error;
}