import api from "../api/apiClient";

export const getProfileData = async (userId = 1) => {
    try {
        const response = await api.get(`/api/users/${userId}`);
        console.log('User profile data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export const updateAboutMe = async (userId, aboutMeData) => {
    try {
        const response = await api.put(`/api/users/${userId}`, aboutMeData);
        console.log('Profile updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        console.error('Error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        });
        throw error;
    }
}

// export const updateUserImage = async (userId, imageUrl) => {
//     try {
//         const response = await api.put(`/api/users/${userId}/image`, { imageUrl });
//         console.log('Image updated:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating user image:', error);
//         throw error;
//     }
// }