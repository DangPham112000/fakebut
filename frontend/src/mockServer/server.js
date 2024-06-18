import { API_ENDPOINT } from "../../config";
import handleLogin from "./mockAPI/handleLogin";

const originFetch = window.fetch;

const mockedFetch = async (url, options) => {
	let result;

	const route = url.split(`${API_ENDPOINT}/`)[1];

	switch (route) {
		case "login":
			result = handleLogin(options);
			break;
		case "register":
			result = handleRegister(options);
			break;
		default:
			break;
	}

	return {
		json: async () => result,
	};
};

const wrappedFetch = async (resource, options) => {
	if (typeof resource === "object")
		return await originFetch(resource, options);
	if (typeof resource === "string") {
		if (resource.indexOf(API_ENDPOINT) === -1)
			return await originFetch(resource, options);
		return await mockedFetch(resource, options);
	}
};

const mock = () => {
	fetch = wrappedFetch;
};

export default mock;
