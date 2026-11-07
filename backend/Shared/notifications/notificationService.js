export const notificationService = {
  sendInAppNotification: async ({ userId, type, message }) => {
    return { id: `notif-${Date.now()}`, userId, type, message, timeAgo: 'Just now', read: false };
  },
  sendEmailAlert: async ({ to, subject, html }) => {
    console.log(`[Notification Alert] Email dispatched to ${to}: ${subject}`);
    return { success: true, timestamp: new Date() };
  },
};
export default notificationService;

