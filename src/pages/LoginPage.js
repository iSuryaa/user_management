import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { Button, Checkbox, Form, Grid, Input, notification, theme, Typography } from 'antd';
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useToken();
  const screens = useBreakpoint();

  const handleLogin = async () => {
    try {
      const credentials = { email, password };

      // Wait for the thunk to complete
      const response = await dispatch(loginUser(credentials));

      if (response.success) {
        notification.success({ message: 'Login Successful' });
        navigate('/test');
      } else {
        notification.error({
          message: 'Login Failed',
          description: 'Incorrect email or password',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred during login',
      });
    }
  };


  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <div className="login-form">
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Title style={styles.title}>Sign in</Title>
          </div>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
