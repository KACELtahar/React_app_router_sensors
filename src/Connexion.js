export default class Connexion {
    constructor(url, client) {
        this._url = url;
        this._client = client;

    }
    
    get url() { return this._url; }
    get client(){return this._client;}

    

}