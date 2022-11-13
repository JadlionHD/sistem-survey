// pages/api/auth/[...nextauth].js
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUser } from "../../../components/Login";
import { decrypt, encrypt } from "../../../utils/crypto";
import { query } from "../../../utils/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2592000 // 30 hari
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password, sebagai } = credentials as LoginUser;
        console.log(encrypt(password!));
        const result = (await query("SELECT id, username, password, nama_lengkap, sebagai FROM user WHERE username=? AND sebagai=?", [username, sebagai])) as { id: number; username: string; password: string; nama_lengkap: string; sebagai: string }[] | null;
        if (result !== null) {
          let resultDecrypted = decrypt(result[0].password);
          if (password === resultDecrypted) {
            return {
              id: `${result[0].id}`,
              name: result[0].nama_lengkap,
              username: result[0].username,
              sebagai: result[0].sebagai
            };
          } else {
            throw new Error("Invalid Password");
          }
        } else {
          throw new Error("Invalid Login");
        }
      }
    })
  ],
  pages: {
    signIn: "/",
    newUser: "/dashboard"
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      //console.log(token, user, account, profile, isNewUser);
      if (user) {
        //token = user;
        token.user = user;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = token.user as User;
      return session;
    }
  }
};
export default NextAuth(authOptions);
