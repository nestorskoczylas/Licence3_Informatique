import { GeneralResponseBuilderHTML } from './generalResponseBuilderHTML.js';
import { OK_STATUS } from '../builderConstants.js';

export class NoErrorResponseBuilder extends GeneralResponseBuilderHTML {

    constructor(pathname, message) {
        super(pathname, message);
        this.determineStatus(OK_STATUS);
    }

}