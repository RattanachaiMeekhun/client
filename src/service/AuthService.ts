import { APIS } from "../util/apis";
import { wretchInstance } from "../util/wretch";

export const loginSerive = async (req: {
  username: string;
  password: string;
}) => {
  const res: any = await wretchInstance({ withCredentials: false })
    .post(req, APIS.Auth.login)
    .then((data: any) => data);
  return res;
};
