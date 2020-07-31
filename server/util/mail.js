const mailer = require('nodemailer');
const transporter = mailer.createTransport({
    service: process.env.SERVICE_EMAIL,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
});
function send() {
    const emailFrom = process.env.ADMIN_EMAIL || 'root291216@gmail.com';
    return async function sendMail(mailOptions) {
        try {
            const result = await transporter
                .sendMail({
                    emailFrom,
                    ...mailOptions,
                })
                .catch((error) => {
                    throw error + '';
                });
            return result;
        } catch (error) {
            throw error + '';
        }
    };
}
module.exports = send();
