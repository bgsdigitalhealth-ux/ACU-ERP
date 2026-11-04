export interface RoleInfo {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  defaultEmail: string;
  angle: number; // in degrees for radial placement
  iconPath?: string;
  cardPath?: string;
}

export interface UserSession {
  role: RoleInfo;
  email: string;
  isAuthenticated: boolean;
}
