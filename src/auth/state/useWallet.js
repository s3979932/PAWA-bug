import { useEffect, useState, useCallback } from "react";
import { fetchBalance, topUp } from "../../http_call/walletApi";

export default function useWallet(userId) {
    const [balance, setBalance] = useState(null);

    const refresh = useCallback(() => {
        if (!userId) return;
        fetchBalance(userId).then(setBalance);
    }, [userId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const add = amount =>
        userId ? topUp(userId, amount).then(w => setBalance(w.balance)) : Promise.resolve();

    return { balance, refresh, topUp: add };
}