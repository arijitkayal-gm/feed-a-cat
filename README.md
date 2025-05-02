This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Personal Notes:
For using nextauth
1. Wrap the whole app in sessionprovider and make it client side or add a client side component where u wrapp children in SessionProvider and later wrap the main layout children in the component created.
2. Create a route.js on api/auth/[...nextauth]/ and copy the code from nextauth website
3. Changes are made as it is a route.js we change "export default NextAuth()" to "export const authoptions= NextAuth()"
4. Adding "export {authoptions as GET, authoptions as POST}" 
5. Create an .env.local file and add the id and secrets needed in NextAuth in route.js
6. Now we can easily use (useSession, signIn, signOut) whereever we want by making that a client side component and use them.
