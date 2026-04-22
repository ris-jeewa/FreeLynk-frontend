import api from "../api/apiClient";

export const getMyProfile = async () => {
    const response = await api.get('/api/users/me');
    if (response.data.role === 'FREELANCER') {
        const freelancerProfile = await api.get(`/api/freelancers/user/${response.data.id}`);
        response.data.freelancerProfile = freelancerProfile.data;
    }
    return response.data;
}

export const getProfileData = async (userId) => {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
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

export const saveFreelancerProfile = async (profileData) => {
    const body = {
        id: profileData.id,
        name: profileData.name,
        title: profileData.title,
        location: profileData.location,
        githubUrl: profileData.github,
        linkedinUrl: profileData.linkedin,
        portfolioUrl: profileData.portfolio,
    };
    const response = await api.post('/api/freelancers', body);
    return response.data;
}

export const updateUserImage = async (userId, imageUrl) => {
    try {
        const response = await api.put(`/api/users/${userId}/image`,imageUrl );
        return response.data;
    } catch (error) {
        console.error('Error updating user image:', error);
        throw error;
    }
}