import request from "./request";

export default async () => {
	return await request("GET", "https://google.com");
};
