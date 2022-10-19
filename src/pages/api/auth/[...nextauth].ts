import { AxiosError } from "axios";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import { authenticate } from "src/api";
import { parseJwt } from "~modules-core/utility";

const handleCredentialsAuthorize = async (credentials: any ) => {
  try {
    const { data: stringifyPayload } = credentials;

    const payload = JSON.parse(stringifyPayload as string);

    const res = await authenticate.login(payload);

    const { token } = res.data;

    const { userInfo, exp } = parseJwt(token);

    return Promise.resolve({
      ...userInfo,
      accessToken: token,
      accessTokenExp: exp,
    });
  } catch (error: any) {
    return Promise.reject(new Error(encodeURIComponent(JSON.stringify(error?.data))));
  }
};

const credentialsConfig: CredentialsConfig = {
  type: "credentials",
  id: "credentials-signin",
  name: "credentials-signin",
  credentials: {
    userName: { label: "username" },
    password: { label: "password" },
  },
  authorize: handleCredentialsAuthorize,
};

export default NextAuth({
  providers: [CredentialsProvider(credentialsConfig)],

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
