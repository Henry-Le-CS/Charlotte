'use strict'
import emailVerifyModel from '../models/emailVerify.model.js';
import userRepo from '../repositories/user.repo.js';

export async function emailVerifyForLogin(req, res, next) {
    try {
        const token = req.query.token;

        const user = await UserRepository.findByVerificationToken(token);

        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        await user.save();

    res.send('Email verified successfully');
    } catch (error) {
        return res.status(404).json({
            code: 404,
            message: "Email verification failed"
        })
    }
}

export async function emailVerifyForRegistration(req, res, next) {
    try {
        const email = req.query.email;
        const token = req.query.token;
        const userId = await userRepo.findUserByEmail({ email, select: ['_id']});
        const emailVerify = await emailVerifyModel.findOne({ verificationToken: token})
        if (!userId) {
            return res.status(400).send('User not found');
        }
        if (!emailVerify) {
            return res.status(400).send('Invalid or expired token');
        }
        await userRepo.verified({ userId, isVerified: true})
        emailVerify.verificationToken = undefined;
        emailVerify.verificationExpired = Date.now();
        await emailVerify.save()
        res.send('Email verified successfully');
    } catch (error) {
        return res.status(404).json({
            code: 404,
            message: `Email verification failed: ${error.message}`
        });
    }
}