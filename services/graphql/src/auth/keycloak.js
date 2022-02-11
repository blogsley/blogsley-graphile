var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'type credential',
    bearerOnly: true,
    serverUrl: 'our company server',
    realm: 'the test realm',
    grantType: "client_credentials",
    credentials: {
        secret: 'our secret'
    }
};

function initKeycloak(){
    if(_keycloak){
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else{
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({store: memoryStore}, keycloakConfig);

        return _keycloak;
    }
}

function getKeycloak(){
    if(!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first');
    }

    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};