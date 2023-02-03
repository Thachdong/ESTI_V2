import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "src/api";

export default NextAuth({
  // @link https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      id: "credentials-signin",
      name: "credentials-signin",
      credentials: {
        userName: { label: "username" },
        password: { label: "password" },
      },
      authorize: async (credentials: any, request: any) => {
        try {
          // console.log("log creden", credentials);

          // const { userInfo, exp } = parseJwt(credentials.token);
          // console.log(userInfo);
          // return Promise.resolve({
          //   ...userInfo,
          //   accessToken: credentials.token,
          //   accessTokenExp: exp,
          //   Roles:
          //     userInfo.Roles?.filter((role: any) => role.IsView)?.map(
          //       (role: any) => role.RoleName
          //     ) || [],
          // });
          const { data } = credentials;
          const payload = JSON.parse(data);
          const res = await authenticate.login(payload);

          // console.log("res lk", res);
          const { userInfo, exp } = parseJwt(res.data.token);
          // console.log()
          // console.log("hahaa", userInfo);
          
          return Promise.resolve({
            ...userInfo,
            accessToken: res.data.token,
            accessTokenExp: payload.RememberPassword ? false : exp,
            Roles:
              userInfo.Roles?.filter((role: any) => role.IsView)?.map(
                (role: any) => role.RoleName
              ) || [],
          });
        } catch (error: any) {
          console.log("authorize error", error);
          const data = error?.response?.data;
          const errorData = {
            data,
            callbackUrl: request?.body?.callbackUrl,
          };

          return Promise.reject(
            new Error(encodeURIComponent(JSON.stringify(errorData)))
          );
        }
      },
    }),
  ],

  session: {
    maxAge: 86400, //1 day
    strategy: "jwt",
  },

  // @link https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    //   async encode() {},
    //   async decode() {},
  },

  // @link https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async jwt({ token, user }) {
      user && (token.user = user);

      return token;
    },
    async session({ session, token }) {
      session.token = token.accesToken;
      token.user && (session.user = token.user as Session["user"]);
      return session;
    },
  },

  //Events are asynchronous functions that do not return a response, they are useful for audit logs / reporting.
  // You can specify a handler for any of these events below, for debugging or for an audit log.
  // @link https://next-auth.js.org/configuration/events
  events: {
    async signIn(message) {
      /* on successful sign in */
    },
    async signOut(message: any) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async linkAccount(message) {
      /* account linked to a user */
    },
    async session(message: any) {
      /* session is active */
    },
    // async error(message) {
    //   /* error in authentication flow */
    // },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug: true, // Use this option to enable debug messages in the console
});
declare module "next-auth" {
  interface Session {
    user: any;
    Roles: [];
    accessToken: string | undefined | null;
    accessTokenExp: number | string | undefined | null;
    email: string | undefined | null;
    fullName: string | undefined | null;
    isAdmin: boolean | undefined | null;
    menuList: string | undefined | null;
    permission: string | undefined | null;
    phone: string | undefined | null;
    roles: string | undefined | null;
    thumbnail: string | undefined | null;
    userId: string | undefined | null;
    userName: string | undefined | null;
  }
}

function parseJwt(token: string) {
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

export { parseJwt };
