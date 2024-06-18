import { API_ENDPOINT } from "../../config";
import postRequest from "../helpers/network/postRequest";

export default async (email, password) => {
	const params = {
		url: `${API_ENDPOINT}/login`,
		content: { email, password },
	};
	const [rs, err] = await postRequest(params);
	if (err) return [null, err];
	return [rs];
};
