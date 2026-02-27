
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { createUser, getUserByEmail } from './actions';
import type { NextAuthConfig } from "next-auth"
 
export const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // user is only available on first sign in
        try {
          const responseUser = await getUserByEmail(user);

          if (responseUser.ok && responseUser.user) {
            token.id = responseUser.user.id;
          }
        } catch (error) {
            console.error('Error adding id to token: ', error)
        }
      }
      return token;
    },

    async signIn ({user}) {
      if (!user.email) return false;

      try {
        const responseUser = await getUserByEmail(user)
        const { ok, user: existingUser } = responseUser;

        if (!ok) return false;

        if (!existingUser) {
          const createResponse = await createUser(user);
          const { ok } = createResponse;

          if (!ok) return false;
          return true;
        }
      } catch (error) {
        console.error('Error al iniciar sesión: ', error);
        throw new Error('Error al iniciar sesión.');
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Permite redirecciones relativas
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // Permite redirecciones a otros dominios si vienen en la URL
      if (new URL(url).origin === baseUrl) return url;
      
      // Si no es ninguno de los anteriores (ej. primer login), redirige a dashboard
      return baseUrl + '/dashboard';
    },

    async session({ session, token }) {
      if (session?.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
