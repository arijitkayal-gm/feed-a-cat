import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import dbConnect from '@/lib/dbConnect'
import bcrypt from 'bcryptjs'


export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

        // 2. Credentials provider for email/username + password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                    const { identifier, password } = credentials
                    await dbConnect()

                    const user = await User.findOne({
                        $or: [{ email: identifier }, { username: identifier }]
                    })

                    if (!user) {
                        throw new Error("No user found")
                    }
                    
                    const isValid = await bcrypt.compare(password, user.password)
                    
                    if (!isValid) {
                        throw new Error("Invalid password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.username,
                        username: user.username
                    }
               
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider == "github") {
                //database Connections
                await dbConnect()
                //Check if user exist
                const currentUser = await User.findOne({ email: user.email })

                if (!currentUser) {
                    //create a new user
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split('@')[0],
                    })
                }
                return true;
            }
            //Credentials provider
            if(account.provider=="credentials"){
                return true
            }
        },
        async session({ session, user, token }) {
            if (token) {
                session.user.id = token.id
            
                const dbUser = await User.findOne({ email: session.user.email });
                session.user.name = dbUser.username
            }
            

            return session
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.username = user.username
            }

            return token
        }
    },

    session: {
        strategy: "jwt",
      },

    pages: {
        signIn: "/login"
    },

    // Debugging in development
    debug: process.env.NODE_ENV === 'development',

    // Secret for cookie encryption
    secret: process.env.NEXTAUTH_SECRET

})

export { authoptions as GET, authoptions as POST }