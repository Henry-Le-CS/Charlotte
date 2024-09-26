'use strict'
import JWT from 'jsonwebtoken';
import crypto from 'node:crypto';
import { AuthFailureError, BadRequestError, NotFoundError } from '../core/error.response.js';
import KeyTokenService from '../services/keytoken.service.js';
import { asyncHandler } from './../helpers/asyncHandler.js';
const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id'
}

export const createTokenPair = async (payload) => {
    try {
        const privateKey = crypto.randomBytes(32).toString('hex');
        const publicKey = crypto.randomBytes(32).toString('hex');
        
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: '2h'
        })
        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: '7d'
        })
        await verifyJWT(accessToken, publicKey)
        return {
            accessToken,
            refreshToken,
            privateKey,
            publicKey
        }
    } catch (error) {
        throw new BadRequestError('Create Token Failed', error.message)
    }
}

export const authentication = asyncHandler( async (req, res, next) => {
   const userId = req.headers[HEADER.CLIENT_ID]
   if (!userId) throw new AuthFailureError('Invalid Request')

   // 2
   const keyStore = await KeyTokenService.findByUserId({ userId, select: ['publicKey']})
   if (!keyStore) throw new NotFoundError('Not Found KeyStore')

   // 3
   if (req.headers[HEADER.AUTHORIZATION]) {
    try {
        const accessToken = req.headers[HEADER.AUTHORIZATION]
        if (!accessToken) throw new AuthFailureError('Unauthorized')
        // const base64PublicKey = Buffer.from(keyStore.publicKey, 'base64');
        const decodeUser = await verifyJWT(accessToken, keyStore.publicKey)
        if (userId != decodeUser.userId) throw new AuthFailureError('Invalid User')
        req.keyStore = keyStore
        req.user = decodeUser
        return next()
        } catch (error) {
                throw error
        }
    } else {
        throw new AuthFailureError('Unauthorized')
    }
})

export const verifyJWT = (token, keySecret) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, keySecret, (err, payload) => {
            if (err) {
                reject(new AuthFailureError('Invalid Token'));
            } else {
                resolve(payload);
            }
        });
    });
};
