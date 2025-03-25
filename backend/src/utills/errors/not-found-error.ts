import { CustomErr } from "./custom-err";

export class NotFoundError extends CustomErr {
    statusCode = 404;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype)
    };

    serializeError() {
        return [
            {
                message: this.message
            }
        ]
    }
}