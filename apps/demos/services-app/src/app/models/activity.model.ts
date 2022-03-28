export interface Activity {
  uid: string;
  code: string;
  icon: string;
  title: string;
  name?: Record<string, string>;
  description?: Record<string, string>;
}
