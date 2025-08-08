import api from "../api/apiClient";

export const getProfileData = async (userId = 1) => {
    try {
        const response = await api.get(`/api/users/${userId}`);
        console.log('User profile data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
        // Return default data if API fails
        // return {
        //     id: userId,
        //     name: 'John Smith',
        //     email: 'john.smith@example.com',
        //     role: 'FREELANCER',
        //     profilePictureUrl: null,
        //     phoneNumber: null,
        //     freelancerProfile: {
        //         id: 1,
        //         title: 'Senior Full-Stack Developer',
        //         location: 'San Francisco, CA',
        //         rating: 4.8,
        //         numberOfReviews: 23,
        //         bio: 'Full Stack Developer with 5+ years of experience in building scalable web applications.',
        //         skills: 'React, Node.js, TypeScript, Python, AWS, Docker, MongoDB, GraphQL',
        //         githubUrl: 'https://github.com',
        //         linkedinUrl: 'https://linkedin.com',
        //         portfolioUrl: 'https://portfolio.com'
        //     }
        // };
    }
}

// export const updateUserProfile = async (userId, profileData) => {
//     try {
//         const response = await api.put(`/api/users/${userId}`, profileData);
//         console.log('Profile updated:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         throw error;
//     }
// }

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