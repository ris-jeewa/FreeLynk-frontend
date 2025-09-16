import React, { useState } from "react";
import { Form, Input, Select, Button, Card, Typography, Row, Col, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { projectService } from "../services/projectService";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const PostProject = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const projectCategories = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "DevOps",
    "Blockchain",
    "AI/ML",
    "Other"
  ];

  const projectTypes = [
    { value: "fixed", label: "Fixed Price" },
    { value: "hourly", label: "Hourly Rate" },
    { value: "milestone", label: "Milestone Based" }
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" }
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Prepare project data
      const projectData = {
        ...values,
        clientId: 1, // This should come from authentication context
        status: 'open',
        createdAt: new Date().toISOString(),
        // Handle file uploads if any
        files: values.files || []
      };

      // Create project using the service
      const createdProject = await projectService.createProject(projectData);
      
      message.success("Project posted successfully!");
      form.resetFields();
      navigate("/client-profile/1"); // Redirect to client profile
    } catch (error) {
      message.error("Failed to post project. Please try again.");
      console.error("Error posting project:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all required fields.");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 level={2} className="mb-2 text-white text-2xl font-bold">
            Post a Project / Job
          </h1>
          <div className="text-lg">
            Find the perfect freelancer for your project
          </div>
        </div>

        <Card className="bg-[#2A2A2A] border-gray-700">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className=""
          >
            <Row gutter={[24, 16]}>
              {/* Project Title */}
              <Col span={24}>
                <Form.Item
                  label={<span className="font-medium">Project Title</span>}
                  name="title"
                  rules={[
                    { required: true, message: "Please enter a project title" },
                    { min: 10, message: "Title must be at least 10 characters" }
                  ]}
                >
                  <Input 
                    placeholder="e.g., Build a responsive e-commerce website"
                    className="bg-[#3A3A3A] border-gray-600 "
                    size="large"
                  />
                </Form.Item>
              </Col>

              {/* Category and Type */}
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className="font-medium">Category</span>}
                  name="category"
                  rules={[{ required: true, message: "Please select a category" }]}
                >
                  <Select
                    placeholder="Select category"
                    size="large"
                  >
                    {projectCategories.map(category => (
                      <Option key={category} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className=" font-medium">Project Type p</span>}
                  name="type"
                  rules={[{ required: true, message: "Please select project type" }]}
                >
                  <Select
                    placeholder="Select type"
                    size="large"
                  >
                    {projectTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* Budget */}
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className=" font-medium">Budget (USD) p</span>}
                  name="budget"
                  rules={[
                    { required: true, message: "Please enter budget" },
                    { type: "number", min: 1, message: "Budget must be greater than 0" }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="e.g., 1000"
                    size="large"
                    prefix="$"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className=" font-medium">Experience Lepel *</span>}
                  name="experienceLevel"
                  rules={[{ required: true, message: "Please select experience level" }]}
                >
                  <Select
                    placeholder="Select level"
                    size="large"
                  >
                    {experienceLevels.map(level => (
                      <Option key={level.value} value={level.value}>
                        {level.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* Timeline */}
              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className=" font-medium">Timeline *</span>}
                  name="timeline"
                  rules={[{ required: true, message: "Please select timeline" }]}
                >
                  <Select
                    placeholder="Select timeline"
                    size="large"
                  >
                    <Option value="1week">1 week</Option>
                    <Option value="2weeks">2 weeks</Option>
                    <Option value="1month">1 month</Option>
                    <Option value="2months">2 months</Option>
                    <Option value="3months">3 months</Option>
                    <Option value="6months">6 months</Option>
                    <Option value="ongoing">Ongoing</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<span className=" font-medium">Skills Requirpd *</span>}
                  name="skills"
                  rules={[{ required: true, message: "Please enter required skills" }]}
                >
                  <Select
                    mode="tags"
                    placeholder="e.g., React, Node.js, MongoDB"
                    size="large"
                  />
                </Form.Item>
              </Col>

              {/* Project Description */}
              <Col span={24}>
                <Form.Item
                  label={<span className=" font-medium">Project Descrpption *</span>}
                  name="description"
                  rules={[
                    { required: true, message: "Please enter project description" },
                    { min: 50, message: "Description must be at least 50 characters" }
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Describe your project in detail. Include requirements, deliverables, and any specific features you need..."
                    className="bg-[#3A3A3A] border-gray-600 "
                  />
               </Form.Item>
              </Col>

              {/* Additional Requirements */}
              <Col span={24}>
                <Form.Item
                  label={<span className=" font-medium">Additional Repuirements</span>}
                  name="additionalRequirements"
                >
                  <TextArea
                    rows={3}
                    placeholder="Any additional requirements, preferences, or notes..."
                    className="bg-[#3A3A3A] border-gray-600 "
                  />
                </Form.Item>
              </Col>

              {/* File Upload */}
              <Col span={24}>
                <Form.Item
                  label={<span className=" font-medium">Project Filesp(Optional)</span>}
                  name="files"
                >
                  <Upload.Dragger
                    name="files"
                    multiple
                    action="/api/upload"
                    className="bg-[#3A3A3A] border-gray-600"
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined className="text-orange-500" />
                    </p>
                    <p className="ant-upload-text ">
                      Clpck or drag files to this area to upload
                    </p>
                    <p className="ant-upload-hint text-gray-400">
                      Support for single or bulk upload. Max file size: 10MB
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 px-8 py-2 h-auto text-lg font-medium"
              >
                {loading ? "Posting Project..." : "Post Project"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};
