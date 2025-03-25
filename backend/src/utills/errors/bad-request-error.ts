import { CustomErr } from "./custom-err";



export class BadRequestError extends CustomErr {
    statusCode = 400;
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError() {
        return [
            {
                message: this.message
            }
        ]
    }
}
