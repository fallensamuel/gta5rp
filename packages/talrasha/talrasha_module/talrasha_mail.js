module.exports.Init = () => {
    mp.mailer = {};
    mp.mailer.sendMail = (to, subject, message) => {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
        message += "<br /><br /> С Уважением, TalRasha";
        const mailOptions = {
            from: 'TalRasha',
            to: to,
            subject: subject,
            html: message
        };
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) console.log(err)
            else console.log(info);
        });
    }
}
