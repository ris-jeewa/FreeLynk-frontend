import React, { useState } from "react";
import { Form, Input, Button, Divider,message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { register } from "../services/authService";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('CLIENT');
  const navigate = useNavigate();



  const onFinish = async (values) => {
    setLoading(true);
    try {
      const registrationData = {
        ...values,
        role: selectedRole
      };

      console.log(registrationData, "registrationData");
      const res = await register(registrationData);
      
      // Show success message with role-specific information
      toast.success('Registration successful!');
      
      console.log('Response:', res.data);
      
      // Small delay to show the success message before navigation
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.',error);
      // Enhanced error handling with specific messages
      if (error.response) {
        message.error(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        ToastUtils.registrationError('network_error');
      } else {
        ToastUtils.registrationError('unknown', 'An unexpected error occurred. Please try again or contact support if the problem persists.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const roleText = role === 'FREELANCER' ? 'freelancer' : 'client';
    toast.info(`You've selected to register as a ${roleText}.`);
  };

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
        <div className="w-1/2 justify-center bg-gradient-to-br from-yellow-50 to-white p-6 overflow-y-auto">
          <p className="text-black text-xl mb-2">Create an Account</p>
          <div className="flex gap-3 mb-4">
            <p className="text-gray-500 text-sm">
              Already have an account? 
            </p>
            <Link to="/login" className="text-blue-700">Sign In</Link>
          </div>
          
          <Form layout="vertical" onFinish={onFinish} className="space-y-3">
            {/* Role Selection Buttons */}
            <div className="mb-2">
              <p className="text-gray-600 text-sm mb-2">Register as:</p>
              <div className="flex gap-2">
                <Button
                  type={selectedRole === 'CLIENT' ? 'primary' : 'default'}
                  block
                  size="middle"
                  className={selectedRole === 'CLIENT' ? 'bg-blue-500 border-none hover:bg-blue-600' : 'border-gray-300 hover:border-blue-300'}
                  onClick={() => handleRoleSelect('CLIENT')}
                  disabled={loading}
                >
                  Client
                </Button>
                <Button
                  type={selectedRole === 'FREELANCER' ? 'primary' : 'default'}
                  block
                  size="middle"
                  className={selectedRole === 'FREELANCER' ? 'bg-green-500 border-none hover:bg-green-600' : 'border-gray-300 hover:border-green-300'}
                  onClick={() => handleRoleSelect('FREELANCER')}
                  disabled={loading}
                >
                  Freelancer
                </Button>
              </div>
            </div>

            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name!' },
                { min: 2, message: 'Name must be at least 2 characters!' },
                { max: 50, message: 'Name cannot exceed 50 characters!' }
              ]}
              className="mb-2"
            >
              <Input size="middle" placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: "email", message: 'Please enter a valid email address!' }
              ]}
              className="mb-2"
            >
              <Input size="middle" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
                { max: 50, message: 'Password cannot exceed 50 characters!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!'
                }
              ]}
              className="mb-3"
            >
              <Input.Password size="middle" placeholder="Enter password" />
            </Form.Item>
            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="middle"
                className="bg-yellow-400 border-none hover:bg-yellow-500"
                loading={loading}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </Form.Item>
          </Form>

          <Divider plain className="my-4">or Sign Up with</Divider>
          <div className="flex justify-center">
            <Button 
              icon={<GoogleOutlined />} 
              shape="round" 
              size="middle"
              disabled={loading}
              className="hover:bg-gray-50"
            >
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
