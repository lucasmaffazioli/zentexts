# Zen Texts

Jamstack clone of Medium with these features:

- Subscription via Sripe
- Content creation via Prismic CMS
- Login via GitHub
- User subscription status saved on FaunaDB
- Static Site Generation, Server Side Rendering and SPA
- Pagination
- Responsive

### How can I run?

- yarn dev
- stripe listen --forward-to localhost:3000/api/webhooks
- stripe listen --forward-to https://zentexts.vercel.app/api/webhooks
