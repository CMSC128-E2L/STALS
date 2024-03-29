import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { type User } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
    profile: User;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

function getProviders() {
  const providers = [];
  if (
    !!env.DISCORD_CLIENT_ID &&
    !!env.DISCORD_CLIENT_SECRET &&
    env.DISCORD_CLIENT_ID !== "" &&
    env.DISCORD_CLIENT_SECRET !== ""
  ) {
    providers.push(
      DiscordProvider({
        clientId: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_CLIENT_SECRET,
      }),
    );
  }

  if (
    !!env.GOOGLE_CLIENT_ID &&
    !!env.GOOGLE_CLIENT_SECRET &&
    env.GOOGLE_CLIENT_ID !== "" &&
    env.GOOGLE_CLIENT_SECRET !== ""
  ) {
    providers.push(
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    );
  }

  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */

  return providers;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    session: async ({ session, user }) => {
      const profile = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
        profile: {
          ...profile,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: getProviders(),
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
