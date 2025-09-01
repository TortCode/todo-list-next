This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
## Setup
First make sure dependencies are installed
```bash
npm install
```

Create a .env file with the contents
```bash
DATABASE_URL="file:./dev.db"
```

Then, to initialize the database and generate the Prisma client, run
```bash
npx prisma migrate reset
```

## Running

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

### HTML/CSS/JS
The [Odin Project Foundations Course](https://www.theodinproject.com/paths/foundations/courses/foundations) 
has lots of links to great resources for learning basic HTML, CSS, and JS.

### React.js
See https://react.dev/learn to learn more about React.

### Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Prisma
Checkout the Prisma ORM docs at https://www.prisma.io/docs/orm.