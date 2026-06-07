This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Getting Started
### Setting up this Next.js project with a containerized PostgreSQL database
Follow these steps to set up the development environment:
1. #### Start the database container (using Docker or Podman) in root run:
```bash
docker compose up -d
# or
podman-compose up -d
```
2. #### Navigate to the web directory and run migrations:
```bash
cd kino-webb

npm run db:migrate
# or
pnpm db:migrate
```
3. #### Refresh the Prisma Client:
```bash
npm run prisma generate
# or
pnpm prisma generate
```
4. #### Seed the PostgreSQL database with dummy data:

```bash
npx prisma db seed
# or
pnpm prisma db seed
```
5. #### Run the server
If you want to run the development server:

```bash
npm run dev
# or
pnpm dev
```
If you want to test the production build:
```bash
npm run build
# or
pnpm build
# and then
npm start
# or
pnpm start
```
6. #### If you want to try a variant with 2 containers, 1 for web-server and 1 for DB:
In directory kino-webb:
```bash
docker compose -f compose.two-cont.yaml up -d
# or
podman-compose -f compose.two-cont.yaml up -d
```
7. #### Or if you want to test a production server with testable dummy-data in the DB. To get help via command line, run:

```bash
npm run cont:setup
# or
pnpm cont:setup
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database
- This project uses Prisma ORM to make queries to the PostgreSQL database.
- The PostgreSQL database is running (if you follow the instructions above...) in a Docker/Podman container and is communicating on port :5432  
---
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.