import { useCallback, useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../http_call/profileApi";

export default function useProfile(userId) {
    const [data, setData] = useState(null);

    const refresh = useCallback(() => {
        if (!userId) return;
        fetchProfile(userId).then(setData);
    }, [userId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const save = updates =>
        userId ? updateProfile(userId, updates).then(setData) : Promise.resolve();

    return { data, refresh, save};
}