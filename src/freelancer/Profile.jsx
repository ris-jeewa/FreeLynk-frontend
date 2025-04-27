import React from "react";
import { Row, Col, Card, Avatar, Typography, List, Button } from "antd";
import { MdPlace } from "react-icons/md";
import { TbTimezone } from "react-icons/tb";

const { Title, Paragraph } = Typography;

export const FreelanceProfile = () => {
  return (
    <div>
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "2rem" }}>
        <Row gutter={[24, 24]}>
          {/* Left Side */}
          <Col xs={24} md={12}>
            <Card>
              <List
                itemLayout="vertical"
                dataSource={[
                  { title: "Score", description: "95%" },
                  { title: "Total Jobs", description: "20" },
                  {
                    title: "Areas of Interest",
                    description: "Web Development, UI/UX Design, Mobile Apps",
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
                  Im a passionate web developer with over 5 years of experience in creating dynamic and user-friendly websites. I specialize in front-end development, but I also have a strong understanding of back-end technologies. My goal is to deliver high-quality work that meets the needs of my clients.
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
                  src="https://i.pravatar.cc/300" // Replace with your profile image link
                  style={{ marginBottom: "1rem" }}
                />
                <div className="text-left ">
                  <Title level={3}>John Doe</Title>
                  <div className="flex gap-10">
                  <div className="inline-flex items-center gap-1 text-gray-500">
                    <MdPlace className="text-xl " />
                    New York, USA
                  </div>
                  <div className="inline-flex items-center gap-1 text-gray-500">
                    <TbTimezone />
                    GMT-4
                  </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4">
                <Button color="default" variant="solid">Profile Settings</Button>
              </div>
            </Card>

            <Card style={{ marginTop: "1rem" }}>
              <Title level={4}>Skills</Title>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "CSS",
                  "HTML",
                  "UI/UX Design",
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Card>{item}</Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
