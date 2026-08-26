const pool = require('../config/database')

class NotificationService {
  async createNotification(userId, type, title, message) {
    try {
      const result = await pool.query(
        'INSERT INTO notifications (user_id, type, title, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, type, title, message]
      )

      return result.rows[0]
    } catch (error) {
      console.error('Create notification error:', error)
      throw new Error('Failed to create notification')
    }
  }

  async sendBulkNotifications(userIds, type, title, message) {
    try {
      const notifications = userIds.map(userId => 
        this.createNotification(userId, type, title, message)
      )

      await Promise.all(notifications)
      return { success: true, count: userIds.length }
    } catch (error) {
      console.error('Bulk notification error:', error)
      throw new Error('Failed to send bulk notifications')
    }
  }

  async sendApplicationUpdateNotification(userId, applicationId, status) {
    const title = 'Application Status Update'
    const message = `Your application #${applicationId} status has been updated to: ${status}`

    return this.createNotification(userId, 'application', title, message)
  }

  async sendPaymentReminderNotification(userId, paymentId, dueDate, amount) {
    const title = 'Payment Reminder'
    const message = `Payment of ₹${amount} is due on ${dueDate}. Payment ID: ${paymentId}`

    return this.createNotification(userId, 'payment', title, message)
  }

  async sendGrievanceUpdateNotification(userId, grievanceId, status) {
    const title = 'Grievance Status Update'
    const message = `Your grievance #${grievanceId} status has been updated to: ${status}`

    return this.createNotification(userId, 'grievance', title, message)
  }

  async sendSystemAnnouncement(userIds, announcement) {
    const title = 'System Announcement'
    const message = announcement

    return this.sendBulkNotifications(userIds, 'system', title, message)
  }
}

module.exports = new NotificationService()
