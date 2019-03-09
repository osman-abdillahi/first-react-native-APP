import * as ApiConstants from '../config/ApiConstants.js';


class ApiRequest {

	executeQuery = (data, endPoint, httpMethod) => {
		const query = this.urlQueryString(data, endPoint)
		console.log('The query is : ' + query);

		return fetch(query, httpMethod)
		.then(response => response.json())
		.then(json => json.response)
		.then(response => {
			return response})
		.catch(error => throw error);
	};

	urlQueryString(data, endPoint) {
		const paramString = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key]))
		.join('&');
		return ApiConstants.Http_Protocol + ApiConstants.BaseUrl + endPoint + ApiConstants.QueryStr + paramString;
	}
}

const apiRequest = new ApiRequest();

export default apiRequest;