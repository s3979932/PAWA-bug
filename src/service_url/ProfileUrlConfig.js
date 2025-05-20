import { HOST_URL } from "./AppUrlConfig";

const PROFILE_API = HOST_URL + "/passenger/profile";

export const ProfileUrl = {
    read  : userId => `${PROFILE_API}/${userId}`,
    update: userId => `${PROFILE_API}/${userId}`
};