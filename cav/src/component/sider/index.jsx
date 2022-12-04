import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './index.css'

const { Sider } = Layout;

export default function MySider(props) {
  const items = [];
  // 获取默认值
  let defaultSelectedKeys='';
  let k=1;
  for (let i in props) {
    defaultSelectedKeys=(k++)===1?i:defaultSelectedKeys;
    items.push({
      key: i,
      label: <Link to={i}>{props[i]}</Link>
    })
  }
  return (
    <Sider width={200} className="mySider" >
      <Menu
        className='mySider-menu'
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKeys]}
        items={items}
        theme="light"
        
      />
    </Sider >
  )
}
