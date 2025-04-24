import React from "react";
import { Form, Input, Button, Typography, Divider, Space } from "antd";
import { GoogleOutlined, AppleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const Login = () => {
  const onFinish = (values) => {
    console.log("Form Values:", values);
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
          <p className="text-black text-xl">Create an Account</p>
          <div className="flex gap-3">
            <p className="text-gray-500  text-sm mt-2">
              Already have an account?
            </p>
            <a href="#" className="text-blue-700">Sign In</a>
          </div>
          <Form layout="vertical" onFinish={onFinish} className="mt-6">
            <Form.Item
              name="fullname"
              label="Fullname"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input size="large" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
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
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>or Sign Up with</Divider>
          <Space size="middle" className="w-full flex justify-center">
            <Button icon={<GoogleOutlined />} shape="round">
              Google
            </Button>
            <Button icon={<AppleOutlined />} shape="round">
              Apple
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;
