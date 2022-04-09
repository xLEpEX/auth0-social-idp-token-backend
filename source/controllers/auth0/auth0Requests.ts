import axios, { AxiosError, AxiosResponse } from 'axios';
import * as qs from 'qs';
import config from '../../config/auth0Config';
import { Identitie } from '../../interfaces/Iidentitie';

const base64 = Buffer.from(config.clientId + ':' + config.clientSeacret, 'utf-8').toString('base64');

const data = qs.stringify({
    grant_type: config.grandType,
    scope: config.scope,
    audience: config.baseUrl + '/api/v2/'
});

export async function getCredentialsBeareToken() {
    return axios
        .post(config.baseUrl + '/oauth/token', data, {
            headers: {
                Authorization: 'Basic ' + base64,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response: AxiosResponse): string => {
            return response.data.access_token;
        })
        .catch((error: AxiosError) => {
            throw error;
        });
}

export async function getAllUserIdpTokens(userId: string, token: string) {
    return axios
        .get(config.baseUrl + '/api/v2/users/' + userId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response: AxiosResponse): Identitie[] => {
            return JSON.parse(JSON.stringify(response.data.identities));
        })
        .catch((error: AxiosError) => {
            throw error;
        });
}

export async function getUserIdpTokenByConnection(userId: string, token: string, connection: string) {
    const idpTokens: Identitie[] = await getAllUserIdpTokens(userId, token);
    return idpTokens.find((e) => e.connection === connection);
}
