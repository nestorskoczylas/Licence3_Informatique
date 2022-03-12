import { ResponseBuilder } from '../responseBuilder.js';
import { readFileSync, accessSync, constants } from 'fs';
import { OK_STATUS, ERROR_STATUS, PLAIN_TYPE } from '../builderConstants.js';

export class ResponseBuilderResource extends ResponseBuilder {

    constructor(pathname) {
        super(pathname);
        this.response = this.determineResponse();
    }

    determineResponseType() {
        return PLAIN_TYPE;
    }

    determineResponse() {
        try {
            const path = this._request;
            accessSync(path, constants.R_OK);
            this.determineStatus(OK_STATUS);
            return readFileSync(path , { encoding : 'UTF-8'});
        }
        catch(e) {
            this.determineStatus(ERROR_STATUS);
            console.log(e);
            return e.toString();
        }
    }

}