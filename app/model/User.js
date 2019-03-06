export default class User {
	accountID: string;
	token: string;

	constructor(accountID="", token="") {

		this.accountID = accountID;
		this.token = token;
	}
}