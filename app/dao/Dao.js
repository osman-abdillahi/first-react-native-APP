'use strict';

export interface Dao {
  open(): Promise<SQLite.SQLiteDatabase>;
  close(): Promise<void>;
}