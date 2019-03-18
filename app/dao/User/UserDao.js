'use strict';

import User from '../../model/User.js';

export interface UserDao {
  getUser(account_id: int): Promise<void>;
  setUser(user: User): Promise<void>;
}