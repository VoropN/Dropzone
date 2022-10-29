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
    fileIndex: -1,
    value: 0,
  });
  const onUploadFiles = async () => {
    (async function () {
      let fileIndex = 0;
      for await (const file of files) {
        const formData = new FormData();
        formData.append(file.name, file.file);
        await axios.post('./', formData, {
          onUploadProgress: (progressEvent: ProgressEvent) => {
            const { loaded, total } = progressEvent;
            const precentage = Math.floor((loaded * 100) / total);
            setUploadingProgress({ value: precentage, fileIndex });
          },
        });
        ++fileIndex;
      }
    })()
      .then((res) => {
        setFiles(null);
      })
      .catch((err) => console.log('File Upload Error'));
  };
  return (
    <div>
      {files.map((file, i) => (
        <div key={`${file.name}_idx-${i}`}>
          <FileInfo file={file} />
          {uploadingProgress.fileIndex >= i && (
            <progress
              max="100"
              value={
                uploadingProgress.fileIndex === i
                  ? uploadingProgress.value
                  : 100
              }
            />
          )}
        </div>
      ))}
      <Button className={style.uploadButton} onClick={onUploadFiles}>
        Upload
      </Button>
    </div>
  );
});
