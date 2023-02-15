import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnection from "../../../../database/conn";
import UserScm from "../../../../database/schema";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credential",
      async authorize(credentials, req) {
        dbConnection().catch((error) => {
          error: "Connection failes";
        });

        // check users credential
        const result = await UserScm.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("User not found");
        }

        // check password

        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error(" Email and password do not match");
        }
        return result;
      },
    }),
  ],
  secret: process.env.SECRET_KEY,
});
