import * as React from 'react';
import axios from '../api/axios';
import { Button } from '@mantine/core';
import { FileInfo } from './FileInfo';
import { IFile } from '../types';

import style from './style.module.scss';

interface IFileUploader {
  file: IFile;
}

export const FileUploader = React.memo(({ file }: IFileUploader) => {
  const [uploadingProgress, setUploadingProgress] = React.useState(0);
  const onUploadFiles = async () => {
    const formData = new FormData();
    formData.append(file.name, file.file);
    await axios
      .post('./', formData, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const { loaded, total } = progressEvent;
          const precentage = Math.floor((loaded * 100) / total);
          setUploadingProgress(precentage);
        },
      })
      .then((res) => {
        console.log('File Successfully Uploaded');
      })
      .catch((err) => console.log('File Upload Error'));
  };
  return (
    <div>
      {!uploadingProgress && (
        <Button className={style.uploadButton} onClick={onUploadFiles}>
          Upload
        </Button>
      )}
      <FileInfo file={file} />
      <progress max="100" value={uploadingProgress} />
    </div>
  );
});
