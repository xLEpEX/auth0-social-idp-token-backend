import dotenv from 'dotenv';

dotenv.config();

//auth0
const CLIENT_ID = process.env.AUTH0_CLIENT_ID || 'CLIENTID';
const CLIENT_SEACRET = process.env.AUTH0_CLIENT_SEACRET || 'CLIENTSEACRET';
const BASEURL = process.env.AUTH0_AUDIENCE_BASEURL || 'https://XXX.XX.auth0.com';
const GRANT_TYPE = process.env.AUTH0_GRANT_TYPE || 'client_credentials';
const SCOPE = process.env.AUTH0_SCOPE || '';

const AUTH0_CONFIG = {
    clientId: CLIENT_ID,
    clientSeacret: CLIENT_SEACRET,
    baseUrl: BASEURL,
    grandType: GRANT_TYPE,
    scope: SCOPE
};

export default AUTH0_CONFIG;
