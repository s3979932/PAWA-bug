import Http from "./HttpRequest";
import { WalletUrl } from "../service_url/WalletUrlConfig";

export const fetchBalance = userId => Http.get(WalletUrl.balance(userId))
                                    .then(r => r.data.balance);
export const topUp = (userId, amount) =>
    Http.post(WalletUrl, topUp(userId, amount)).then(r => r.data);                                    