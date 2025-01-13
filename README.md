# Astro Headless Comments

A headless comments solution for Astro by using LibSQL.
Given this plugin is based on the `@astrojs/db` a runnable LibSQL instance is required to be used in production.

**This project is still under heavy development to get the first release.**

## Install

```bash
# Use npm
npm install -D astro-headless-comments

# Use pnpm
pnpm add -D astro-headless-comments

# Use yarn
yarn add -D astro-headless-comments
```

## Usage

Add the bellowing environment variables to your project `.env` file.

```bash
# The database url
LIBSQL_DATABASE_URL=
# The auth token, it's a base64 encoded $username:$password
LIBSQL_AUTH_TOKEN=
# The generate token for encrypting the auth cookies.
# Using https://www.better-auth.com/docs/installation for generating a token.
BETTER_AUTH_SECRET=
```

## Build & Release

This project is a monorepo based on the pnpm. The changeset is used for managing version and release.

To create changesets, you should type the commands shown below.

```bash
pnpx changeset
# commit the changes
```

To release the changes, you should type the commands shown below.

```bash
pnpx changeset version
pnpm install
pnpm publish -r
# commit the changes
```
