import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "../../../config.js";

import { EmailOptionsInteface } from "../../interfaces/util-interfaces.js";

export const SendMail = async (
  options: EmailOptionsInteface
): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.legalTrademarkOfficeSmtpHost,
    port: parseInt(config.legalTrademarkOfficeSmtpPort),
    service: config.legalTrademarkOfficeSmtpService,
    auth: {
      user: config.legalTrademarkOfficeSmtpMail,
      pass: config.legalTrademarkOfficeSmtpPassword,
    },
  });

  const { email, subject, template, data } = options;

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatePath = path.join(__dirname, "../mails", template);

  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: config.legalTrademarkOfficeSmtpMail,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
