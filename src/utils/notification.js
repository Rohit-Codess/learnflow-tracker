export const requestNotificationPermission = () => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
};

export const sendReminderNotification = (taskTitle) => {
  if (Notification.permission === 'granted') {
    new Notification('⏰ Task Reminder', {
      body: `Don't forget to complete: "${taskTitle}"`,
      icon: '/icon.png', // optional custom icon
    });
  }
};
