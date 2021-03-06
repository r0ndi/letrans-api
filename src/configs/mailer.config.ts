import appConfig from "./app.config";
import nodemailer from "nodemailer";

const mailerConfig = {
    host: String(appConfig.MAILER_HOST),
    port: Number(appConfig.MAILER_PORT),
    secure: Number(appConfig.MAILER_PORT) === 465,
    auth: {
      user: String(appConfig.MAILER_USER_NAME),
      pass: String(appConfig.MAILER_USER_NAME),
    },
};

if (mailerConfig.host === "smtp.ethereal.email") {
    (async () => {
        try {
            const testAccount = await nodemailer.createTestAccount();
            mailerConfig.auth.user = testAccount.user;
            mailerConfig.auth.pass = testAccount.pass;
        } catch (error) {}
    })();
}

export default mailerConfig;
