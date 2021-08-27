[![GitHub deployments](https://img.shields.io/github/deployments/lucasmaffazioli/zentexts/production?label=vercel&logo=vercel&logoColor=white)](https://zentexts.vercel.app/)

# Zen Texts

Jamstack clone of Medium with these features:

- Login via GitHub
- Subscription via Stripe
- Content creation via Prismic CMS
- User subscription status saved on FaunaDB
- Static Site Generation, Server Side Rendering and SPA
- Blocked content based on subscription
- Pagination
- Responsive
- Deployed on Vercel
- Comments with Utterances

https://user-images.githubusercontent.com/12513049/131080870-fa1f4e19-6cc8-4411-b82d-a1617c832c86.mp4

Stack: React, Next.js (SPA, SSR, SSG), NextAuth, Jamstack [Stripe, FaunaDB, Prismic CMS], SASS, CSS Modules, Axios

### How can I run?

#### yarn dev

#### stripe listen --forward-to localhost:3000/api/webhooks

#### Add the following .env.local keys:

- Stripe

STRIPE_API_KEY=

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=

STRIPE_SUCCESS_URL=

STRIPE_CANCEL_URL=

STRIPE_WEBHOOK_SECRET=

- Github

GITHUB_ID=

GITHUB_SECRET=

- FaunaDB

FAUNADB_KEY=

- Prismic CMS

PRISMIC_ACCESS_TOKEN=

PRISMIC_API_ENDPOINT=

- NextAuth PRODUCTION

NEXTAUTH_URL=
