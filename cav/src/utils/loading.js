import { Alert, Spin } from 'antd';
import React from 'react';

const App = (props) => (
  <Spin 
    tip="Loading..."
    style={{
      position:'absolute',left:props.left,top:props.top
      }}>
  </Spin>
);

export default App;