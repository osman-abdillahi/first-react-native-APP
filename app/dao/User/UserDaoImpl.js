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
    // check if user exists. if false then create new user else updated user token

      return this.database.getDatabase()
        .then(db => 
          db.executeSql("INSERT INTO User (account_id, token) VALUES (?, ?);", [User.accountID, User.token])
        )
        .then(([results]) => {
          console.log("[db] Added , InsertId :" +  results.rows.item(0)); 
        })
        .catch ((err) => {
          console.log('Error occured when trying to insert : ' + err);
        })
        .finally(() => { 
          this.database.close();
        });
  }

  checkUserExists = () => {
    // todo
  }
}