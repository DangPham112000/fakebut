import { API_URL } from "../../config";
import getRequest from "../helpers/network/getRequest";

export default async () => {
	return await getRequest(`${API_URL}/authen`);
};
