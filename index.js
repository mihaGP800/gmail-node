const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3010
const smtpLogin = process.env.SMTP_LOGIN || '---' // 'portfolio.mihagoroh@gmail.com'
const smtpPassword = process.env.SMTP_PASWORD || '---' // opnugtkzcajkcpkk

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {

    const {name, email, message,} = req.body


    let info = await transporter.sendMail({
        from: 'Miha portfolio email', // sender address
        to: "mihagoroh@gmail.com", // list of receivers
        subject: "TEST EMAIL", // Subject line
        //text: "Hello world?", // plain text body
        html: `<b>Response from HR ${name}</b>
                <p/>
                email: ${email}
                <p/>
                message: ${message}
                <p/>`,
    });

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // service: "Gmail",
    // port: 465,
    // secure: true,
    auth: {
        user: smtpLogin, // generated ethereal user
        pass: smtpPassword, // https://stackoverflow.com/questions/70606793/nodemailer-with-gmail-there-was-an-error-error-invalid-login-535-5-7-8-user
    },
});