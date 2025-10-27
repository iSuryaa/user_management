import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Pagination, Space, notification, Row, Col, Typography } from 'antd';
import {
  fetchUsersAction,
  addUserAction,
  updateUserAction,
  deleteUserAction,
} from '../redux/actions/userActions';
import UserList from '../components/UserList';
import UserModal from '../components/UserModal';
import Search from '../components/Search';
import Loader from '../components/Loader';
import { AppstoreOutlined, LogoutOutlined, TableOutlined } from '@ant-design/icons';
import { LOGOUT } from '../redux/actions/types';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  const { Title } = Typography;

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'card'

  // Fetch users when component mounts or page changes
  useEffect(() => {
    dispatch(fetchUsersAction(page));
  }, [dispatch, page]);

  // Filter users based on search input
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Handlers
  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate('/'); // redirect to login page
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedUser) {
        await dispatch(updateUserAction(selectedUser.id, data));
        notification.success({ message: 'User updated successfully!' });
      } else {
        await dispatch(addUserAction(data));
        notification.success({ message: 'User created successfully!' });
      }
    } catch {
      notification.error({ message: 'Operation failed' });
    } finally {
      setIsModalVisible(false);
      setSelectedUser(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUserAction(id));
      notification.success({ message: 'User deleted successfully!' });
    } catch {
      notification.error({ message: 'Failed to delete user' });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loader />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;


  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={12}>
          <Typography>
            <Title level={2}>Users</Title>
          </Typography>
        </Col>
        <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'flex-start', }}>
          <Space align='center'>

            <Search value={searchQuery} onChange={setSearchQuery} />

            <Button type="primary" onClick={handleCreate}>
              Create User
            </Button>

            <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>

          </Space>
        </Col>
      </Row>

      <div style={{ display: 'flex', gap: 8, paddingTop: '25px' }}>
        {/* List / Table View */}
        <div
          onClick={() => setViewMode('list')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            border: viewMode === 'list' ? '2px solid #1890ff' : '1px solid #d9d9d9',
            borderRadius: 4,
            cursor: 'pointer',
            backgroundColor: viewMode === 'list' ? '#e6f7ff' : '#fff',
          }}
        >
          <TableOutlined style={{ fontSize: 18, color: viewMode === 'list' ? '#1890ff' : '#000000a6' }} />
          <span style={{ color: viewMode === 'list' ? '#1890ff' : '#000000a6' }}>Table</span>
        </div>

        {/* Card / Grid View */}
        <div
          onClick={() => setViewMode('card')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 8px',
            border: viewMode === 'card' ? '2px solid #1890ff' : '1px solid #d9d9d9',
            borderRadius: 4,
            cursor: 'pointer',
            backgroundColor: viewMode === 'card' ? '#e6f7ff' : '#fff',
          }}
        >
          <AppstoreOutlined style={{ fontSize: 18, color: viewMode === 'card' ? '#1890ff' : '#000000a6' }} />
          <span style={{ color: viewMode === 'card' ? '#1890ff' : '#000000a6' }}>Card</span>
        </div>
      </div>

      <div>
        <UserList
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          viewMode={viewMode}
        />
      </div>

      <Pagination
        current={page}
        total={12} // since Reqres API provides 12 users total
        pageSize={6}
        onChange={handlePageChange}
        style={{ marginTop: 24, textAlign: 'center' }}
      />

      <UserModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersPage;
