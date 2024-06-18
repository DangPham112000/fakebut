export default async (params) => {
	return new Promise((resolve) => {
		const {
			url,
			timeout = 15000,
			headers = { "content-type": "application/json" },
			content,
		} = params;
		setTimeout(() => resolve([null, 408]), timeout);
		fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify(content),
		})
			.then((response) => response.json())
			.then((result) => resolve([result]))
			.catch((e) => resolve([null, 400]));
	});
};
