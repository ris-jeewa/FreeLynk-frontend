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

      console.log(registrationData,"registrationData");
      const res = await register(registrationData);
      message.success('Registration successful');
      console.log('Response:', res.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        message.error('Network error. Please check your connection and try again.');
      } else {
        message.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
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
                  className={selectedRole === 'CLIENT' ? 'bg-blue-500 border-none' : 'border-gray-300'}
                  onClick={() => handleRoleSelect('CLIENT')}
                >
                  Client
                </Button>
                <Button
                  type={selectedRole === 'FREELANCER' ? 'primary' : 'default'}
                  block
                  size="middle"
                  className={selectedRole === 'FREELANCER' ? 'bg-green-500 border-none' : 'border-gray-300'}
                  onClick={() => handleRoleSelect('FREELANCER')}
                >
                  Freelancer
                </Button>
              </div>
            </div>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your full name!' }]}
              className="mb-2"
            >
              <Input size="middle" placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email", message: 'Please enter a valid email!' }]}
              className="mb-2"
            >
              <Input size="middle" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
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
                className="bg-yellow-400 border-none"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <Divider plain className="my-4">or Sign Up with</Divider>
          <div className="flex justify-center">
            <Button icon={<GoogleOutlined />} shape="round" size="middle">
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
