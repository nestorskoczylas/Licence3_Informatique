import { URL } from 'url';
import { NoErrorResponseBuilder } from './responseBuilders/noErrorResponseBuilder.js';
import { ErrorResponseBuilder } from './responseBuilders/errorResponseBuilder.js';
import { ResponseBuilderJSON } from './responseBuilders/responseBuilderJSON.js';
import { ResponseBuilder } from './responseBuilder.js';
import { ResponseBuilderResource } from './responseBuilders/responseBuilderResource.js';
import { ERROR_STATUS, HTML_TYPE, P1_MESSAGE, P2_MESSAGE, ERROR_MESSAGE } from './builderConstants.js';

export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
  }

  get response() { return this.#response; }

  handleRequest()  {  
    const path = this.#url.pathname;

    // routage "à la main"
    // respBuilder variable car réattribution si erreur
    let respBuilder = this.initResponseBuilder(path);
    
    this.#response.statusCode = respBuilder.status;

    if (this.#response.statusCode === ERROR_STATUS)
      respBuilder = this.#errorBuilder(path);

    
    this.#response.setHeader('Content-Type', respBuilder.responseType);

    //if (respBuilder.responseType === HTML_TYPE)
      this.#response.write(respBuilder.response); 

    this.#response.end();
  }

  initResponseBuilder(path) {
    //recuperation du premier mot de la requete; '/first/anything' renverra toujours vers '/first'
    const initPath = '/'+path.split('/')[1];
    switch (initPath) {
      case '/first':
        return new NoErrorResponseBuilder(path, P1_MESSAGE);

      case '/second':
        return new NoErrorResponseBuilder(path, P2_MESSAGE);

      case '/json':
        const data = this.#url.searchParams.entries();
        const args = Object.fromEntries(data);
        return new ResponseBuilderJSON(path, args);

      case '/random':
        const some_int = Math.floor(Math.random() * 101);
        const args2 = {randomValue : some_int};
        return new ResponseBuilderJSON(path, args2);

      case '/public':
        return new ResponseBuilderResource('.'+path);

      default:
        return this.#errorBuilder(path);
    }
  }

  #errorBuilder(path) {
    return new ErrorResponseBuilder(path, ERROR_MESSAGE);
  }

}