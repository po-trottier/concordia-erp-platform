import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

export const ImgUploader = () => {
    const uf: UploadFile = {
        uid: 'string',
        size: 1,
        name: 'string',
        fileName: 'string',
        lastModified: 1,
        lastModifiedDate: new Date("5/10/2018"),
        url: 'string',
        status: 'error',
        type: 'png'
    };
    const ufl: UploadFile[] = [uf];
    const [fileList, updateFileList] = useState(ufl);
    const props = {
        fileList,
        beforeUpload: (file: UploadFile) => {
            if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
            }
            return file.type === 'image/png';
        },
        onChange(info: UploadChangeParam<UploadFile<any>>) {
            updateFileList(info.fileList.filter(file => !!file.status))
        }
    };
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload png only</Button>
        </Upload>
    );
};