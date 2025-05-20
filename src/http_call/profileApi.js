import Http from "./HttpRequest";
import { ProfileUrl } from "../service_url/ProfileUrlConfig";

export const fetchProfile = userId =>
    Http.get(ProfileUrl.read(userId)).then(r => r.data);

export const updateProfile = (userId, payload) =>
    Http.put(ProfileUrl.update(userId), payload).then(r => r.data);