import nodemailer from 'nodemailer';

const from = '"GPB Todos" <info@gpbtodos.com>'

function setup() {
  return nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  })
}

export function sendConfirmationEmail(user) {
  const transport = setup()
  const email = {
    from,
    to: user.email,
    subject: 'Welcome to GPB Todos',
    text: `
    Welcome to GPB Todos. Confirm by going to this link ${user.generateConfirmationUrl()}
    `
  }
  transport.sendMail(email)
}