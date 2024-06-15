export interface NotificationData {
  error: boolean;
  text: string;
  action?: {
    icon: boolean;
    button: string;
  }
}
