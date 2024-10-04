'use strict'
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import { BadRequestError } from '../core/error.response.js';
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

    const verificationLink = `${process.env.SERVER_URI}/api/email/signup-verify-email?email=${email}&token=${verificationToken}`;
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
            throw new BadRequestError(err.message)
        } else {
            return res.status(202).json({
                code: 202,
                message: 'Email has been sent successfully, waiting for confirmation'
            })
        }
    });
}
export async function emailVerifyForRegistration(req, res, next) {
    try {
        const email = req.query.email;
        const token = req.query.token;
        
        if (!email || !token) {
            return res.redirect(`${process.env.FRONTEND_URI}/page-not-found?success=false&message=Missing email or token&status=404`);
        }

        const userId = await userRepo.findUserByEmail({ email, select: ['_id'] });
        if (!userId) {
            return res.redirect(`${process.env.FRONTEND_URI}/page-not-found?success=false&message=User Not Found&status=404`);
        }

        const emailVerify = await emailVerifyModel.findOne({ verificationToken: token });
        if (!emailVerify) {
            return res.redirect(`${process.env.FRONTEND_URI}/page-not-found?success=false&message=Invalid token&status=404`);
        }

        await userRepo.verified({ userId, isVerified: true });
        emailVerify.verificationToken = undefined;
        emailVerify.verificationExpired = Date.now();
        await emailVerify.save();

        return res.redirect(`${process.env.FRONTEND_URI}/email-verification/success?success=true&message=Email verification successful&status=200`);
    } catch (error) {
        res.redirect(`${process.env.FRONTEND_URI}/page-not-found?success=false&message=Error verifying email&status=500`);
        throw new BadRequestError(error.message);
    }
}
