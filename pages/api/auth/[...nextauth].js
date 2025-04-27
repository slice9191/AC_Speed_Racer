import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,      
      authorization: { params: { scope: 'identify guilds guilds.members.read' } }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Attach Discord user ID to session
      return session;
    }
  }
  secret: process.env.0k0yb0xstr7o2smn9nghm88tj7kvs2yn,

  nextAuthUrl: process.env.https://ac-speed-racer.vercel.app/download,
})
