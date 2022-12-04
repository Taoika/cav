import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

// 参数1为option=[选项1,选项2,...] 参数2位处理函数handleSelect={你的处理函数}
export default function MySelect(props) {

    const handleSelect=props.handleSelect;

    const handleChange = (value) => {
        handleSelect(value);
      };

  return (
    <Select defaultValue={props.option[0]} style={{width: 120,}} onChange={handleChange}>
        {props.option.map((value)=>{
            return (
                <Option key={value} value={value}>{value}</Option>
            )
        })}
    </Select>
  )
}
