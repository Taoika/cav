import {UploadOutlined } from '@ant-design/icons';
import { Button,Upload } from 'antd';
import React from 'react'
import './index.css'

export default function MyUpload(props) {

    const config = {
        listType: 'picture',

        // 将文件交给外部处理函数
        async previewFile(file) {
          props.handleUpload(file);
        },
    };

    // 阻止文件上传
      const beforeUpload = ({fileList}) => {
        return  false;
    }

  return (
        <Upload {...config} beforeUpload={beforeUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload The File &nbsp; </Button>
        </Upload>
  )
}
