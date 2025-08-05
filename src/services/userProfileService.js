import api from "../api/apiClient";

export const getProfileData = async () => {
    return await api.get("/api/users/1");
}