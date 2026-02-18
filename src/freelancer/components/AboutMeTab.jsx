import React from 'react';
import { Typography, Button, Descriptions, Space, Card, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export const AboutMeTab = ({ aboutMeData, handleAboutMeEdit }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>
          About Me
        </Title>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={handleAboutMeEdit}
          style={{ 
            borderColor: '#666',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}
        />
      </div>

      <Card 
        style={{ 
          backgroundColor: '#1A1A1A',
          borderColor: '#333',
          borderRadius: '8px'
        }}
        bodyStyle={{ padding: '16px' }}
      >
        <Paragraph 
          style={{ 
            color: !aboutMeData?.bio || aboutMeData.bio === '' ? '#999' : '#fff',
            margin: 0,
            lineHeight: '1.75'
          }}
        >
          {!aboutMeData?.bio || aboutMeData.bio === '' ? 'No bio' : aboutMeData.bio}
        </Paragraph>
      </Card>

      <div>
        <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>
          Contact Information
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <div>
              <Text style={{ color: '#999', display: 'block', marginBottom: '8px' }}>
                Email
              </Text>
              <Card 
                style={{ 
                  backgroundColor: '#1A1A1A',
                  borderColor: '#333',
                  borderRadius: '8px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Text style={{ 
                  color: !aboutMeData?.email ? '#999' : '#fff'
                }}>
                  {!aboutMeData?.email ? 'No email' : aboutMeData.email}
                </Text>
              </Card>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div>
              <Text style={{ color: '#999', display: 'block', marginBottom: '8px' }}>
                Phone
              </Text>
              <Card 
                style={{ 
                  backgroundColor: '#1A1A1A',
                  borderColor: '#333',
                  borderRadius: '8px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Text style={{ 
                  color: !aboutMeData?.phone ? '#999' : '#fff'
                }}>
                  {!aboutMeData?.phone ? 'No phone number' : aboutMeData.phone}
                </Text>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </Space>
  );
};
