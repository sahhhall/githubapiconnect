import { CustomErr } from "./custom-err";

export class RequestValidationError extends CustomErr {
    statusCode = 400;
    constructor(public errors: any[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return this.errors.map((err) => {
            return {
                message: `invalid ${err.property}`
            }
        })
    }
}