function sendNotification(name, daysLeft) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
  if (daysLeft <= 2) {
    new Notification("⚠️ 賞味期限が近い食材", {
      body: `${name} の期限があと ${daysLeft}日！`,
      icon: "avatars/vegetable.png"
    });
  }
}
