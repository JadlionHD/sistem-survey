import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      sebagai: string;
    };
  }

  interface User {
    id: string;
    name: string;
    username: string;
    sebagai: string;
  }
}
