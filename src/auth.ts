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
        return false; // único caso en el que bloqueamos
      }
  
      try {
        const response = await getUserByEmail(email);
  
        // Si hay error de BBDD, LO LOGEAMOS PERO NO BLOQUEAMOS
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
        }
  
        return true;
      } catch (err) {
        console.error('SignIn error (EXCEPTION):', err);
        return false;
      }
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
