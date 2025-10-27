import React from 'react';
import { Card, Table, Avatar, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserList = ({ users, onEdit, onDelete, viewMode }) => {
  // Table columns
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar, record) => <Avatar src={avatar} alt={record.first_name} />,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <EditOutlined
              style={{ fontSize: 18, color: '#1890ff', cursor: 'pointer', borderRadius: '50%', padding: 4 }}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ fontSize: 18, color: 'red', cursor: 'pointer', borderRadius: '50%', padding: 4 }}
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (viewMode === 'card') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingTop: '30px', justifyContent: 'center' }}>
        {users.map((user) => (
          <Card
            key={user.id}
            hoverable
            className="user-card"
            style={{
              width: 240,
              textAlign: 'center',
              position: 'relative',
              paddingTop: 16,
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: '16px' }}
          >
            {/* Wrap content to apply blur */}
            <div className="card-content">
              <Avatar
                src={user.avatar}
                size={100}
                style={{ marginBottom: 16 }}
              />
              <h3 style={{ margin: 0 }}>{`${user.first_name} ${user.last_name}`}</h3>
              <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.65)' }}>{user.email}</p>
            </div>

            {/* Overlay for blur + dark effect */}
            <div className="card-overlay"></div>

            {/* Icon actions */}
            <div className="card-actions">
              <Tooltip title="Edit">
                <EditOutlined
                  style={{ fontSize: 20, color: '#1890ff', cursor: 'pointer', borderRadius: '50%', padding: 6, background: 'white' }}
                  onClick={() => onEdit(user)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <DeleteOutlined
                  style={{ fontSize: 20, color: 'red', cursor: 'pointer', borderRadius: '50%', padding: 6, background: 'white' }}
                  onClick={() => onDelete(user.id)}
                />
              </Tooltip>
            </div>
          </Card>
        ))}

        <style>{`
    .user-card {
      transition: all 0.3s ease;
      position: relative;
    }

    /* Overlay */
    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(3px);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .user-card:hover .card-overlay {
      opacity: 1;
    }

    /* Content stays under overlay */
    .card-content {
      position: relative;
      z-index: 0;
      transition: all 0.3s ease;
    }

    /* Show icons on hover above overlay */
    .user-card .card-actions {
      position: absolute;
      bottom: 16px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 12px;
      opacity: 0;
      z-index: 2;
      transition: opacity 0.3s ease;
    }

    .user-card:hover .card-actions {
      opacity: 1;
    }
  `}</style>
      </div>

    );
  }

  return <Table dataSource={users} columns={columns} pagination={false} rowKey="id" style={{ paddingTop: 30 }} scroll={{ x: 'max-content' }} />;
};

export default UserList;
