import prisma from "@/app/utils/connect"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth/next"
import VkProvider  from "next-auth/providers/vk"

const clientId = process.env.VK_CLIENT_ID;
const clientSecret = process.env.VK_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("VK_CLIENT_ID and VK_CLIENT_SECRET must be defined in your environment");
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    VkProvider({
      clientId,
      clientSecret,
    })
  ],
  session: {
    strategy: 'jwt'
  }

})

export { handler as GET, handler as POST }
