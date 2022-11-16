import { request } from "../method";
import FormData from "form-data";

const convertLoginPayloadToFormdata = (payload: TLoginPayload) => {
  const formData = new FormData();

  formData.append("username", payload.username);

  formData.append("password", payload.password);

  return formData;
};

export const authenticate = {
  login: (loginPayload: TLoginPayload) =>
    request.post<FormData, TLoginResponse>(
      "Authenticate/login",
      convertLoginPayloadToFormdata(loginPayload)
    ),
  fotgotPassword: (payload: TForgotPassword) => request.post<TForgotPassword, string>("Authenticate/forgot-password", payload)
};
