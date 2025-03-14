import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "../config.js";
import { EmailOptionsInteface } from "../interfaces/utils-interfaces.js";

// LTO SENDING MAIL FUNCTION
export const LtoSendMail = async (
  options: EmailOptionsInteface
): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.ltoSmtpHost,
    port: parseInt(config.ltoSmtpPort),
    service: config.ltoSmtpService,
    auth: {
      user: config.ltoSmtpMail,
      pass: config.ltoSmtpPassword,
    },
  });

  const { email, subject, template, data } = options;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatePath = path.join(__dirname, "../mails", template); 

  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: config.ltoSmtpMail,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
