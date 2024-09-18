'use strict'
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import emailVerifyModel from '../models/emailVerify.model.js';
import userRepo from '../repositories/user.repo.js';
import { convertToObjectIdMongodb } from './../utils/index.js';
export async function sendEmail(req, res){
    const { email, userId } = req.query
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GOOGLE_ACCOUNT_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    })
    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await emailVerifyModel.create({
        verificationToken,
        verificationExpires: Date.now() + 3600000,
        type: 'registration',
        userId: convertToObjectIdMongodb(userId)
    });

    const verificationLink = `${process.env.SERVER_URI}/signup-verify-email?email=${email}&token=${verificationToken}`;
    const mailOptions = ({
        from: '"Charlotte" <charlotte.webapp@gmail.com>',
        to: email,
        subject: 'Email Verification',
        html: `
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                    <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 40px; border-radius: 8px;">
                        <tr>
                        <td align="center" style="font-family: Arial, sans-serif; color: #333333; font-size: 18px;">
                            <p style="margin-bottom: 24px;">Vui lòng nhấn nút bên dưới để xác minh địa chỉ email của bạn và hoàn tất đăng ký.</p>
                            <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 14px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">Xác Minh Email</a>
                        </td>
                        </tr>
                        <tr>
                        <td align="center" style="padding-top: 20px; font-family: Arial, sans-serif; font-size: 14px; color: #999999;">
                            <p>Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.</p>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
        `
    });
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
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
        return res.redirect(`${process.env.FRONTEND_URI}/email-verification/success`);
    } catch (error) {
        return res.redirect(`${process.env.FRONTEND_URI}/page-not-found`);
    }
}
    export async function emailVerifyForLogin(req, res, next) {
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
            return res.redirect(`${process.env.FRONTEND_URI}/email-verification/success`);
        } catch (error) {
            return res.redirect(`${process.env.FRONTEND_URI}/page-not-found`);
        }
    }