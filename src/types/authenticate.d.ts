type TLoginPayload = {
  username: string;
  password: string;
}

type TLoginResponse = {
  token: string;
}

type TForgotPassword = {
  userName: string
}