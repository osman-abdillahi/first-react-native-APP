import SQLite from "react-native-sqlite-storage";

import Dao from './Dao';

import { DatabaseInitialization } from "./DatabaseInitialization";

export default class DatabaseImpl implements Dao {

  databaseName = "AppDatabase.db";
  database: SQLite.SQLiteDatabase | undefined;

  // Open the connection to the database
  open(): Promise<SQLite.SQLiteDatabase> {

    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    let databaseInstance: SQLite.SQLiteDatabase;

    return SQLite.openDatabase({
      name: this.databaseName,
      location: "default"
    })
      .then(db => {
        databaseInstance = db;
        console.log("[db] Database open!");

        // Perform any database initialization or updates, if needed
        const databaseInitialization = new DatabaseInitialization();
        return databaseInitialization.updateDatabaseTables(databaseInstance);
      })
      .then(() => {
        this.database = databaseInstance;
        return databaseInstance;
      });  
  }

  // Close the connection to the database
  close(): Promise<void> {
    if (this.database === undefined) {
      return Promise.reject("[db] Database was not open; unable to close.");
    }
    return this.database.close().then(status => {
      console.log("[db] Database closed.");
      this.database = undefined;
    });
  }

  getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (this.database !== undefined) {
      return Promise.resolve(this.database);
    }
    // otherwise: open the database first
    return this.open();
  }

}

// Export a single instance of StudentdaoImpl
//export const database: Database = new DatabaseImpl();