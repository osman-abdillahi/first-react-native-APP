/**
 * React Native SQLite Demo
 * Copyright (c) 2018 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
import SQLite from "react-native-sqlite-storage";

import UserDao from "./UserDao";
import DatabaseImpl from "../DatabaseImpl.js";

export default class UserDaoImpl implements UserDao {

  constructor() {
    this.database = new DatabaseImpl();
  }

  // Insert a new list into the database
  setUser(User: object): Promise<void> {
      return this.database.getDatabase()
        .then(db => 
          db.executeSql("INSERT INTO User (account_id, token) VALUES (43245, 123123);")
        )
        .then(([results]) => {
          const { insertId } = results;
          console.log("[db] Added , InsertId :" +  {insertId}); 
        })
        .catch ((err) => {
          console.log('Error occured when trying to insert : ' + err);
        })
        .finally(() => { 
          this.database.close();
        });
  } 
}