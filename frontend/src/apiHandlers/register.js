import { API_ENDPOINT } from "../../config";
import postRequest from "../helpers/network/postRequest";

export default async (firstName, lastName, email, password) => {
	const params = {
		url: `${API_ENDPOINT}/register`,
		content: { firstName, lastName, email, password },
	};
	const [rs, err] = await postRequest(params);
	if (err) return false;
	return rs;
};
