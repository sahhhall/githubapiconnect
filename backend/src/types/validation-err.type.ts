export interface IValidationErr {
    type: string;
    value: string;
    msg: string; path: string;
    location: 'string'
}