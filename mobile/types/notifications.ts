export interface PushToken {
  token: string;
  platform: "ios" | "android";
  deviceId?: string;
  createdAt: number;
}

export interface NotificationPreferences {
  enabled: boolean;
  tripReminders: boolean;
  newMessages: boolean;
  promotions: boolean;
  sound: boolean;
}
