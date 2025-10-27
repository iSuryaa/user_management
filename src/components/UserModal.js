import React from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = ({ visible, onCancel, onSubmit, user }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(user || { first_name: '', last_name: '', email: '', avatar: '' });
  }, [user, form]);

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(() => { });
  };

  return (
    <Modal
      open={visible}
      title={user ? 'Edit User' : 'Create User'}
      okText="Save"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        {/* New Profile Image Field */}
        <Form.Item
          label="Profile Image URL"
          name="avatar"
          rules={[{ required: true, message: 'Please enter image URL' }]}
        >
          <Input placeholder="https://example.com/avatar.jpg" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
