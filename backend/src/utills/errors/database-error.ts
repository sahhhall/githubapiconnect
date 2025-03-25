import { CustomErr } from "./custom-err";

export class DatabaseConnectionError extends CustomErr {
    reason = "Error connecting with database";
    statusCode = 500;
    constructor() {
        super("Error connecting with database");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    };

    serializeError() {
        return [
            {
                message: this.reason
            }
        ]
    }
}