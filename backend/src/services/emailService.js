const nodemailer = require('nodemailer')
const config = require('../config/env')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    })
  }

  async sendEmail(to, subject, html, text = '') {
    try {
      const mailOptions = {
        from: config.email.user,
        to,
        subject,
        html,
        text
      }

      const info = await this.transporter.sendMail(mailOptions)
      console.log('Email sent:', info.messageId)
      return info
    } catch (error) {
      console.error('Email service error:', error)
      throw new Error('Failed to send email')
    }
  }

  async sendWelcomeEmail(userEmail, userName) {
    const html = `
      <h1>Welcome to GovConnect</h1>
      <p>Dear ${userName},</p>
      <p>Thank you for registering with GovConnect. Your account has been successfully created.</p>
      <p>You can now access various government services through our platform.</p>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
      <p>Best regards,<br>GovConnect Team</p>
    `

    return this.sendEmail(userEmail, 'Welcome to GovConnect', html)
  }

  async sendApplicationStatusEmail(userEmail, userName, applicationId, status) {
    const html = `
      <h1>Application Status Update</h1>
      <p>Dear ${userName},</p>
      <p>Your application (ID: ${applicationId}) status has been updated to: <strong>${status}</strong></p>
      <p>Please log in to your GovConnect account to view more details.</p>
      <p>Best regards,<br>GovConnect Team</p>
    `

    return this.sendEmail(userEmail, `Application Status: ${applicationId}`, html)
  }

  async sendPaymentConfirmationEmail(userEmail, userName, amount, transactionId) {
    const html = `
      <h1>Payment Confirmation</h1>
      <p>Dear ${userName},</p>
      <p>Your payment of ₹${amount} has been successfully processed.</p>
      <p>Transaction ID: ${transactionId}</p>
      <p>A receipt has been generated and is available in your account.</p>
      <p>Best regards,<br>GovConnect Team</p>
    `

    return this.sendEmail(userEmail, 'Payment Confirmation', html)
  }

  async sendPasswordResetEmail(userEmail, resetToken) {
    const resetUrl = `${config.frontend.url}/reset-password?token=${resetToken}`
    const html = `
      <h1>Password Reset Request</h1>
      <p>You have requested to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, please ignore this email.</p>
    `

    return this.sendEmail(userEmail, 'Password Reset', html)
  }
}

module.exports = new EmailService()
