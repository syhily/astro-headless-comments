import type { DbMigrator } from '../../../types';

const migrate: DbMigrator = {
  statements: [
    `CREATE TABLE "hc_user" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "email_verified" INTEGER NOT NULL,
  "image" TEXT,
  "two_factor_enabled" INTEGER,
  "created_at" INTEGER NOT NULL,
  "updated_at" INTEGER NOT NULL
);`,
    `CREATE TABLE "hc_session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "expires_at" INTEGER NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "created_at" INTEGER NOT NULL,
  "updated_at" INTEGER NOT NULL,
  "ip_address" TEXT,
  "user_agent" TEXT,
  "user_id" TEXT NOT NULL
);`,
    `CREATE TABLE "hc_account" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "account_id" TEXT NOT NULL,
  "provider_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "access_token" TEXT,
  "refresh_token" TEXT,
  "id_token" TEXT,
  "access_token_expires_at" INTEGER,
  "refresh_token_expires_at" INTEGER,
  "scope" TEXT,
  "password" TEXT,
  "created_at" INTEGER NOT NULL,
  "updated_at" INTEGER NOT NULL
);`,
    `CREATE TABLE "hc_verification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expires_At" INTEGER NOT NULL,
  "created_at" INTEGER NOT NULL,
  "updated_at" INTEGER NOT NULL
);`,
    `CREATE TABLE "hc_passkey" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT,
  "public_key" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "credential_id" TEXT NOT NULL,
  "counter" INTEGER NOT NULL,
  "device_type" TEXT NOT NULL,
  "backed_up" INTEGER NOT NULL,
  "transports" TEXT,
  "created_at" INTEGER NOT NULL
);`,
    `CREATE TABLE "hc_two_factor" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "secret" TEXT NOT NULL,
  "backup_codes" TEXT NOT NULL,
  "user_id" TEXT NOT NULL
);`,
    `CREATE TABLE "hc_rate_limit" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "key" TEXT,
  "count" INTEGER,
  "last_request" INTEGER
);`,
  ],
  version: 1,
  changelog: ['Create the better auth table for storing the credentials.', 'Add passkey and ratelimit for better auth'],
};

export default migrate;
