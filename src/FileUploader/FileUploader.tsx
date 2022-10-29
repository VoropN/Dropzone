import * as React from 'react';
import axios from '../api/axios';
import { Button } from '@mantine/core';
import { FileInfo } from './FileInfo';
import { IFile } from '../types';

import style from './style.module.scss';

interface IFileUploader {
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}

export const FileUploader = React.memo(({ files, setFiles }: IFileUploader) => {
  const [uploadingProgress, setUploadingProgress] = React.useState({
    i: -1,
    value: 0,
  });
  const onUploadFiles = async () => {
    const formData = new FormData();
    await Promise.all(
      files.map(async (file, i) => {
        formData.append(file.name, file.file);
        await axios.post('./', formData, {
          onUploadProgress: (progressEvent: ProgressEvent) => {
            const { loaded, total } = progressEvent;
            const precentage = Math.floor((loaded * 100) / total);
            setUploadingProgress({ value: precentage, i });
          },
        });
        console.log(i);
      })
    )
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
          {uploadingProgress.i === i && (
            <progress max="100" value={uploadingProgress.value} />
          )}
        </div>
      ))}
      <Button className={style.uploadButton} onClick={onUploadFiles}>
        Upload
      </Button>
    </div>
  );
});
