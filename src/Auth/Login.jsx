import React, { useState, useEffect } from "react";
import { Form, Input, Button, Divider, Space, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { login } from "../services/authService";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import { setAuthData } from "../utils/authUtils";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();

  // Redirect to freelancer profile if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success('Login successful!');
      navigate('/freelance-profile/1');
    }
  }, [isAuthenticated, user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      console.log('Login response:', response);

      // Show success message
      toast.success('Login successful! Redirecting to profile...');
      
      // Store authentication data using utility function
      setAuthData(response.data?.token, response.data?.user);
      
      // Navigate immediately after successful login
      navigate('/freelance-profile/1');

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2'
        }
      });
    } catch (error) {
      toast.error('Google login failed. Please try again.',error);
    }
  };

  // Show loading while Auth0 is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] h-[550px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left Image Section */}
        <div className="w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
            alt="Meeting"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right Form Section */}
        <div className="w-1/2 justify-center bg-gradient-to-br from-yellow-50 to-white p-5">
          <p className="text-black text-xl">Login to Your Account</p>
          <div className="flex gap-3">
            <p className="text-gray-500  text-sm mt-2">
              Don't have an account?
            </p>
            <Link to="/register" className="text-blue-700">Register</Link>
          </div>
          <Form layout="vertical" onFinish={onFinish} className="mt-6">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: "email", message: 'Please enter a valid email address!' }
              ]}
            >
              <Input size="large" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password size="large" placeholder="Enter password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-yellow-400 border-none hover:bg-yellow-500"
                loading={loading}
              >
                {loading ? 'Signing In...' : 'Login'}
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>or Login with</Divider>
          <Space size="middle" className="w-full flex justify-center">
            <Button 
              icon={<GoogleOutlined />} 
              shape="round" 
              onClick={handleGoogleLogin}
              className="bg-white border-gray-300 hover:bg-gray-50"
              disabled={loading}
            >
              Google
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
