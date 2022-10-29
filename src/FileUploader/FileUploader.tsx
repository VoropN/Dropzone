import * as React from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';
import { FileInfo } from './FileInfo';
import { IFile } from '../types';

import style from './style.module.scss';

interface IFileUploader {
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}

export const FileUploader = React.memo(({ files, setFiles }: IFileUploader) => {
  const [uploadingProgress, setUploadingProgress] = React.useState(0);
  const onUploadFiles = () => {
    console.log(files);
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file.file));

    axios
      .post('./', formData, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const { loaded, total } = progressEvent;
          const precentage = Math.floor((loaded * 100) / total);
          console.log('options');
          console.log(precentage);
          if (precentage < 100) {
            console.log(precentage);
          }
        },
      })
      .then((res) => {
        console.log('File Upload success');
      })
      .catch((err) => console.log('File Upload Error'));
  };
  return (
    <div>
      {files.map((file, i) => (
        <div key={`${file.name}_idx-${i}`}>
          <FileInfo file={file} />
          <progress max="100" value="80" />
        </div>
      ))}
      <Button className={style.uploadButton} onClick={onUploadFiles}>
        Upload
      </Button>
    </div>
  );
});
