import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { createUser, getUserByEmail } from './actions';
import type { NextAuthConfig } from 'next-auth';

export const config = {
  trustHost: true,
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
    async signIn({ user, profile }) {
      const email = user?.email ?? profile?.email;
  
      if (!email) {
        console.error('No email in user/profile');
        return false;
      }
  
      try {
        const response = await getUserByEmail(email);
  
        if (!response.ok && response.message !== 'USER_NOT_FOUND') {
          console.error('DB error (NO BLOQUEO LOGIN):', response.message);
        }
  
        if (response.user === null) {
          const created = await createUser({
            name: user.name ?? profile?.name ?? '',
            email,
            image:
              user.image ??
              (profile as any)?.picture ??
              (profile as any)?.avatar_url ??
              null,
          });

          if (!created.ok) {
            console.error('DB error creating user:', created.message);
            return false;
          }
        }
  
        return true;
      } catch (err) {
        console.error('SignIn error (EXCEPTION):', err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) { // user is only available on first sign in
        try {
          const responseUser = await getUserByEmail(user.email!);

          if (responseUser.ok && responseUser.user) {
            token.id = responseUser.user.id;
          }
        } catch (error) {
            console.error('Error adding id to token: ', error)
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
