import { createTransport } from "../config/nodemailer.js";

export const sendVerificationEmail = async (userData) => {
    const transporter = createTransport(
        process.env.MAILTRAP_HOST,
        process.env.MAILTRAP_PORT,
        process.env.MAILTRAP_USER,
        process.env.MAILTRAP_PASSWORD
    );

    return await transporter.sendMail({
        from: '<producttraker@bitcoin.com>',
        to: userData.email,
        subject: "Verify your account ✔",
        text: "make a click to verify your account", // plain text body
        html: `
            <p>Please verify your account ${userData.email} so that you can enter to the control panel</p>
            <a href="${process.env.FRONTEND_URL}/auth/verify/${userData.token}">Click to confirm account</a>
        `
    });
}