import { API_ENDPOINT } from "../../config";
import getRequest from "../helpers/network/getRequest";

export default async () => {
	return await getRequest(`${API_ENDPOINT}/authen`);
};
