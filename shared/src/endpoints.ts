export type EndpointConfig = {
    url: string;
    method: 'patch' | 'get' | 'post' | 'delete';
    auth?: boolean;
    sensitive?: boolean; // Skips logging request body
  };
  
  export enum Endpoints {
  
    login = 'login',
    register = 'register',
   
  
    listApartments = 'listApartments',
    getApartment = 'getApartment',
    createApartment = 'createApartment',

  }
  
  export function withParams(endpoint: EndpointConfig, ...params: string[]): EndpointConfig {
    let url = endpoint.url;
    const placeholders = url.match(/:[^\/]*/g) || [];
    if (placeholders.length !== params.length) {
      throw `Too ${placeholders.length < params.length ? 'many' : 'few'} params for url: ${url}!`;
    }
    for (let index = 0; index < params.length; index++) {
      url = url.replace(placeholders[index], params[index]);
    }
    return {
      url: url,
      method: endpoint.method,
      auth: endpoint.auth,
    } as EndpointConfig;
  }
  
  export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  
  
    [Endpoints.login]: { method: 'post', url: '/api/login', sensitive: true },
    [Endpoints.register]: { method: 'post', url: '/api/register', sensitive: true },
  
    [Endpoints.listApartments]: { method: 'get', url: '/api/apartments' },
    [Endpoints.getApartment]: { method: 'get', url: '/api/apartments/:id' },
    [Endpoints.createApartment]: { method: 'post', url: '/api/apartments', auth: true },
  };