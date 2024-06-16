import { API_URL } from "../../config";

export default async () => {
  const authenResp = await fetch(`${API_URL}/authen`, {
    method: "GET",
    credentials: "include",
  });
  const isAuth = await authenResp.json();
  return isAuth;
};
