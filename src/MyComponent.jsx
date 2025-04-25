import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const MyComponent = () => {
    const { isAuthenticated, user, loginWithPopup } = useAuth0();
    const handleClick = async () => {
        try {
            await loginWithPopup(); // Trigger the login popup
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    return (
        <div>
            {isAuthenticated ? (
                <p>Welcome, {user?.name}!</p>
            ) : (
                <button onClick={handleClick}>Log in</button>
            )}
        </div>
    );
};
export default MyComponent;