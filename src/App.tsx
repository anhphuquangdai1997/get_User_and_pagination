
import React from 'react';
import { Layout } from 'antd';
import UserList from './component/UserList';

const { Content } = Layout;

function App() {
  return (
  <Layout>
  <Content style={{ padding: '50px' }}>
  <UserList />
  </Content>
  </Layout>
  );
  }
  
  export default App;
