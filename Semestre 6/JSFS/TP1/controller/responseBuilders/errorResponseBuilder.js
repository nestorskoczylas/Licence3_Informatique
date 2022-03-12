import { GeneralResponseBuilderHTML } from './generalResponseBuilderHTML.js';
import { ERROR_STATUS } from '../builderConstants.js';

export class ErrorResponseBuilder extends GeneralResponseBuilderHTML {

    constructor(pathname, message) {
        super(pathname, message);
        this.determineStatus(ERROR_STATUS);
    }

}