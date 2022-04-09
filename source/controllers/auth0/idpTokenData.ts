import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Identitie } from '../../interfaces/Iidentitie';
import logging from '../../utils/logging';
import { getCredentialsBeareToken, getUserIdpTokenByConnection } from './auth0Requests';
const NAMESPACE = 'Auth0 ';
const jwt = require('jsonwebtoken');

const getIdpTokenData = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `${req.params.connection} access token has been requested`);

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const connection: string = req.params.connection;
        const idToken = req.headers.authorization?.split(' ')[1];
        const token = await getCredentialsBeareToken();
        const userId = jwt.decode(idToken).sub;
        const discordToken: Identitie | undefined = await getUserIdpTokenByConnection(userId, token, connection);
        if (discordToken != undefined) {
            return res.status(200).json({
                auth_data: discordToken
            });
        } else {
            return res.status(400).json({
                error_msg: 'the connection: ' + connection + 'did not exist'
            });
        }
    } else {
        return res.status(401).json({
            desc: 'unauthorized'
        });
    }
};

export default { getIdpTokenData };
