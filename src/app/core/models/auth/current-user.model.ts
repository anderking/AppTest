export interface LoginFormModel {
  username: string;
  password: string;
}
export interface CurrentUserModel {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  expirationTime: string;
  refreshToken: string;
}
