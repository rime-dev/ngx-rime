export interface User {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  photoURL: string;
  name: string;
  lastName: string;
  headline: string;
  group: string;
  role: string;
  type: string;
  nif: string;
  stats: Record<string, unknown>;
}
