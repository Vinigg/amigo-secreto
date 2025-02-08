import { __prod__ } from "@/constants"
import "dotenv-safe/config"
import * as nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

export async function sendEmail(to: string, subject: string, html: string) {
  const transport = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) == 465, // true for 465, false for other ports,
    debug: !__prod__,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD
    }
  } as SMTPTransport | SMTPTransport.Options

  const transporter = nodemailer.createTransport(transport)

  let info = await transporter.sendMail({
    from: `Amigo Secreto <${process.env.EMAIL_SENDER}>`,
    to: to, // list of receivers
    subject: subject, // Subject line
    html
  })

  console.log("Message sent: %s", info.messageId)
}
