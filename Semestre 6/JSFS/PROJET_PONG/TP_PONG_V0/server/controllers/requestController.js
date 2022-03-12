import * as fs from 'fs/promises';

import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';

const BASE = 'http://localhost/';
/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(this.request.url,BASE).pathname;   // on ne considère que le "pathname" de l'URL de la requête
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    await this.buildResponse();
    this.response.end();
  }

  /**
  * send the requested resource as it is, if it exists, else responds with a 404
  */
  async buildResponse()  {
    try {
      // check if resource is available
      await fs.access(`.${this.url}`);
      // read the requested resource content
      const data = await fs.readFile(`.${this.url}`);
      // send resource content
      this.response.statusCode = 200;
      this.response.write(data);
    }
    catch(err) { // resource is not available
      this.response.statusCode = 404;
      this.response.write('erreur');
    }
  }

}
