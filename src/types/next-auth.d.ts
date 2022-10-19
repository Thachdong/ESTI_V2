import NextAuth from "next-auth"

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
    token: any
  }
}