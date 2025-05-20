import { HOST_URL } from "./AppUrlConfig";

const WALLET_API = HOST_URL + "/api/wallets";

export const WalletUrl = {
    balance: userId => `${WALLET_API}/user/${userId}/balance`,
    topUp  : (userId, amount) => `${WALLET_API}/user/${userId}/add-balance?amount=${amount}`
};