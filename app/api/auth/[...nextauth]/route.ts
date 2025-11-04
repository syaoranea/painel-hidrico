import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          if (!res.ok) return null

          const user = await res.json()
          console.log("Usuário autenticado:", user)

          return user || null
        } catch (err) {
          console.error("Erro na autenticação:", err)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.email = user.email
        token.age = user.age
        token.height = user.height   // ✅ corrigido
        token.weight = user.weight   // ✅ corrigido
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.firstName = token.firstName
      session.user.lastName = token.lastName
      session.user.email = token.email
      session.user.age = token.age
      session.user.height = token.height   // ✅ corrigido
      session.user.weight = token.weight   // ✅ corrigido
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET || "super-secret-dev",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
export default handler
