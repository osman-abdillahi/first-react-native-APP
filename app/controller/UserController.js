import User from '../model/User.js';
import { observable, action } from 'mobx';
import ApiRequest from '../api/ApiRequest.js';

class UserController {
	@observable userDetails = new User();

	@action setUserDetails(userDetails) {
		if(userDetails != null)
			this.userDetails = userDetails;
	}

	@action getUserDetails() {
		var userDetails = this.userDetails;
		if(userDetails != null)
			return userDetails;

		return new User();
	}

}

const userController = new UserController();

export default userController;