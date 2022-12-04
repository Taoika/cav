import { Layout, Menu } from 'antd';
import React from 'react'
import { Link,useNavigate,Outlet } from 'react-router-dom'
import './index.css'
import logo from '../../assets/images/logo.png'
import { useState } from 'react';

export default function Nav(props) {

    const navigate=useNavigate();
    const { Header } = Layout;
    const [cav,setCav] = useState(0);

    function handleCAV(){
        props.changeCAV(1);
    }

    function handleLogoClick(){
        props.changeCAV(0);
    }

    // 根据props动态生成items props为对象 键值对分别对应key和展示条目
    const items=[];
    // 获取默认值
    let defaultSelectedKeys='';
    let k=1;
    for(const i in props){
        defaultSelectedKeys=(k++)===1?i:defaultSelectedKeys;
        if(i === 'cav'){
            items.push({
                key:i,
                label:<Link to='/cavClassic' onClick={handleCAV}>{props[i]}</Link>
            })
            continue;
        }
        if(i === 'changeCAV') continue;
        items.push({
            key:i,
            label:<Link to={`/${i}`}>{props[i]}</Link>
        })
    }

    return (
        <div className='head'>
            <Header className="head-header" >
                <Link className="head-logo" onClick={handleLogoClick} to='/home'>
                    <img src={logo} alt="算法可视化平台" width={`180px`}/>
                </Link>
                <Menu className='head-menu' mode="horizontal" defaultSelectedKeys={[defaultSelectedKeys]} items={items} />
            </Header >
            <Outlet/>
        </div >
    )
}
