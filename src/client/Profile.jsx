import React, { useState } from "react";
import { Row, Col, Card, Avatar, Typography, List, Button } from "antd";
import { MdPlace } from "react-icons/md";
import { TbTimezone } from "react-icons/tb";
import { EditProfileDialog } from "./components/EditProfileDialog";

const { Title, Paragraph } = Typography;

export const ClientProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    location: "New York, USA",
    timezone: "GMT-4",
    score: "95%",
    totalJobs: "20",
    areasOfInterest: "Web Development, UI/UX Design, Mobile Apps",
    description: "I'm a passionate web developer with over 5 years of experience in creating dynamic and user-friendly websites. I specialize in front-end development, but I also have a strong understanding of back-end technologies. My goal is to deliver high-quality work that meets the needs of my clients.",
    skills: ["JavaScript", "React", "Node.js", "CSS", "HTML", "UI/UX Design"]
  });

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = (updatedData) => {
    setProfileData(updatedData);
    setIsEditModalOpen(false);
  };

  return (
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "2rem" }}>
        <Row gutter={[24, 24]}>
          {/* Left Side */}
          <Col xs={24} md={12}>
            <Card>
              <List
                itemLayout="vertical"
                dataSource={[
                  { title: "Score", description: profileData.score },
                  { title: "Total Jobs", description: profileData.totalJobs },
                  {
                    title: "Areas of Interest",
                    description: profileData.areasOfInterest,
                  }
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<b>{item.title}</b>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
              
            </Card>

            <Card style={{ marginTop: "1rem" }}>
            <div style={{ marginTop: "1rem" }}>
                <Title level={4}>Description</Title>
                <Paragraph>
                  {profileData.description}
                </Paragraph>
              </div>
            </Card>
          </Col>

          {/* Right Side */}
          <Col xs={24} md={12}>
            <Card style={{ textAlign: "center" }} className="flex ">
              <div>
                                       <Avatar
                         size={120}
                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                         style={{ marginBottom: "1rem" }}
                       />
                <div className="text-left ">
                  <Title level={3}>{profileData.name}</Title>
                  <div className="flex gap-10">
                  <div className="inline-flex items-center gap-1 text-gray-500">
                    <MdPlace className="text-xl " />
                    {profileData.location}
                  </div>
                  <div className="inline-flex items-center gap-1 text-gray-500">
                    <TbTimezone />
                    {profileData.timezone}
                  </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4">
                <Button type="primary" onClick={handleEditProfile}>Edit Profile</Button>
              </div>
            </Card>

            <Card style={{ marginTop: "1rem" }}>
              <Title level={4}>Skills</Title>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={profileData.skills}
                renderItem={(item) => (
                  <List.Item>
                    <Card>{item}</Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          isOpen={isEditModalOpen}
          onClose={handleCloseEditProfile}
          profileData={profileData}
          onSave={handleSaveProfile}
        />
      </div>
  );
};
