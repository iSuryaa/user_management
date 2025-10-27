import React from 'react';
import { Card, Button } from 'antd';

const UserCard = ({ user, onDelete }) => {
  return (
    <Card title={user.first_name + ' ' + user.last_name}>
      <p>Email: {user.email}</p>
      <Button onClick={() => onDelete(user.id)} danger>
        Delete
      </Button>
    </Card>
  );
};

export default UserCard;
