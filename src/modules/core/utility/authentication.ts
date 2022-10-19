export function parseJwt(token: string) {
  const base64Url = token.split(".")[1];

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const buf = Buffer.from(base64, "base64").toString("utf-8");

  const payload = JSON.parse(buf);
  
  return {
    userInfo: JSON.parse(
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
      ]
    ),
    exp: payload.exp,
  };
}