import { ResponseBuilder } from '../responseBuilder.js';
import { JSON_TYPE, OK_STATUS, ERROR_STATUS } from '../builderConstants.js';

export class ResponseBuilderJSON extends ResponseBuilder {

    _args;

    constructor(pathname, args) {
        super(pathname);
        this._args = args;
        
        
        this.response = this.determineResponse();
    }

    determineResponseType() {
        return JSON_TYPE;
    }

    determineResponse() {
        try {
            this.determineStatus(OK_STATUS);

            console.log(this._args);
            
            return JSON.stringify(this._args);
        }
        catch(e) {
            this.determineStatus(ERROR_STATUS);
            console.log(e);
            return e.toString();
        }
    }

}