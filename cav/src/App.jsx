import 'antd/dist/antd.variable.min.css';
import { ConfigProvider } from 'antd';
import { HomeOutlined,LineChartOutlined,DesktopOutlined,FileOutlined,RadarChartOutlined,AppstoreOutlined } from '@ant-design/icons';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import Nav from './component/nav/index'
import { useState } from 'react';

// 自定义主题色
ConfigProvider.config({
    theme: {
      primaryColor: '#1890ff',
      linkColor:'#1890ff',
      borderColorBase:'#1890ff',
    },
  });

export default function App() {

    const element = useRoutes(routes);
    // 0是普通页面 1是cav页面
    const [type,setType] = useState(0);

    function changeCAV(param){
        setType(param);
    }

    return (
        <>
            <Nav 
                home={type === 0 ? <><HomeOutlined/>Home</> : ''} 
                masapp={type === 0 ? <><AppstoreOutlined />Mas application</> : ''}
                thesis={type === 0 ? <><FileOutlined />Thesis</> : ''}
                cav={type === 0 ? <><AppstoreOutlined />CAV</> : ''}
                cavClassic={type === 1 ? 'Classic Model' : ''}
                cavClusters={type === 1 ? 'Multi-Vehicle Clusters' : ''}
                cavEvent={type === 1 ? 'Event Triggering Mechanism' : ''}
                // 这个是用来改变cav状态的函数
                changeCAV={changeCAV.bind(this)}
            />
            <div style={{ height: '64px', width: '100vw' }}></div>
            {element}
        </>
    )
}
