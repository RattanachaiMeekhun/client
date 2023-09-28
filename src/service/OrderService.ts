import { APIS } from "../util/apis";
import { wretchInstance } from "../util/wretch";

export const getBuyerOrder = async (status:string,page:number,perPage:10) => {    
  const res: any = await wretchInstance()
    .get(APIS.Order.getBuyerOrderByStatus + `?status=${status}&page=${page}&perPage=${perPage}`)
    .then((data: any) => data);

  return res;
};
