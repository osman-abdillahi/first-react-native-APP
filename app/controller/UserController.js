import User from '../models/User.js';
import { observable, action } from 'mobx';
import ApiRequest from '../api/ApiRequest.js';

class UserController {
	@observable userDetails = new User();

	@action setUserDetails(userDetails) {
		if(userDetails != null)
			this.userDetails = userDetails;
	}

	@action getUserDetails() {
		var question = this.userDetails;
		if(question != null)
			return question;

		return new User();
	}

}

const userController = new UserController();

export default userController;