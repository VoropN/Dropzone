import { memo, useState } from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';
import { FileInfo } from './FileInfo';

import style from './style.module.scss';

interface IFileUploader {
  files: File[];
  setFiles: (files: File[]) => void;
}

export const FileUploader = memo(({ files, setFiles }: IFileUploader) => {
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const onUploadFiles = () => {
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file));

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
        <div>
          <FileInfo key={`${file.name}_idx-${i}`} file={file} />
          <progress max="100" value="80" />
        </div>
      ))}
      <Button className={style.uploadButton} onClick={onUploadFiles}>
        Upload
      </Button>
    </div>
  );
});
