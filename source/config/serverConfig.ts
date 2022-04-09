import dotenv from 'dotenv';

dotenv.config();

//server
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '1337';

const SERVER_CONFIG = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

export default SERVER_CONFIG;
