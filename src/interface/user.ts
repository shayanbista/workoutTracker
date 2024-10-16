export interface User {
  id: number | string;
  name: string;
  password: string;
  email: string;
  role: string;
  permissions: string[];
}
