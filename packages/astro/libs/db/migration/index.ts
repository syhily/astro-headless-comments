import type { Client } from '@libsql/client';
import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { int, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { createHash } from 'node:crypto';

import type { DbMigrator } from '../../../types';
import v1 from './V_1_create_auth_tables';

// Remember to import the migrator from the same directory.
const migrators: DbMigrator[] = [v1];
const initVersionTable = `CREATE TABLE IF NOT EXISTS hc_schema_version (
	version INTEGER NOT NULL,
	description TEXT NOT NULL,
  checksum TEXT NOT NULL,
	execute_date TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	CONSTRAINT schema_version_pk PRIMARY KEY (version)
);`;

// The hc_schema_version definition.
const schemaVersion = sqliteTable(
  'hc_schema_version',
  {
    version: int().notNull().primaryKey(),
    description: text().notNull(),
    checksum: text({ length: 256 }).notNull(),
    execute_date: text()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (table) => [uniqueIndex('schema_version_pk').on(table.version)],
);

// Migrate all the required tables for drizzle orm.
const migrate = async (client: Client) => {
  // Make sure the schema version table has been created.
  await client.execute(initVersionTable);
  console.log('Finish the hc_schema_version table creation');

  // Create interface for operating the hc_schema_version.
  const db = drizzle(client, { schema: { version: schemaVersion } });

  // Validate the migrators, make sure there are not any errors.
  const versionSet = new Set<number>();
  for (const migrator of migrators) {
    if (versionSet.has(migrator.version)) {
      throw new Error(`Duplicated migrator version ${migrator.version}`);
    }
    versionSet.add(migrator.version);
  }

  // Trigger the migration.
  console.log('Start the database migration');
  for (const migrator of migrators.sort((a, b) => a.version - b.version)) {
    const checksum = createHash('sha256').update(JSON.stringify(migrator.statements)).digest('hex');
    const existMigrations = await db.select().from(schemaVersion).where(eq(schemaVersion.version, migrator.version));
    if (existMigrations.length === 0) {
      console.log(`Start the migrator ${migrator.version}`);
      // Execute the migration in a batch transaction.
      await client.migrate([
        ...migrator.statements,
        // Ensure the schema version is inserted in a migrate transaction.
        {
          sql: 'INSERT INTO hc_schema_version (version, description, checksum) VALUES (?, ?, ?)',
          args: [`${migrator.version}`, migrator.changelog.join('\n'), checksum],
        },
      ]);
      console.log(`Finish the migrator ${migrator.version}`);
    } else {
      const existMigration = existMigrations[0];
      if (existMigration.checksum !== checksum) {
        throw new Error(
          `Invalid checksum ${existMigration.checksum} for migrator version ${existMigration.version}, expect ${checksum}`,
        );
      }
      console.log(`The migrator version ${existMigration.version} has been successfully executed, skip.`);
    }
  }
  console.log('Finish the database migration');
};

export default migrate;
