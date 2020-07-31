const cron = require('node-cron');
const task = require('../models/task')();
const mail = require('../util/mail');
const sendEmailEveryMinute = cron.schedule('* * * * *', async () => {
    const date = new Date();
    const reuslt = await task.getTaskByTime(date);
    if (reuslt) {
        try {
            reuslt.forEach((element) => {
                console.log(element);
                const optionMail = {
                    to: element.user.email,
                    subject: element.user.fullName + ':' + element.title,
                    text: `<h1>${element.description}</h1>`,
                };
                mail(optionMail);
            });
        } catch (error) {
            console.log(error + '');
        }
    }
});
module.exports = sendEmailEveryMinute;
