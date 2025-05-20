import { WalletUrl } from "../service_url/WalletUrlConfig";
import axios from "./HttpRequest";

export const fetchBalance = (userId) => axios.get(WalletUrl.balance(userId))
                                    .then((r) => r.data.balance);
export const topUp = (userId, amount) =>
    axios.post(WalletUrl.topUp(userId, amount)).then((r) => r.data);                                    