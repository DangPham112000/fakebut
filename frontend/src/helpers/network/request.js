export default async (method, url, timeout, headers = []) => {
	return await fetch(url, {
		method: method,
		headers,
	});
};
