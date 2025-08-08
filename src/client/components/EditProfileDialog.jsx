import React, { useState } from "react";
import { Modal, Form, Input, Button, Avatar, Upload, message } from "antd";
import { UserOutlined, EnvironmentOutlined, ClockCircleOutlined, UploadOutlined } from "@ant-design/icons";

export const EditProfileDialog = ({ isOpen, onClose, profileData, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Initialize form with current profile data
  React.useEffect(() => {
    if (isOpen && profileData) {
      form.setFieldsValue({
        name: profileData.name || "John Doe",
        location: profileData.location || "New York, USA",
        timezone: profileData.timezone || "GMT-4",
        score: profileData.score || "95%",
        totalJobs: profileData.totalJobs || "20",
        areasOfInterest: profileData.areasOfInterest || "Web Development, UI/UX Design, Mobile Apps",
        description: profileData.description || "I'm a passionate web developer with over 5 years of experience in creating dynamic and user-friendly websites. I specialize in front-end development, but I also have a strong understanding of back-end technologies. My goal is to deliver high-quality work that meets the needs of my clients.",
        skills: profileData.skills || ["JavaScript", "React", "Node.js", "CSS", "HTML", "UI/UX Design"]
      });
    }
  }, [isOpen, profileData, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Convert skills string to array if needed
      if (typeof values.skills === 'string') {
        values.skills = values.skills.split(',').map(skill => skill.trim());
      }
      
      onSave(values);
      message.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
      message.error('Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Edit Profile"
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleSave}>
          Save Changes
        </Button>
      ]}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
      >
        {/* Profile Image Section */}
        <div className="text-center mb-6">
                           <Avatar
                   size={100}
                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                   icon={<UserOutlined />}
                   className="mb-4"
                 />
          <div>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your full name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter your location!' }]}
          >
            <Input prefix={<EnvironmentOutlined />} placeholder="e.g., New York, USA" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Form.Item
            name="timezone"
            label="Timezone"
            rules={[{ required: true, message: 'Please enter your timezone!' }]}
          >
            <Input prefix={<ClockCircleOutlined />} placeholder="e.g., GMT-4" />
          </Form.Item>

          <Form.Item
            name="score"
            label="Score"
            rules={[{ required: true, message: 'Please enter your score!' }]}
          >
            <Input placeholder="e.g., 95%" />
          </Form.Item>
        </div>

        <Form.Item
          name="totalJobs"
          label="Total Jobs"
          rules={[{ required: true, message: 'Please enter total jobs!' }]}
        >
          <Input placeholder="e.g., 20" />
        </Form.Item>

        <Form.Item
          name="areasOfInterest"
          label="Areas of Interest"
          rules={[{ required: true, message: 'Please enter areas of interest!' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="e.g., Web Development, UI/UX Design, Mobile Apps"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter your description!' }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Tell us about yourself, your experience, and what you do..."
          />
        </Form.Item>

        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: 'Please enter your skills!' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Node.js, CSS, HTML, UI/UX Design)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}; 