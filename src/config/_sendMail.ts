import sgm from "@sendgrid/mail";
import logger from "./_logger";

export const sendRawMail = async (
  to: string,
  subject: string,
  html: string
) => {
  sgm.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL as string,
    subject,
    html,
  };

  try {
    await sgm.send(msg);
  } catch (error) {
    console.error(error);
  }
};

export const sendTemplateMail = async (
  to: string,
  templateId: string,
  data: any
) => {
  sgm.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to,
    subject: "You have requested a password reset",
    from: process.env.SENDGRID_EMAIL as string,
    templateId,
    dynamic_template_data: data,
  };

  try {
    await sgm.send(msg);
  } catch (error) {
    logger.error(error);
  }
};
