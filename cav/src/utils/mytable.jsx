import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Space, Table } from 'antd';
import { axiosJSONPost } from './request';
import React from 'react';
import { useEffect } from 'react';

// 封装了但没完全封装的Table
// pageSize可选 默认为10 url必选
export default function MyTable(props) {

    // // 每页数据量
    // const [pageSize,setPageSize]=React.useState(props.pageSize?props.pageSize:30);
    // // 总数据量
    // const [total,setTotal]=React.useState(0);
    // // 当前页数
    // const [current,setCurrent]=React.useState(1);
    // 数据源
    const [data,setData]=React.useState([]);
    // 列头
    const [title,setTitle]=React.useState([]);
    // 列描述数据对象
    const [columns,setColumns]=React.useState([]);

    // 此函数用于过滤属性
    function filterObjKeys(obj, keys) {
        if(!obj){
            return null;
        }
        return Object.keys(obj).reduce((newData, key) => {
          if (!keys.includes(key)) {
            newData[key] = obj[key];
          }
          return newData;
        }, {});
      }

    // // 请求数据
    // React.useEffect(()=>{
    //     axiosJSONPost(props.url,{current:current,pageSize:pageSize})
    //     .then(
    //         response=>{
    //             // 设置数据源
    //             setData(response.data.data);
    //             // 设置总条数
    //             setTotal(response.data.total);
    //             // 设置列头
    //             setTitle(Object.keys(response.data.data[0]));
    //         },
    //         error=>{
    //             console.log(error);
    //         }
    //     )
    // },[current]);

    // 设置列配置
    React.useEffect(()=>{
        // 列描述数据对象
        setColumns(            
            title.map((i)=>{
            return {
                // 列头显示文字
                title:i,
                // 列数据对应的标识
                dataIndex:i,
                align:'center',
            }
        }));
    },[title])

    // 处理分页
    // function handleChange(page,pageSize){
    //     setCurrent(page);
    //     setPageSize(pageSize);
    // }

    useEffect(()=>{
        const dataSource=[
            {key:0,'#A-edges': 'Uniform','ρ≈2':'200','ρ≈4': '684','ρ≈6':'2118','ρ≈8': '33387','ρ≈10':'5848'},
            {key:1,'#A-edges': 'Ring','ρ≈2':'549','ρ≈4': '1562','ρ≈6':'4484','ρ≈8': '8329','ρ≈10':'13036'},
            {key:2,'#A-edges': 'Vase','ρ≈2':'744','ρ≈4': '3650','ρ≈6':'7669','ρ≈8': '13998','ρ≈10':'21441'},
            {key:3,'#A-edges': 'Taiji','ρ≈2':'667','ρ≈4': '2054','ρ≈6':'4849','ρ≈8': '8654','ρ≈10':'14036'},
            {key:4,'#A-edges': 'Circle','ρ≈2':'267','ρ≈4': '1141','ρ≈6':'2693','ρ≈8': '4670','ρ≈10':'7419'},
            {key:5,'#A-edges': 'Triangle','ρ≈2':'278','ρ≈4': '1603','ρ≈6':'3721','ρ≈8': '6298','ρ≈10':'10195'},
            {key:6,'#A-edges': 'Square','ρ≈2':'272','ρ≈4': '1120','ρ≈6':'2867','ρ≈8': '4990','ρ≈10':'7985'},
            {key:7,'#A-edges': 'Arch','ρ≈2':'486','ρ≈4': '1921','ρ≈6':'4705','ρ≈8': '8271','ρ≈10':'13044'},
            {key:8,'#A-edges': 'Neat square','ρ≈2':'420','ρ≈4': '840','ρ≈6':'1200','ρ≈8': '1624','ρ≈10':'3906'},
            {key:9,'#A-edges': 'Neat radiation','ρ≈2':'890','ρ≈4': '2440','ρ≈6':'5040','ρ≈8': '8610','ρ≈10':'13190'},
        ]
    
        setData(dataSource);

        setTitle(Object.keys(filterObjKeys(dataSource[0], ['key'])))
        
    },[]);

    return (
    <>
        {/* 默认是可以换行显示的 还行 */}
        <Table
            // 列的配置项
            columns={columns}
            // 数据数组
            dataSource={data}
            // 分页设置
            pagination={false}
            bordered={true}
            scroll={{
                scrollToFirstRowOnChange:true,
                x:'200px',
            }}
        />
    </>
    );
}