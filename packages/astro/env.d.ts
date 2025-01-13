/// <reference types="astro/client" />

// The type reference for astro locals context.
declare namespace App {
  interface Locals {
    user: import('better-auth').User | null;
    session: import('better-auth').Session | null;
  }
}

// The generate environments.
declare module 'astro:env/server' {
  export const LIBSQL_DATABASE_URL: string;
  export const LIBSQL_AUTH_TOKEN: string;
  export const BETTER_AUTH_SECRET: string;
}
