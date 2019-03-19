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
    let databaseInstance: SQLite.SQLiteDatabase;
  }

  // Insert a new list into the database
  setUser(User: object): Promise<void> {
    // check if user exists. if false then create new user else updated user token
    databaseInstance = this.database.getDatabase();

    if(!this.checkUserExists(User.accountID)) {
      return databaseInstance
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
    }else{
      return databaseInstance
      .then(db => 
        db.executeSql("Update User set token = ? where account_id = ?;", [User.token, User.accountID])
      )
      .then(([results]) => {
        console.log("[db] Updated user :"); 
      })
      .catch ((err) => {
        console.log('Error occured when trying to insert : ' + err);
      })
      .finally(() => { 
        this.database.close();
      });
    }
  }

  /*// Insert a new list into the database
  getUser(user_id: int): Promise<void> {
    // check if user exists. if false then create new user else updated user token
    databaseInstance = this.database.getDatabase();

    if(!this.checkUserExists(User.accountID)) {
      return databaseInstance
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
    }else{
      return databaseInstance
      .then(db => 
        db.executeSql("Update User set token = ? where account_id = ?;", [User.token, User.accountID])
      )
      .then(([results]) => {
        console.log("[db] Updated user :"); 
      })
      .catch ((err) => {
        console.log('Error occured when trying to insert : ' + err);
      })
      .finally(() => { 
        this.database.close();
      });
    }

  }*/

  checkUserExists = (account_id) => {
      return databaseInstance
        .then(db => 
          db.executeSql("SELECT count(*) FROM User where account_id = ?;", [account_id])
        )
      .then(([results]) => {
        var len = results.rows.length;
        if(len > 0) {
          console.log('Exists');
          return true;
        } else {
          console.log('Does not exist');
          return false;
        }
      })
      .catch ((err) => {
        console.log('Error occured when trying to insert : ' + err);
      });
  }
}