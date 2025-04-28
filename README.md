# Auth.Js Playground Template

A simple and extensible playground for integrating Auth.js (NextAuth v5) in a Next.js app.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (any stable version)
- [Git](https://git-scm.com/) (for cloning the repository)
- [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference#cli-commands) (installed automatically with dependencies)

Optional:

- A Resend account (for email sending)
- OAuth provider accounts (GitHub, Google, Discord, etc.)

## Installation

```bash
1) git clone https://github.com/itzzsauravp/authjs-template .
2) npm install
3) npx prisma migrate dev --name init
```

## How to get started

Copy the `.env.local.example` to `.env.local` ( or just rename it )

Visit these links and get you `ID` and `SECRET` and add then to your `.env.local` file, This is how it should look like:

```bash
# File: .env.local

# Generate using -> npx auth secret (or can generate from anywhere)
AUTH_SECRET=

# https://github.com/settings/developers
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# https://console.cloud.google.com/welcome/new
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# https://discord.com/developers/applications
AUTH_DISCORD_ID=
AUTH_DISCORD_SECRET=

# https://developer.x.com
AUTH_TWITTER_ID=
AUTH_TWITTER_SECRET=

# https://resend.com/
AUTH_RESEND_KEY=
RESEND_EMAIL_FROM='noreply@resend.dev'

```

Copy the `.env.example` to `.env` ( or just rename it )

```bash
# Set your <username>, <password>, and <db-name> here.
# The "schema=public" is fine for most setups — unless you are using a custom PostgreSQL schema, you don't need to change it.
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<db-name>?schema=public"

```

#### NOTE

When working in a development environment, you most likely wont have a custom domain, and you dont really need one.
For testing purposes, you can use the default `Resend Address`:

```bash
# File: .env.local

RESEND_EMAIL_FROM=noreply@resend.dev
```

However, **_you can only send test emails to the email address you used to create your Resend account._**

If you are using a `custom domain`, make sure to format the sender email like one of the following:

```bash
# File: .env.local
# Only if you have a custom domain (or else stick with the noreply@resend.dev).

RESEND_EMAIL_FROM=noreply@yourdomain.com
```

or

```bash
# File: .env.local
# Only if you have a custom domain (or else stick with the noreply@resend.dev).

RESEND_EMAIL_FROM="Name <noreply@yourdomain.com>"
```

You can put anything you want before the `@` (for example: `noreply`, `home`, `test`, etc), but after the `@` must be **_a valid domain_** that you own and have added to Resend.

##### Remainder

As of now, there is **no dedicated sign-up page -- only sign-in page.**
This behavior is handled in the `auth.ts` file in the root of the project.

```bash
        # Do this if you dont want to create a user at the login page if the user doesnot exist
        # if (!user || !user.password || !user.email) return null;

        if (!user || !user.password || !user.email) {
          const newlyCreatedUser = await prisma.user.create({
            data: {
              email: credentials.email as string,
              password: await pwHash(credentials.password as string),
            },
          });
          return newlyCreatedUser;
        }
```

Currently, during login, **if the app cannot find a matching user in the database, it automatically create a new user** with the provided `email` and `password`.
If you want to **disable this behavior**, simply:

> - **Comment** out the user creation code, and
> - **Uncomment** the line that returns `null` if no user is found.

## Future Updates

> - Email verification for OAuth and Credentials authentication
> - Passkey (passwordless login) support
> - Account linking for users authenticating with multiple providers
