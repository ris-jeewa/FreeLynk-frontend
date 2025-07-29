import React, { useState } from "react";
import { Form, Input, Button, Divider, Space, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/reset.css";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      console.log(response);

      message.success('Login successful!');
      navigate('/freelance-profile/1');
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        message.error('Network error. Please check your connection and try again.');
      } else {
        message.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
              rules={[{ required: true, type: "email", message: 'Please enter a valid email!' }]}
            >
              <Input size="large" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password size="large" placeholder="Enter password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-yellow-400 border-none"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>or Login with</Divider>
          <Space size="middle" className="w-full flex justify-center">
            <Button icon={<GoogleOutlined />} shape="round">
              Google
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
