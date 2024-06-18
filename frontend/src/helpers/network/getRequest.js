export default async (url) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve([null, 408]), 15000);
		fetch(url)
			.then((response) => response.json())
			.then((result) => resolve([result]))
			.catch((e) => resolve([null, 400]));
	});
};
