export interface RoleInfo {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  defaultEmail: string;
  angle?: number;
}

export interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: RoleInfo;
  token?: string;
  loginTime: string;
}

