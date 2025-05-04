import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaUser } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { loginWithRedirect } = useAuth0();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
          <p className="mt-2 text-gray-400">Choose your role to get started</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => handleRoleSelect('freelancer')}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedRole === 'freelancer'
                ? 'border-orange-500 bg-[#2A2A2A]'
                : 'border-gray-700 hover:border-orange-500'
            }`}
          >
            <div className="flex flex-col items-center">
              <FaUserTie className={`text-4xl mb-4 ${
                selectedRole === 'freelancer' ? 'text-orange-500' : 'text-gray-400'
              }`} />
              <h3 className="text-xl font-semibold text-white">Freelancer</h3>
              <p className="text-sm text-gray-400 mt-2 text-center">
                Join as a freelancer to find exciting projects
              </p>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect('client')}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedRole === 'client'
                ? 'border-orange-500 bg-[#2A2A2A]'
                : 'border-gray-700 hover:border-orange-500'
            }`}
          >
            <div className="flex flex-col items-center">
              <FaUser className={`text-4xl mb-4 ${
                selectedRole === 'client' ? 'text-orange-500' : 'text-gray-400'
              }`} />
              <h3 className="text-xl font-semibold text-white">Client</h3>
              <p className="text-sm text-gray-400 mt-2 text-center">
                Join as a client to post projects and hire talent
              </p>
            </div>
          </button>
        </div>

        {selectedRole && (
          <div className="mt-8">
            <Link
              to={`/register/${selectedRole}`}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Link>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;