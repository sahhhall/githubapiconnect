import { body } from "express-validator";
import { CustomErr } from "./custom-err";
import { IValidationErr } from "../../types";

export class RequestValidationError extends CustomErr {
    statusCode = 400;
    constructor(public errors: IValidationErr[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        console.log(this.errors, "this.errors from reqeustvalidation error")
        return this.errors.map((err) => {
            return {
                message: `${err.msg} in ${err.location}`
            }
        })
    }
}