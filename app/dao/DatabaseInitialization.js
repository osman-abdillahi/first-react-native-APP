import SQLite from "react-native-sqlite-storage";

export class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.
  updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;
    console.log("Beginning database updates...");

    // First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then(version => {
        dbVersion = version;
        console.log("Current database version is: " + dbVersion);
        return;
      });
  }

  // Perform initial setup of the database tables
  createTables(transaction: SQLite.Transaction) {
    // DANGER! For dev only
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql("DROP TABLE IF EXISTS List;");
      transaction.executeSql("DROP TABLE IF EXISTS ListItem;");
      transaction.executeSql("DROP TABLE IF EXISTS Version;");
    }

    // User table
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS User( " +
        "account_id INTEGER PRIMARY KEY NOT NULL, " +
        "token INTEGER NOT NULL" +
        ");"
    );

    // Version table
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS Version( " +
        "version_id INTEGER PRIMARY KEY NOT NULL, " +
        "version INTEGER" +
        ");"
    );
  }

  // Get the version of the database, as specified in the Version table
  getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch(error => {
        console.log(`No version set. Returning 0. Details: ${error}`);
        return 0;
      });
  }
}