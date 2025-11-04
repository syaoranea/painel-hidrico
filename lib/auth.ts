
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from 'bcryptjs'

// Criar o adapter uma única vez (fora da função principal)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          

          if (!user?.password) return null

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            firstName: user.firstName,
            lastName: user.lastName,
            weight: user.weight,
            age: user.age,
            height: user.height,
            activityLevel: user.activityLevel,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.weight = user.weight
        token.age = user.age
        token.height = user.height
        token.activityLevel = user.activityLevel
      }
      return token
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.weight = token.weight
        session.user.age = token.age
        session.user.height = token.height
        session.user.activityLevel = token.activityLevel
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}
