import React from 'react';
import { Spin } from 'antd';

const Loader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }}>
    <Spin size="large" />
  </div>
);

export default Loader;
