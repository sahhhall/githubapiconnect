import { CustomErr } from "./custom-err";

export class RequestValidationError extends CustomErr {
    statusCode = 400;
    constructor(public errors: any[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        console.log(this.errors, "this.errors from reqeustvalidation error")
        return this.errors.map((err) => {
            return {    
                message: `invalid ${err.property}`
            }
        })
    }
}