import postRequest from "../helpers/network/postRequest";

export default async (email, password) => {
	const params = {
		url: `${API_URL}/login`,
		content: { email, password },
	};
	const [rs, err] = await postRequest(params);
	if (err) return false;
	return rs;
};
